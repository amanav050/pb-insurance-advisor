import { useState } from 'react';
import { X, Phone, Calendar, Clock, CheckCircle, Shield } from 'lucide-react';

const TIME_SLOTS = [
  '10:00 AM', '11:00 AM', '12:00 PM',
  '2:00 PM', '3:00 PM', '4:00 PM', '5:00 PM', '6:00 PM',
];

function getNextDays(count) {
  const days = [];
  const today = new Date();
  for (let i = 1; i <= count; i++) {
    const d = new Date(today);
    d.setDate(today.getDate() + i);
    days.push({
      value: d.toISOString().split('T')[0],
      label: d.toLocaleDateString('en-IN', { weekday: 'short', day: 'numeric', month: 'short' }),
      isWeekend: d.getDay() === 0 || d.getDay() === 6,
    });
  }
  return days.filter(d => !d.isWeekend);
}

export default function ScheduleCallbackModal({ isOpen, onClose }) {
  const [step, setStep] = useState('form'); // form | success
  const [phone, setPhone] = useState('');
  const [date, setDate] = useState('');
  const [time, setTime] = useState('');
  const [phoneError, setPhoneError] = useState('');

  const availableDays = getNextDays(10);

  const validatePhone = (value) => {
    const cleaned = value.replace(/\D/g, '');
    if (cleaned.length === 0) return 'Phone number is required';
    if (cleaned.length < 10) return 'Enter a valid 10-digit number';
    if (cleaned.length > 10) return 'Phone number too long';
    return '';
  };

  const handleSubmit = () => {
    const error = validatePhone(phone);
    if (error) {
      setPhoneError(error);
      return;
    }
    if (!date || !time) return;
    setStep('success');
  };

  const handleClose = () => {
    setStep('form');
    setPhone('');
    setDate('');
    setTime('');
    setPhoneError('');
    onClose();
  };

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-end sm:items-center justify-center" role="dialog" aria-modal="true" aria-label="Schedule a callback">
      {/* Backdrop */}
      <div
        className="absolute inset-0 bg-black/50 backdrop-blur-sm"
        onClick={handleClose}
        aria-hidden="true"
      />

      {/* Modal */}
      <div
        className="relative w-full sm:max-w-md mx-auto rounded-t-2xl sm:rounded-2xl overflow-hidden shadow-2xl animate-slide-up"
        style={{ backgroundColor: 'var(--pb-white)' }}
      >
        {/* Header */}
        <div
          className="px-5 py-4 flex items-center justify-between"
          style={{ background: 'linear-gradient(135deg, #2B3A8C 0%, #1A237E 100%)' }}
        >
          <div className="flex items-center gap-2 text-white">
            <Phone size={18} aria-hidden="true" />
            <h2 className="font-semibold text-base">
              {step === 'form' ? 'Schedule a Callback' : 'Callback Scheduled!'}
            </h2>
          </div>
          <button
            onClick={handleClose}
            className="w-8 h-8 flex items-center justify-center rounded-full text-white/80 hover:text-white hover:bg-white/10 transition-colors cursor-pointer focus:outline-none focus:ring-2 focus:ring-white"
            aria-label="Close modal"
          >
            <X size={18} />
          </button>
        </div>

        {step === 'form' ? (
          <div className="px-5 py-5 space-y-5">
            {/* Trust line */}
            <div className="flex items-center gap-2 text-xs" style={{ color: 'var(--pb-gray-text)' }}>
              <Shield size={14} aria-hidden="true" style={{ color: 'var(--pb-green-success)' }} />
              <span>Your number is only used for this callback. No spam, ever.</span>
            </div>

            {/* Phone input */}
            <div>
              <label htmlFor="phone" className="block text-sm font-medium mb-1.5" style={{ color: 'var(--pb-text-primary)' }}>
                Phone Number
              </label>
              <div className="flex items-center rounded-xl overflow-hidden" style={{ border: `1.5px solid ${phoneError ? '#EF5350' : 'var(--pb-gray-border)'}` }}>
                <span
                  className="px-3 py-3 text-sm font-medium shrink-0 select-none"
                  style={{ backgroundColor: 'var(--pb-gray-bg)', color: 'var(--pb-gray-text)' }}
                >
                  +91
                </span>
                <input
                  id="phone"
                  type="tel"
                  inputMode="numeric"
                  maxLength={10}
                  value={phone}
                  onChange={(e) => {
                    const val = e.target.value.replace(/\D/g, '');
                    setPhone(val);
                    if (phoneError) setPhoneError('');
                  }}
                  placeholder="Enter 10-digit number"
                  className="flex-1 px-3 py-3 text-sm outline-none"
                  style={{ color: 'var(--pb-text-primary)' }}
                  autoComplete="tel"
                />
              </div>
              {phoneError && (
                <p className="text-xs mt-1" style={{ color: '#EF5350' }}>{phoneError}</p>
              )}
            </div>

            {/* Date selection */}
            <div>
              <label className="block text-sm font-medium mb-2" style={{ color: 'var(--pb-text-primary)' }}>
                <Calendar size={14} className="inline mr-1.5 -mt-0.5" aria-hidden="true" />
                Preferred Date
              </label>
              <div className="flex gap-2 overflow-x-auto pb-1 -mx-1 px-1 scrollbar-thin">
                {availableDays.slice(0, 5).map((day) => (
                  <button
                    key={day.value}
                    onClick={() => setDate(day.value)}
                    className="shrink-0 px-3 py-2 rounded-xl text-xs font-medium transition-colors cursor-pointer focus:outline-none focus:ring-2 focus:ring-offset-1"
                    style={{
                      backgroundColor: date === day.value ? 'var(--pb-blue-primary)' : 'var(--pb-gray-bg)',
                      color: date === day.value ? 'var(--pb-white)' : 'var(--pb-text-dark)',
                      border: `1px solid ${date === day.value ? 'var(--pb-blue-primary)' : 'var(--pb-gray-border)'}`,
                      minHeight: '40px',
                      '--tw-ring-color': 'var(--pb-blue-primary)',
                    }}
                  >
                    {day.label}
                  </button>
                ))}
              </div>
            </div>

            {/* Time selection */}
            <div>
              <label className="block text-sm font-medium mb-2" style={{ color: 'var(--pb-text-primary)' }}>
                <Clock size={14} className="inline mr-1.5 -mt-0.5" aria-hidden="true" />
                Preferred Time
              </label>
              <div className="grid grid-cols-4 gap-2">
                {TIME_SLOTS.map((slot) => (
                  <button
                    key={slot}
                    onClick={() => setTime(slot)}
                    className="px-2 py-2 rounded-xl text-xs font-medium transition-colors cursor-pointer focus:outline-none focus:ring-2 focus:ring-offset-1"
                    style={{
                      backgroundColor: time === slot ? 'var(--pb-blue-primary)' : 'var(--pb-gray-bg)',
                      color: time === slot ? 'var(--pb-white)' : 'var(--pb-text-dark)',
                      border: `1px solid ${time === slot ? 'var(--pb-blue-primary)' : 'var(--pb-gray-border)'}`,
                      minHeight: '40px',
                      '--tw-ring-color': 'var(--pb-blue-primary)',
                    }}
                  >
                    {slot}
                  </button>
                ))}
              </div>
            </div>

            {/* Submit */}
            <button
              onClick={handleSubmit}
              disabled={!phone || !date || !time}
              className="w-full flex items-center justify-center gap-2 font-semibold text-white rounded-full cursor-pointer transition-all duration-200 focus:outline-none focus:ring-2 focus:ring-offset-2 disabled:opacity-40 disabled:cursor-not-allowed"
              style={{
                backgroundColor: 'var(--pb-orange-cta)',
                padding: '14px 24px',
                fontSize: '15px',
                minHeight: '50px',
                '--tw-ring-color': 'var(--pb-orange-cta)',
              }}
              onMouseEnter={(e) => { if (!e.currentTarget.disabled) e.currentTarget.style.backgroundColor = 'var(--pb-orange-hover)'; }}
              onMouseLeave={(e) => { if (!e.currentTarget.disabled) e.currentTarget.style.backgroundColor = 'var(--pb-orange-cta)'; }}
            >
              <Phone size={18} aria-hidden="true" />
              Confirm Callback
            </button>
          </div>
        ) : (
          /* Success state */
          <div className="px-5 py-8 text-center space-y-4">
            <div
              className="w-16 h-16 rounded-full flex items-center justify-center mx-auto"
              style={{ backgroundColor: 'var(--pb-green-light)' }}
            >
              <CheckCircle size={32} style={{ color: 'var(--pb-green-success)' }} aria-hidden="true" strokeWidth={2} />
            </div>
            <div>
              <h3 className="font-semibold text-lg mb-1" style={{ color: 'var(--pb-text-primary)' }}>
                You're all set!
              </h3>
              <p className="text-sm leading-relaxed" style={{ color: 'var(--pb-gray-text)' }}>
                Our insurance expert will call you at <strong>+91 {phone}</strong> on{' '}
                <strong>{new Date(date).toLocaleDateString('en-IN', { weekday: 'long', day: 'numeric', month: 'short' })}</strong> around{' '}
                <strong>{time}</strong>.
              </p>
            </div>
            <p className="text-xs" style={{ color: 'var(--pb-gray-text)' }}>
              Keep your recommendation handy — the advisor will review it with you.
            </p>
            <button
              onClick={handleClose}
              className="w-full font-semibold rounded-full cursor-pointer transition-colors duration-150 focus:outline-none focus:ring-2 focus:ring-offset-2"
              style={{
                backgroundColor: 'var(--pb-blue-primary)',
                color: 'var(--pb-white)',
                padding: '14px 24px',
                fontSize: '15px',
                minHeight: '50px',
                '--tw-ring-color': 'var(--pb-blue-primary)',
              }}
            >
              Done
            </button>
          </div>
        )}

        {/* Modal animation */}
        <style>{`
          @keyframes slideUp {
            from { transform: translateY(100%); opacity: 0; }
            to { transform: translateY(0); opacity: 1; }
          }
          .animate-slide-up {
            animation: slideUp 0.3s ease-out;
          }
          @media (prefers-reduced-motion: reduce) {
            .animate-slide-up { animation: none; }
          }
          .scrollbar-thin::-webkit-scrollbar { height: 4px; }
          .scrollbar-thin::-webkit-scrollbar-thumb { background: var(--pb-gray-border); border-radius: 2px; }
        `}</style>
      </div>
    </div>
  );
}
