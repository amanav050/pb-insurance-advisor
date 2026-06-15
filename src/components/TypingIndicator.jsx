import { Bot } from 'lucide-react';

export default function TypingIndicator() {
  return (
    <div className="flex gap-2.5 max-w-[90%] md:max-w-[680px]" aria-live="polite" aria-label="AI is typing">
      <div
        className="w-8 h-8 rounded-full flex items-center justify-center shrink-0 mt-0.5"
        style={{ backgroundColor: 'var(--pb-blue-primary)' }}
        aria-hidden="true"
      >
        <Bot size={16} className="text-white" strokeWidth={2} />
      </div>

      <div
        className="rounded-2xl rounded-tl-sm px-5 py-4 flex items-center gap-1.5"
        style={{
          backgroundColor: 'var(--pb-gray-bg)',
          border: '1px solid var(--pb-gray-border)',
        }}
      >
        <span className="typing-dot" style={{ animationDelay: '0ms' }} />
        <span className="typing-dot" style={{ animationDelay: '150ms' }} />
        <span className="typing-dot" style={{ animationDelay: '300ms' }} />
      </div>

      <style>{`
        .typing-dot {
          width: 8px;
          height: 8px;
          border-radius: 50%;
          background-color: var(--pb-gray-text);
          opacity: 0.4;
          animation: typingBounce 1.2s ease-in-out infinite;
        }
        @keyframes typingBounce {
          0%, 60%, 100% { transform: translateY(0); opacity: 0.4; }
          30% { transform: translateY(-4px); opacity: 1; }
        }
        @media (prefers-reduced-motion: reduce) {
          .typing-dot { animation: none; opacity: 0.6; }
        }
      `}</style>
    </div>
  );
}
