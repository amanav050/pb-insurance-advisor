/**
 * Parses the AI's recommendation text into structured data.
 * Handles multiple Groq output formats: numbered lists, markdown headers, bold markers.
 */

export function parseRecommendation(text) {
  const result = {
    coverageAmount: '',
    reasoning: '',
    policies: [],
    warnings: [],
    nextStep: '',
    rawText: cleanMarkdown(text),
  };

  if (!text) return result;

  // Extract coverage amount — handle various formats
  const coveragePatterns = [
    /Recommended Coverage Amount\*?\*?[:\s]*\*?\*?\s*(₹[^\n*]+)/i,
    /recommend(?:ed)?[^.]*?(₹[\d,.]+\s*(?:Lakh|Crore|L|Cr)[^\n.]*)/i,
    /coverage[:\s]*(₹[\d,.]+\s*(?:Lakh|Crore|L|Cr)[^\n]*)/i,
  ];
  for (const pattern of coveragePatterns) {
    const match = text.match(pattern);
    if (match) {
      result.coverageAmount = match[1].replace(/\*/g, '').trim();
      break;
    }
  }

  // Extract reasoning — "Why This Amount" section
  const reasoningPatterns = [
    /Why This Amount\*?\*?[:\s]*\*?\*?\s*\n?([\s\S]*?)(?=\n\s*(?:\d+\.\s*\*?\*?Top|Top 3|Policy Picks|\*?\*?Top))/i,
    /Why This Amount\*?\*?[:\s]*\*?\*?\s*([\s\S]*?)(?=\n\s*\d+\.)/i,
  ];
  for (const pattern of reasoningPatterns) {
    const match = text.match(pattern);
    if (match) {
      result.reasoning = match[1].replace(/\*/g, '').replace(/\n+/g, ' ').trim();
      break;
    }
  }

  // Extract policies — split by policy markers
  const policySectionMatch = text.match(/Top 3 Policy Picks\*?\*?[:\s]*\n?([\s\S]*?)(?=\n\s*(?:\d+\.\s*\*?\*?What|What to Watch|\*?\*?What to Watch))/i);
  const policyText = policySectionMatch ? policySectionMatch[1] : '';

  if (policyText) {
    // Split by "- **PolicyName" or "**PolicyName" patterns  
    const policyBlocks = policyText.split(/(?=\s*-\s*\*\*[A-Z])/i).filter(b => b.trim().length > 20);
    
    for (const block of policyBlocks) {
      const policy = parseOnePolicy(block);
      if (policy) result.policies.push(policy);
    }
  }

  // If no policies found via section split, try line-by-line extraction
  if (result.policies.length === 0) {
    const allPolicyMatches = text.matchAll(/\*\*([A-Za-z\s]+(?:Health|Life|ERGO|Bupa|Care|Star|HDFC|ICICI|Max|Tata|LIC|Cigna)[^*]*)\*\*/gi);
    for (const match of allPolicyMatches) {
      const name = match[1].trim();
      if (name.length > 5 && name.length < 80 && !name.toLowerCase().includes('what to') && !name.toLowerCase().includes('next step')) {
        // Find context around this match
        const startIdx = match.index;
        const endIdx = text.indexOf('\n  -', startIdx + match[0].length + 50);
        const contextEnd = endIdx > startIdx ? endIdx : startIdx + 400;
        const context = text.substring(startIdx, contextEnd);
        const policy = parseOnePolicy(context);
        if (policy) result.policies.push(policy);
      }
    }
  }

  // Extract warnings
  const warningMatch = text.match(/What to Watch Out For\*?\*?[:\s]*\n?([\s\S]*?)(?=\n\s*(?:\d+\.\s*\*?\*?Next|Next Step|\*?\*?Next Step|Please note|$))/i);
  if (warningMatch) {
    const lines = warningMatch[1].split('\n').map(l => l.replace(/^[\s\-•\d.]+/, '').replace(/\*/g, '').trim()).filter(l => l.length > 10);
    result.warnings = lines;
  }

  // Extract next step
  const nextPatterns = [
    /Next Step\*?\*?[:\s]*\*?\*?\s*\n?([^\n]+)/i,
    /Next Step\*?\*?[:\s]*\*?\*?\s*([\s\S]*?)(?=\n\n|Please note|$)/i,
  ];
  for (const pattern of nextPatterns) {
    const match = text.match(pattern);
    if (match) {
      result.nextStep = match[1].replace(/\*/g, '').trim();
      break;
    }
  }

  return result;
}

function parseOnePolicy(block) {
  if (!block || block.trim().length < 20) return null;

  // Extract name
  const nameMatch = block.match(/\*\*([^*]+(?:Care Advantage|Reassure|Optima|Comprehensive|Supreme|Aspire|Assure|Prime|iProtect|Click 2 Protect|Smart Secure|Sampoorna|Tech Term|[A-Za-z\s\-.]+))\*\*/i)
    || block.match(/\*\*([^*]{5,60})\*\*/);
  
  if (!nameMatch) return null;

  const name = nameMatch[1].replace(/:/g, '').trim();
  
  // Skip non-policy headers
  if (/what to|next step|watch out|why this amount|recommended coverage/i.test(name)) return null;

  // Extract premium
  const premiumMatch = block.match(/(?:Annual premium|premium)[^₹]*?(₹[\d,.\s]+(?:-\s*₹[\d,.\s]+)?)/i)
    || block.match(/(₹[\d,.]+\s*-\s*₹[\d,.]+)/);
  
  // Extract features
  const features = [];
  const keyFeaturesMatch = block.match(/Key features?[:\s]*(.*?)(?=,\s*Why|$)/i);
  if (keyFeaturesMatch) {
    const feats = keyFeaturesMatch[1].split(/,\s*/);
    for (const f of feats) {
      const clean = f.replace(/\*/g, '').trim();
      if (clean.length > 3) features.push(clean);
    }
  }

  // If no comma-separated features, try bullet points
  if (features.length === 0) {
    const bulletFeats = block.match(/[-•]\s+([^\n]+)/g);
    if (bulletFeats) {
      for (const f of bulletFeats) {
        const clean = f.replace(/^[-•]\s+/, '').replace(/\*/g, '').trim();
        if (clean.length > 3 && !/why this fits/i.test(clean)) features.push(clean);
      }
    }
  }

  // Extract fit reason
  const fitMatch = block.match(/Why this fits you[:\s]*\*?\*?\s*([^\n]+)/i)
    || block.match(/fits you[:\s]*\*?\*?\s*([^\n]+)/i);

  return {
    name,
    premium: premiumMatch ? premiumMatch[1].replace(/\*/g, '').trim() : '',
    features: features.slice(0, 4),
    fitReason: fitMatch ? fitMatch[1].replace(/\*/g, '').trim() : '',
  };
}

function cleanMarkdown(text) {
  if (!text) return '';
  return text
    .replace(/\*\*([^*]+)\*\*/g, '$1')  // Remove bold markers
    .replace(/\*([^*]+)\*/g, '$1')       // Remove italic markers
    .replace(/#{1,3}\s*/g, '')            // Remove heading markers
    .trim();
}
