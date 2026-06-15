export default function QuickReplyButtons({ options, onSelect, disabled = false }) {
  if (!options || options.length === 0) return null;

  return (
    <div
      className="flex flex-wrap gap-2 max-w-[90%] md:max-w-[680px] pl-10 animate-qr-in"
      role="group"
      aria-label="Quick reply options"
    >
      {options.map((option, i) => (
        <button
          key={option}
          onClick={() => onSelect(option)}
          disabled={disabled}
          className="text-sm font-medium px-4 py-2.5 rounded-full transition-all duration-200 cursor-pointer focus:outline-none focus:ring-2 focus:ring-offset-2 disabled:opacity-50 disabled:cursor-not-allowed hover:shadow-sm"
          style={{
            backgroundColor: 'var(--pb-white)',
            color: 'var(--pb-blue-primary)',
            border: '1.5px solid var(--pb-blue-primary)',
            minHeight: '42px',
            '--tw-ring-color': 'var(--pb-blue-primary)',
            animationDelay: `${i * 40}ms`,
          }}
          onMouseEnter={(e) => {
            if (!disabled) {
              e.currentTarget.style.backgroundColor = 'var(--pb-blue-primary)';
              e.currentTarget.style.color = 'var(--pb-white)';
              e.currentTarget.style.transform = 'translateY(-1px)';
            }
          }}
          onMouseLeave={(e) => {
            if (!disabled) {
              e.currentTarget.style.backgroundColor = 'var(--pb-white)';
              e.currentTarget.style.color = 'var(--pb-blue-primary)';
              e.currentTarget.style.transform = 'translateY(0)';
            }
          }}
        >
          {option}
        </button>
      ))}

      <style>{`
        @keyframes qrIn {
          from { opacity: 0; transform: translateY(6px); }
          to { opacity: 1; transform: translateY(0); }
        }
        .animate-qr-in > button {
          animation: qrIn 0.25s ease-out both;
        }
        @media (prefers-reduced-motion: reduce) {
          .animate-qr-in > button { animation: none; }
        }
      `}</style>
    </div>
  );
}
