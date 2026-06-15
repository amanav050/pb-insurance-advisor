import { PhoneOff, CheckCircle, Sparkles } from 'lucide-react';

const badges = [
  { icon: PhoneOff, label: 'No phone number required' },
  { icon: CheckCircle, label: 'Free & unbiased' },
  { icon: Sparkles, label: 'Powered by AI' },
];

export default function TrustBadges() {
  return (
    <div className="flex flex-wrap items-center justify-center gap-x-6 gap-y-3 py-6 px-4">
      {badges.map(({ icon: Icon, label }) => (
        <div key={label} className="flex items-center gap-1.5" style={{ color: 'var(--pb-gray-text)' }}>
          <Icon size={16} aria-hidden="true" strokeWidth={1.8} />
          <span className="text-sm">{label}</span>
        </div>
      ))}
    </div>
  );
}
