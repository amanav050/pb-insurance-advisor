import { useState, useCallback, useEffect } from 'react';
import MessageList from './MessageList';
import ChatInput from './ChatInput';
import ProgressBar from './ProgressBar';
import { INSURANCE_TYPES } from '../utils/constants';
import { sendMessage } from '../services/groqService';

const HEALTH_QUICK_REPLIES = [
  ['Just me', 'Me + spouse', 'Family (spouse + kids)', 'Parents'],
  ['25-30', '31-35', '36-40', '41-50', '50+'],
  ['Delhi', 'Mumbai', 'Bangalore', 'Other metro', 'Tier 2 city', 'Tier 3/town'],
  ['Under ₹5L', '₹5-10L', '₹10-20L', '₹20-40L', '₹40L+'],
  ['No employer cover', 'Yes, up to ₹3L', 'Yes, up to ₹5L', 'Yes, ₹5L+', 'Not sure'],
  ['None', 'Diabetes', 'Hypertension', 'Heart condition', 'Other', 'Prefer not to say'],
  ['Under ₹1,000', '₹1,000-2,000', '₹2,000-3,000', '₹3,000-5,000', 'No fixed budget'],
];

const TERM_QUICK_REPLIES = [
  ['25-30', '31-35', '36-40', '41-45', '45+'],
  ['Under ₹5L', '₹5-10L', '₹10-20L', '₹20-40L', '₹40L+'],
  ['None', 'Spouse only', 'Spouse + 1 child', 'Spouse + 2+ children', 'Parents too'],
  ['No loans', 'Home loan', 'Car loan', 'Both', 'Other EMIs'],
  ['None', 'Up to ₹25L', '₹25L-50L', '₹50L+', 'Not sure'],
  ['No', 'Yes', 'Occasionally'],
  ['Until 60', 'Until 65', 'Until 70', 'Until 75'],
];

const TOTAL_QUESTIONS = 7;

function getTimestamp() {
  return new Date().toLocaleTimeString('en-IN', { hour: '2-digit', minute: '2-digit' });
}

let messageId = 0;
function createMsg(role, content) {
  return { id: ++messageId, role, content, timestamp: getTimestamp() };
}

export default function ChatInterface({ insuranceType, onRecommendation }) {
  const quickRepliesMap = insuranceType === INSURANCE_TYPES.HEALTH ? HEALTH_QUICK_REPLIES : TERM_QUICK_REPLIES;
  const [messages, setMessages] = useState([]);
  const [apiHistory, setApiHistory] = useState([]);
  const [userStep, setUserStep] = useState(0);
  const [isTyping, setIsTyping] = useState(false);
  const [conversationDone, setConversationDone] = useState(false);
  const [error, setError] = useState(null);

  // Initial AI greeting
  useEffect(() => {
    let cancelled = false;
    async function fetchGreeting() {
      setIsTyping(true);
      try {
        const reply = await sendMessage([], insuranceType);
        if (!cancelled) {
          const aiMsg = createMsg('assistant', reply);
          setMessages([aiMsg]);
          setApiHistory([{ role: 'assistant', content: reply }]);
        }
      } catch (err) {
        if (!cancelled) {
          setError(err.message);
          const fallback = createMsg('assistant',
            insuranceType === INSURANCE_TYPES.HEALTH
              ? "Hi! I'm your PolicyBazaar AI Advisor. Let's find the right health insurance for you. First — who are we covering today?"
              : "Hi! I'm your PolicyBazaar AI Advisor. Let's find the right term life insurance for you. What's your age?"
          );
          setMessages([fallback]);
          setApiHistory([{ role: 'assistant', content: fallback.content }]);
        }
      } finally {
        if (!cancelled) setIsTyping(false);
      }
    }
    fetchGreeting();
    return () => { cancelled = true; };
  }, [insuranceType]);

  const handleUserResponse = useCallback(async (text) => {
    if (isTyping || conversationDone) return;
    setError(null);

    const userMsg = createMsg('user', text);
    const newApiHistory = [...apiHistory, { role: 'user', content: text }];

    setMessages((prev) => [...prev, userMsg]);
    setApiHistory(newApiHistory);
    setIsTyping(true);

    const nextStep = userStep + 1;
    setUserStep(nextStep);

    try {
      const reply = await sendMessage(newApiHistory, insuranceType);

      // After all questions: show a brief transition message, then go to recommendation screen
      if (nextStep >= TOTAL_QUESTIONS) {
        const transitionMsg = createMsg('assistant', '✅ Got everything I need! Preparing your personalised recommendation...');
        setMessages((prev) => [...prev, transitionMsg]);
        setConversationDone(true);
        setIsTyping(false);

        // Short delay so user sees the transition message, then switch screen
        setTimeout(() => {
          if (onRecommendation) onRecommendation(reply);
        }, 1500);
      } else {
        // Normal question flow — show AI's next question
        const aiMsg = createMsg('assistant', reply);
        setMessages((prev) => [...prev, aiMsg]);
        setApiHistory((prev) => [...prev, { role: 'assistant', content: reply }]);
        setIsTyping(false);
      }
    } catch (err) {
      setError(err.message);
      const errMsg = createMsg('assistant', 'Sorry, I hit a temporary issue. Please try sending your answer again.');
      setMessages((prev) => [...prev, errMsg]);
      setUserStep(userStep);
      setIsTyping(false);
    }
  }, [apiHistory, userStep, isTyping, conversationDone, insuranceType, onRecommendation]);

  const currentQuickReplies = !conversationDone && userStep < quickRepliesMap.length
    ? quickRepliesMap[userStep]
    : null;

  return (
    <div className="flex-1 flex flex-col min-h-0">
      <ProgressBar current={Math.min(userStep + 1, TOTAL_QUESTIONS)} total={TOTAL_QUESTIONS} />

      {error && (
        <div
          className="mx-3 md:mx-6 px-4 py-2 rounded-lg text-sm"
          style={{ backgroundColor: '#FFF3E0', color: '#E65100', border: '1px solid #FFB74D' }}
          role="alert"
        >
          {error}
        </div>
      )}

      <MessageList
        messages={messages}
        quickReplies={currentQuickReplies}
        onQuickReply={handleUserResponse}
        isTyping={isTyping}
      />

      <ChatInput
        onSend={handleUserResponse}
        disabled={isTyping || conversationDone}
        placeholder={conversationDone ? 'Preparing your recommendation...' : 'Type your answer...'}
      />
    </div>
  );
}
