import { Check, Star, Award } from 'lucide-react';

export default function PolicyCard({ policy, rank }) {
  const isTopPick = rank === 0;

  return (
    <article
      className="rounded-2xl relative transition-all duration-300 hover:shadow-md overflow-hidden"
      style={{
        backgroundColor: 'var(--pb-white)',
        border: isTopPick ? '2px solid var(--pb-orange-cta)' : '1px solid var(--pb-gray-border)',
        boxShadow: isTopPick ? '0 4px 20px rgba(245,107,42,0.12)' : '0 2px 8px rgba(0,0,0,0.05)',
        animationDelay: `${rank * 0.1}s`,
      }}
    >
      {/* Top pick banner */}
      {isTopPick && (
        <div
          className="flex items-center justify-center gap-1.5 py-2 text-xs font-bold text-white tracking-wide"
          style={{ background: 'linear-gradient(135deg, #F56B2A, #E55A1B)' }}
        >
          <Award size={13} fill="currentColor" aria-hidden="true" />
          BEST MATCH FOR YOU
        </div>
      )}

      <div className="p-5">
        {/* Rank badge + name */}
        <div className="flex items-start gap-3 mb-3">
          <div
            className="w-8 h-8 rounded-lg flex items-center justify-center shrink-0 text-xs font-bold"
            style={{
              backgroundColor: isTopPick ? 'var(--pb-orange-cta)' : 'var(--pb-gray-bg)',
              color: isTopPick ? 'white' : 'var(--pb-gray-text)',
            }}
          >
            #{rank + 1}
          </div>
          <div>
            <h3 className="font-semibold text-[15px] leading-snug" style={{ color: 'var(--pb-text-primary)' }}>
              {policy.name}
            </h3>
            {policy.premium && (
              <p className="text-sm mt-0.5" style={{ color: 'var(--pb-blue-primary)' }}>
                <span className="font-bold">
                  {policy.premium.includes('₹') ? policy.premium : `₹${policy.premium}`}
                </span>
                {!policy.premium.toLowerCase().includes('year') && (
                  <span className="font-normal opacity-60"> /year approx.</span>
                )}
              </p>
            )}
          </div>
        </div>

        {/* Features */}
        {policy.features.length > 0 && (
          <ul className="space-y-2 mb-4 pl-11">
            {policy.features.map((feature, i) => (
              <li key={i} className="flex items-start gap-2 text-sm" style={{ color: 'var(--pb-text-dark)' }}>
                <Check
                  size={15}
                  className="shrink-0 mt-0.5"
                  style={{ color: 'var(--pb-green-success)' }}
                  aria-hidden="true"
                  strokeWidth={2.5}
                />
                <span>{feature}</span>
              </li>
            ))}
          </ul>
        )}

        {/* Fit reason */}
        {policy.fitReason && (
          <div
            className="rounded-xl p-3.5 text-sm ml-11"
            style={{ backgroundColor: 'var(--pb-blue-light)', color: 'var(--pb-blue-primary)' }}
          >
            <span className="font-semibold">Why this fits you: </span>
            {policy.fitReason}
          </div>
        )}
      </div>
    </article>
  );
}
