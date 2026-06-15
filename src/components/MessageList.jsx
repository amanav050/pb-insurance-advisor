import { useEffect, useRef } from 'react';
import AIMessage from './AIMessage';
import UserMessage from './UserMessage';
import QuickReplyButtons from './QuickReplyButtons';
import TypingIndicator from './TypingIndicator';

export default function MessageList({ messages, quickReplies, onQuickReply, isTyping }) {
  const bottomRef = useRef(null);

  useEffect(() => {
    bottomRef.current?.scrollIntoView({ behavior: 'smooth' });
  }, [messages, isTyping]);

  return (
    <div 
      className="flex-1 overflow-y-auto px-3 py-4 md:px-6 md:py-6 flex flex-col gap-4"
      role="log"
      aria-label="Chat messages"
      aria-live="polite"
    >
      {messages.map((msg) => (
        msg.role === 'assistant' ? (
          <AIMessage key={msg.id} content={msg.content} timestamp={msg.timestamp} />
        ) : (
          <UserMessage key={msg.id} content={msg.content} timestamp={msg.timestamp} />
        )
      ))}

      {isTyping && <TypingIndicator />}

      {!isTyping && quickReplies && quickReplies.length > 0 && (
        <QuickReplyButtons options={quickReplies} onSelect={onQuickReply} />
      )}

      <div ref={bottomRef} />
    </div>
  );
}
