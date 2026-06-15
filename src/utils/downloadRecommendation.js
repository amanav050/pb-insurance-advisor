/**
 * Generates a clean, branded HTML summary and triggers download.
 */
export function downloadRecommendation(recommendationText, insuranceType) {
  const cleanText = recommendationText
    .replace(/\*\*([^*]+)\*\*/g, '$1')
    .replace(/\*/g, '')
    .replace(/#{1,3}\s*/g, '');

  const type = insuranceType === 'health' ? 'Health Insurance' : 'Term Life Insurance';
  const date = new Date().toLocaleDateString('en-IN', {
    day: 'numeric', month: 'long', year: 'numeric'
  });

  const html = `<!DOCTYPE html>
<html lang="en">
<head>
  <meta charset="UTF-8">
  <meta name="viewport" content="width=device-width, initial-scale=1.0">
  <title>PolicyBazaar AI Advisor — Your ${type} Recommendation</title>
  <link href="https://fonts.googleapis.com/css2?family=Inter:wght@400;500;600;700&display=swap" rel="stylesheet">
  <style>
    * { margin: 0; padding: 0; box-sizing: border-box; }
    body { font-family: 'Inter', sans-serif; color: #212121; line-height: 1.6; padding: 40px 24px; max-width: 720px; margin: 0 auto; }
    .header { background: linear-gradient(135deg, #2B3A8C, #1A237E); color: white; padding: 24px 28px; border-radius: 12px; margin-bottom: 32px; }
    .header h1 { font-size: 20px; font-weight: 700; margin-bottom: 4px; }
    .header .badge { display: inline-block; background: #F56B2A; color: white; font-size: 11px; font-weight: 600; padding: 2px 10px; border-radius: 20px; margin-left: 8px; }
    .header p { font-size: 13px; opacity: 0.85; margin-top: 8px; }
    .meta { font-size: 12px; color: #616161; margin-bottom: 24px; padding-bottom: 16px; border-bottom: 1px solid #E0E0E0; }
    .content { font-size: 14px; white-space: pre-line; line-height: 1.7; }
    .footer { margin-top: 40px; padding-top: 20px; border-top: 1px solid #E0E0E0; font-size: 11px; color: #616161; text-align: center; }
    @media print { body { padding: 20px; } .header { -webkit-print-color-adjust: exact; print-color-adjust: exact; } }
  </style>
</head>
<body>
  <div class="header">
    <h1>PolicyBazaar <span class="badge">AI Advisor</span></h1>
    <p>Your Personalised ${type} Recommendation</p>
  </div>
  <div class="meta">Generated on ${date} • This recommendation is personalised based on your inputs</div>
  <div class="content">${cleanText}</div>
  <div class="footer">
    <p>This is AI-generated guidance, not licensed financial advice. Please consult with a certified insurance advisor before making any purchase decisions.</p>
    <p style="margin-top: 8px;">PolicyBazaar AI Advisor • policybazaar.com • 1800-4500-000</p>
  </div>
</body>
</html>`;

  const blob = new Blob([html], { type: 'text/html' });
  const url = URL.createObjectURL(blob);
  const link = document.createElement('a');
  link.href = url;
  link.download = `PolicyBazaar_${type.replace(/\s+/g, '_')}_Recommendation.html`;
  document.body.appendChild(link);
  link.click();
  document.body.removeChild(link);
  URL.revokeObjectURL(url);
}
