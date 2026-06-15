import { useState } from 'react';
import { SendHorizontal } from 'lucide-react';

export default function ChatInput({ onSend, disabled = false, placeholder = 'Type your answer...' }) {
  const [input, setInput] = useState('');

  const handleSubmit = (e) => {
    e.preventDefault();
    const trimmed = input.trim();
    if (!trimmed || disabled) return;
    onSend(trimmed);
    setInput('');
  };

  const handleKeyDown = (e) => {
    if (e.key === 'Enter' && !e.shiftKey) {
      e.preventDefault();
      handleSubmit(e);
    }
  };

  return (
    <div
      className="sticky bottom-0 w-full px-3 py-3 md:px-6 md:py-4"
      style={{
        backgroundColor: 'var(--pb-white)',
        borderTop: '1px solid var(--pb-gray-border)',
      }}
    >
      <div className="max-w-[680px] mx-auto flex items-center gap-2">
        <label htmlFor="chat-input" className="sr-only">Type your answer</label>
        <input
          id="chat-input"
          type="text"
          value={input}
          onChange={(e) => setInput(e.target.value)}
          onKeyDown={handleKeyDown}
          placeholder={placeholder}
          disabled={disabled}
          autoComplete="off"
          className="flex-1 rounded-full px-4 py-3 text-sm outline-none transition-colors focus:ring-2 focus:ring-offset-1 disabled:opacity-50"
          style={{
            backgroundColor: 'var(--pb-gray-bg)',
            border: '1px solid var(--pb-gray-border)',
            color: 'var(--pb-text-primary)',
            minHeight: '48px',
            '--tw-ring-color': 'var(--pb-blue-primary)',
          }}
        />
        <button
          onClick={handleSubmit}
          disabled={disabled || !input.trim()}
          aria-label="Send message"
          className="flex items-center justify-center rounded-full transition-colors duration-150 cursor-pointer focus:outline-none focus:ring-2 focus:ring-offset-2 disabled:opacity-40 disabled:cursor-not-allowed"
          style={{
            backgroundColor: input.trim() && !disabled ? 'var(--pb-orange-cta)' : 'var(--pb-gray-border)',
            width: '48px',
            height: '48px',
            '--tw-ring-color': 'var(--pb-orange-cta)',
          }}
        >
          <SendHorizontal size={20} className="text-white" strokeWidth={2} />
        </button>
      </div>
    </div>
  );
}
