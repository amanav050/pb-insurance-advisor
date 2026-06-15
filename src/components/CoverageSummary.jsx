import { ShieldCheck, TrendingUp } from 'lucide-react';

export default function CoverageSummary({ coverageAmount, reasoning, insuranceType }) {
  return (
    <section
      className="rounded-2xl p-5 md:p-7 relative overflow-hidden animate-summary-in"
      style={{
        background: 'linear-gradient(135deg, #2B3A8C 0%, #1A237E 50%, #0D1452 100%)',
        color: 'var(--pb-white)',
      }}
      aria-label="Coverage recommendation summary"
    >
      {/* Decorative element */}
      <div
        className="absolute top-0 right-0 w-40 h-40 rounded-full opacity-10"
        style={{ background: 'radial-gradient(circle, #F56B2A, transparent)', transform: 'translate(20%, -30%)' }}
      />

      <div className="relative z-10">
        <div className="flex items-center gap-2 mb-4">
          <div className="w-9 h-9 rounded-xl flex items-center justify-center" style={{ backgroundColor: 'rgba(255,255,255,0.15)' }}>
            <ShieldCheck size={20} aria-hidden="true" strokeWidth={2} />
          </div>
          <span className="text-sm font-medium opacity-80">Your Recommended Coverage</span>
        </div>

        <h2 className="text-2xl md:text-3xl font-bold mb-2 leading-tight">
          {coverageAmount || 'Personalised Coverage'}
        </h2>

        <div className="flex items-center gap-2 mb-4">
          <span
            className="inline-flex items-center gap-1.5 text-xs font-semibold px-3 py-1 rounded-full"
            style={{ backgroundColor: 'rgba(255,255,255,0.15)' }}
          >
            {insuranceType === 'health' ? '🏥 Health Insurance' : '🛡️ Term Life Insurance'}
          </span>
          <span
            className="inline-flex items-center gap-1 text-xs font-semibold px-3 py-1 rounded-full"
            style={{ backgroundColor: 'rgba(76,175,80,0.2)', color: '#A5D6A7' }}
          >
            <TrendingUp size={11} aria-hidden="true" />
            AI Recommended
          </span>
        </div>

        {reasoning && (
          <p className="text-sm leading-relaxed opacity-85 mt-3 pt-3" style={{ borderTop: '1px solid rgba(255,255,255,0.1)' }}>
            {reasoning}
          </p>
        )}
      </div>

      <style>{`
        @keyframes summaryIn {
          from { opacity: 0; transform: translateY(12px); }
          to { opacity: 1; transform: translateY(0); }
        }
        .animate-summary-in {
          animation: summaryIn 0.4s ease-out both;
        }
        @media (prefers-reduced-motion: reduce) {
          .animate-summary-in { animation: none; }
        }
      `}</style>
    </section>
  );
}
