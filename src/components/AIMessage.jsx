import { Bot } from 'lucide-react';

export default function AIMessage({ content, timestamp }) {
  return (
    <div className="flex gap-2.5 max-w-[90%] md:max-w-[680px] animate-msg-in" role="log">
      {/* Avatar */}
      <div
        className="w-8 h-8 rounded-full flex items-center justify-center shrink-0 mt-0.5 shadow-sm"
        style={{ background: 'linear-gradient(135deg, #2B3A8C, #1A237E)' }}
        aria-hidden="true"
      >
        <Bot size={15} className="text-white" strokeWidth={2} />
      </div>

      {/* Bubble */}
      <div>
        <div
          className="rounded-2xl rounded-tl-md px-4 py-3 text-sm leading-relaxed shadow-sm"
          style={{
            backgroundColor: 'var(--pb-white)',
            color: 'var(--pb-text-primary)',
            border: '1px solid var(--pb-gray-border)',
          }}
        >
          {content}
        </div>
        {timestamp && (
          <span className="text-[11px] mt-1 block pl-1" style={{ color: 'var(--pb-gray-text)' }}>
            {timestamp}
          </span>
        )}
      </div>

      <style>{`
        @keyframes msgIn {
          from { opacity: 0; transform: translateY(8px) scale(0.98); }
          to { opacity: 1; transform: translateY(0) scale(1); }
        }
        .animate-msg-in {
          animation: msgIn 0.3s ease-out both;
        }
        @media (prefers-reduced-motion: reduce) {
          .animate-msg-in { animation: none; }
        }
      `}</style>
    </div>
  );
}
