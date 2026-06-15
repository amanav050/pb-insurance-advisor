import { RefreshCw, ExternalLink, MessageCircle, Phone, Download } from 'lucide-react';
import { parseRecommendation } from '../utils/parseRecommendation';
import { downloadRecommendation } from '../utils/downloadRecommendation';
import CoverageSummary from './CoverageSummary';
import PolicyCard from './PolicyCard';
import ReasoningAccordion from './ReasoningAccordion';
import DisclaimerFooter from './DisclaimerFooter';

export default function RecommendationScreen({ recommendationText, insuranceType, onStartOver, onScheduleCallback }) {
  const rec = parseRecommendation(recommendationText);

  const handleDownload = () => {
    downloadRecommendation(recommendationText, insuranceType);
  };

  return (
    <main className="flex-1 overflow-y-auto">
      <div className="max-w-[680px] mx-auto px-4 md:px-6 py-6 space-y-5">
        {/* Coverage summary */}
        <CoverageSummary
          coverageAmount={rec.coverageAmount}
          reasoning={rec.reasoning}
          insuranceType={insuranceType}
        />

        {/* Policy cards */}
        {rec.policies.length > 0 ? (
          <section aria-label="Recommended policies">
            <h2
              className="font-semibold text-base mb-3"
              style={{ color: 'var(--pb-text-primary)' }}
            >
              Top Policy Picks for You
            </h2>
            <div className="space-y-4">
              {rec.policies.map((policy, i) => (
                <PolicyCard key={i} policy={policy} rank={i} />
              ))}
            </div>
          </section>
        ) : (
          <section
            className="rounded-xl p-5 text-sm leading-relaxed whitespace-pre-line"
            style={{
              backgroundColor: 'var(--pb-white)',
              border: '1px solid var(--pb-gray-border)',
              color: 'var(--pb-text-dark)',
              boxShadow: '0 2px 8px rgba(0,0,0,0.06)',
            }}
          >
            {rec.rawText}
          </section>
        )}

        {/* Warnings + next step + accordion */}
        <ReasoningAccordion
          warnings={rec.warnings}
          nextStep={rec.nextStep}
          rawText={rec.rawText}
        />

        {/* Talk to an expert CTA */}
        <section
          className="rounded-xl p-5 flex flex-col sm:flex-row items-start sm:items-center gap-4"
          style={{
            backgroundColor: 'var(--pb-blue-light)',
            border: '1px solid #C5CAE9',
          }}
        >
          <div className="flex-1">
            <h3 className="font-semibold text-sm mb-1" style={{ color: 'var(--pb-blue-primary)' }}>
              Want to explore more options?
            </h3>
            <p className="text-sm" style={{ color: 'var(--pb-gray-text)' }}>
              Our insurance experts can walk you through budget, mid-range, and premium plans tailored to your needs.
            </p>
          </div>
          <button
            onClick={onScheduleCallback}
            className="flex items-center gap-2 font-semibold text-white rounded-full cursor-pointer shrink-0 transition-colors duration-150 focus:outline-none focus:ring-2 focus:ring-offset-2"
            style={{
              backgroundColor: 'var(--pb-orange-cta)',
              padding: '12px 20px',
              fontSize: '14px',
              minHeight: '44px',
              '--tw-ring-color': 'var(--pb-orange-cta)',
            }}
            onMouseEnter={(e) => e.currentTarget.style.backgroundColor = 'var(--pb-orange-hover)'}
            onMouseLeave={(e) => e.currentTarget.style.backgroundColor = 'var(--pb-orange-cta)'}
          >
            <Phone size={16} aria-hidden="true" />
            Talk to an Expert
          </button>
        </section>

        {/* Action buttons */}
        <div className="flex flex-col sm:flex-row gap-3 pt-1">
          <button
            onClick={onScheduleCallback}
            className="flex-1 flex items-center justify-center gap-2 font-semibold text-white rounded-full cursor-pointer transition-colors duration-150 focus:outline-none focus:ring-2 focus:ring-offset-2"
            style={{
              backgroundColor: 'var(--pb-orange-cta)',
              padding: '14px 24px',
              fontSize: '15px',
              minHeight: '48px',
              '--tw-ring-color': 'var(--pb-orange-cta)',
            }}
            onMouseEnter={(e) => e.currentTarget.style.backgroundColor = 'var(--pb-orange-hover)'}
            onMouseLeave={(e) => e.currentTarget.style.backgroundColor = 'var(--pb-orange-cta)'}
          >
            <MessageCircle size={18} aria-hidden="true" />
            Schedule a Callback
          </button>

          <button
            onClick={handleDownload}
            className="flex-1 flex items-center justify-center gap-2 font-semibold rounded-full cursor-pointer transition-colors duration-150 focus:outline-none focus:ring-2 focus:ring-offset-2"
            style={{
              border: '2px solid var(--pb-blue-primary)',
              color: 'var(--pb-blue-primary)',
              backgroundColor: 'var(--pb-white)',
              padding: '12px 24px',
              fontSize: '15px',
              minHeight: '48px',
              '--tw-ring-color': 'var(--pb-blue-primary)',
            }}
          >
            <Download size={18} aria-hidden="true" />
            Download Recommendation
          </button>
        </div>

        {/* Secondary link */}
        <div className="text-center">
          <a
            href="https://www.policybazaar.com"
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center gap-1.5 text-sm font-medium no-underline focus:outline-none focus:ring-2 focus:ring-offset-2 rounded-lg px-3 py-2"
            style={{
              color: 'var(--pb-blue-primary)',
              '--tw-ring-color': 'var(--pb-blue-primary)',
            }}
          >
            <ExternalLink size={14} aria-hidden="true" />
            Compare all plans on PolicyBazaar.com
          </a>
        </div>

        {/* Start over */}
        <div className="text-center pb-4">
          <button
            onClick={onStartOver}
            className="inline-flex items-center gap-2 text-sm font-medium cursor-pointer focus:outline-none focus:ring-2 focus:ring-offset-2 rounded-lg px-4 py-2"
            style={{
              color: 'var(--pb-gray-text)',
              '--tw-ring-color': 'var(--pb-blue-primary)',
            }}
          >
            <RefreshCw size={14} aria-hidden="true" />
            Start Over
          </button>
        </div>
      </div>

      <DisclaimerFooter />
    </main>
  );
}
