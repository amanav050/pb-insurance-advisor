import { Shield, Umbrella, ArrowRight, PhoneOff, CheckCircle, Sparkles, Heart, Users, TrendingUp } from 'lucide-react';
import { APP_CONFIG, INSURANCE_TYPES } from '../utils/constants';
import DisclaimerFooter from './DisclaimerFooter';

const insuranceOptions = [
  {
    type: INSURANCE_TYPES.HEALTH,
    icon: Shield,
    accentIcon: Heart,
    title: 'Health Insurance',
    subtitle: 'Cover medical expenses for you and your family',
    features: ['Cashless hospitalisation', 'Pre & post-hospitalisation', 'No-claim bonus'],
    gradient: 'linear-gradient(135deg, #E8EAF6 0%, #C5CAE9 100%)',
    iconBg: '#2B3A8C',
  },
  {
    type: INSURANCE_TYPES.TERM,
    icon: Umbrella,
    accentIcon: Users,
    title: 'Term Life Insurance',
    subtitle: "Secure your family's financial future",
    features: ['High coverage, low premium', 'Tax benefits under 80C', 'Loan & EMI protection'],
    gradient: 'linear-gradient(135deg, #FFF3E0 0%, #FFE0B2 100%)',
    iconBg: '#E65100',
  },
];

const trustBadges = [
  { icon: PhoneOff, label: 'No phone number required' },
  { icon: CheckCircle, label: 'Free & unbiased' },
  { icon: Sparkles, label: 'Powered by AI' },
];

const stats = [
  { value: '5 min', label: 'Average time' },
  { value: '10L+', label: 'Users advised' },
  { value: '50+', label: 'Insurers compared' },
];

export default function WelcomeScreen({ onSelectType }) {
  return (
    <main className="flex flex-col">
      {/* Hero section with gradient */}
      <section
        className="w-full px-4 md:px-6 pt-8 pb-10 md:pt-12 md:pb-14 relative overflow-hidden"
        style={{
          background: 'linear-gradient(160deg, #2B3A8C 0%, #1A237E 50%, #0D1452 100%)',
        }}
      >
        {/* Decorative circles */}
        <div className="absolute top-0 right-0 w-64 h-64 rounded-full opacity-10" style={{ background: 'radial-gradient(circle, #F56B2A, transparent)', transform: 'translate(30%, -30%)' }} />
        <div className="absolute bottom-0 left-0 w-48 h-48 rounded-full opacity-8" style={{ background: 'radial-gradient(circle, #5C6BC0, transparent)', transform: 'translate(-20%, 20%)' }} />

        <div className="max-w-[680px] mx-auto text-center relative z-10">
          <div
            className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full text-xs font-semibold mb-5 tracking-wide"
            style={{ backgroundColor: 'rgba(245,107,42,0.15)', color: '#FFB74D', border: '1px solid rgba(245,107,42,0.25)' }}
          >
            <TrendingUp size={13} aria-hidden="true" />
            INDIA'S #1 INSURANCE PLATFORM
          </div>

          <h1
            className="font-bold leading-tight mb-4 text-white"
            style={{ fontSize: 'clamp(1.6rem, 5vw, 2.4rem)' }}
          >
            Find the Right Insurance
            <br />
            for <span style={{ color: '#FFB74D' }}>YOUR</span> Life
          </h1>

          <p
            className="leading-relaxed max-w-md mx-auto mb-8"
            style={{ color: 'rgba(255,255,255,0.75)', fontSize: '15px' }}
          >
            {APP_CONFIG.heroSubtitle}
          </p>

          {/* Stats row */}
          <div className="flex justify-center gap-8 md:gap-12">
            {stats.map((stat) => (
              <div key={stat.label} className="text-center">
                <div className="text-xl md:text-2xl font-bold text-white">{stat.value}</div>
                <div className="text-xs mt-0.5" style={{ color: 'rgba(255,255,255,0.5)' }}>{stat.label}</div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Insurance type cards */}
      <section className="w-full px-4 md:px-6 -mt-6 relative z-10 pb-2" aria-label="Choose insurance type">
        <div className="max-w-[680px] mx-auto grid grid-cols-1 md:grid-cols-2 gap-4 md:gap-5">
          {insuranceOptions.map(({ type, icon: Icon, accentIcon: AccentIcon, title, subtitle, features, gradient, iconBg }) => (
            <article
              key={type}
              className="group rounded-2xl overflow-hidden flex flex-col transition-all duration-300 hover:shadow-lg hover:-translate-y-1 animate-card-entry"
              style={{
                backgroundColor: 'var(--pb-white)',
                boxShadow: '0 4px 20px rgba(0,0,0,0.1)',
              }}
            >
              {/* Card header with gradient */}
              <div className="px-5 pt-5 pb-3" style={{ background: gradient }}>
                <div className="flex items-center justify-between mb-2">
                  <div
                    className="w-11 h-11 rounded-xl flex items-center justify-center"
                    style={{ backgroundColor: iconBg }}
                  >
                    <Icon size={22} className="text-white" aria-hidden="true" strokeWidth={1.8} />
                  </div>
                  <AccentIcon size={32} aria-hidden="true" style={{ opacity: 0.15, color: iconBg }} />
                </div>
                <h2 className="font-bold text-base" style={{ color: 'var(--pb-text-primary)' }}>
                  {title}
                </h2>
              </div>

              {/* Card body */}
              <div className="px-5 pt-3 pb-5 flex flex-col flex-1">
                <p className="text-sm mb-4 leading-relaxed" style={{ color: 'var(--pb-gray-text)' }}>
                  {subtitle}
                </p>

                {/* Feature pills */}
                <div className="flex flex-wrap gap-1.5 mb-5">
                  {features.map((feature) => (
                    <span
                      key={feature}
                      className="inline-flex items-center gap-1 text-xs font-medium px-2.5 py-1 rounded-full"
                      style={{ backgroundColor: 'var(--pb-green-light)', color: '#2E7D32' }}
                    >
                      <CheckCircle size={11} aria-hidden="true" strokeWidth={2.5} />
                      {feature}
                    </span>
                  ))}
                </div>

                {/* CTA */}
                <button
                  onClick={() => onSelectType(type)}
                  className="mt-auto w-full flex items-center justify-center gap-2 font-semibold text-white rounded-xl cursor-pointer transition-all duration-200 focus:outline-none focus:ring-2 focus:ring-offset-2 group-hover:shadow-md"
                  style={{
                    backgroundColor: 'var(--pb-orange-cta)',
                    padding: '13px 24px',
                    fontSize: '15px',
                    minHeight: '48px',
                    '--tw-ring-color': 'var(--pb-orange-cta)',
                  }}
                  onMouseEnter={(e) => e.currentTarget.style.backgroundColor = 'var(--pb-orange-hover)'}
                  onMouseLeave={(e) => e.currentTarget.style.backgroundColor = 'var(--pb-orange-cta)'}
                >
                  Get My Recommendation
                  <ArrowRight size={18} aria-hidden="true" strokeWidth={2.2} className="transition-transform duration-200 group-hover:translate-x-0.5" />
                </button>
              </div>
            </article>
          ))}
        </div>
      </section>

      {/* Trust badges */}
      <div className="flex flex-wrap items-center justify-center gap-x-6 gap-y-3 py-6 px-4">
        {trustBadges.map(({ icon: Icon, label }) => (
          <div key={label} className="flex items-center gap-1.5" style={{ color: 'var(--pb-gray-text)' }}>
            <Icon size={15} aria-hidden="true" strokeWidth={1.8} />
            <span className="text-sm">{label}</span>
          </div>
        ))}
      </div>

      {/* Spacer */}
      <div className="flex-1" />

      <DisclaimerFooter />

      <style>{`
        @keyframes cardEntry {
          from { opacity: 0; transform: translateY(20px); }
          to { opacity: 1; transform: translateY(0); }
        }
        .animate-card-entry {
          animation: cardEntry 0.5s ease-out both;
        }
        .animate-card-entry:nth-child(2) {
          animation-delay: 0.1s;
        }
        @media (prefers-reduced-motion: reduce) {
          .animate-card-entry { animation: none; }
        }
      `}</style>
    </main>
  );
}
