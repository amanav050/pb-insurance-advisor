export default function UserMessage({ content, timestamp }) {
  return (
    <div className="flex justify-end animate-msg-in-right" role="log">
      <div className="max-w-[85%] md:max-w-[480px]">
        <div
          className="rounded-2xl rounded-tr-md px-4 py-3 text-sm leading-relaxed shadow-sm text-white"
          style={{ background: 'linear-gradient(135deg, #2B3A8C, #1A237E)' }}
        >
          {content}
        </div>
        {timestamp && (
          <span className="text-[11px] mt-1 block text-right pr-1" style={{ color: 'var(--pb-gray-text)' }}>
            {timestamp}
          </span>
        )}
      </div>

      <style>{`
        @keyframes msgInRight {
          from { opacity: 0; transform: translateY(8px) scale(0.98); }
          to { opacity: 1; transform: translateY(0) scale(1); }
        }
        .animate-msg-in-right {
          animation: msgInRight 0.3s ease-out both;
        }
        @media (prefers-reduced-motion: reduce) {
          .animate-msg-in-right { animation: none; }
        }
      `}</style>
    </div>
  );
}
