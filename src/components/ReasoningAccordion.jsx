import { useState } from 'react';
import { ChevronDown, AlertTriangle, ArrowRight } from 'lucide-react';

export default function ReasoningAccordion({ warnings, nextStep, rawText }) {
  const [isOpen, setIsOpen] = useState(false);

  return (
    <div className="space-y-4">
      {/* Warnings */}
      {warnings.length > 0 && (
        <section
          className="rounded-xl p-4"
          style={{ backgroundColor: '#FFF8E1', border: '1px solid #FFE082' }}
          aria-label="Things to watch out for"
        >
          <div className="flex items-center gap-2 mb-2">
            <AlertTriangle size={18} style={{ color: '#F57F17' }} aria-hidden="true" strokeWidth={2} />
            <h3 className="font-semibold text-sm" style={{ color: '#E65100' }}>What to Watch Out For</h3>
          </div>
          <ul className="space-y-2">
            {warnings.map((warning, i) => (
              <li key={i} className="text-sm leading-relaxed pl-6" style={{ color: '#4E342E' }}>
                • {warning}
              </li>
            ))}
          </ul>
        </section>
      )}

      {/* Next step */}
      {nextStep && (
        <section
          className="rounded-xl p-4"
          style={{ backgroundColor: 'var(--pb-green-light)', border: '1px solid #A5D6A7' }}
        >
          <div className="flex items-center gap-2">
            <ArrowRight size={18} style={{ color: '#2E7D32' }} aria-hidden="true" strokeWidth={2} />
            <div>
              <h3 className="font-semibold text-sm" style={{ color: '#1B5E20' }}>Recommended Next Step</h3>
              <p className="text-sm mt-1" style={{ color: '#2E7D32' }}>{nextStep}</p>
            </div>
          </div>
        </section>
      )}

      {/* Full reasoning accordion */}
      <div
        className="rounded-xl overflow-hidden"
        style={{ border: '1px solid var(--pb-gray-border)' }}
      >
        <button
          onClick={() => setIsOpen(!isOpen)}
          className="w-full flex items-center justify-between px-4 py-3 text-left cursor-pointer focus:outline-none focus:ring-2 focus:ring-inset"
          style={{
            backgroundColor: 'var(--pb-gray-bg)',
            '--tw-ring-color': 'var(--pb-blue-primary)',
          }}
          aria-expanded={isOpen}
          aria-controls="reasoning-content"
        >
          <span className="font-semibold text-sm" style={{ color: 'var(--pb-text-primary)' }}>
            How we calculated this
          </span>
          <ChevronDown
            size={18}
            className={`transition-transform duration-200 ${isOpen ? 'rotate-180' : ''}`}
            style={{ color: 'var(--pb-gray-text)' }}
            aria-hidden="true"
          />
        </button>
        
        {isOpen && (
          <div 
            id="reasoning-content"
            className="px-4 py-4 text-sm leading-relaxed whitespace-pre-line"
            style={{ color: 'var(--pb-text-dark)', backgroundColor: 'var(--pb-white)' }}
          >
            {rawText}
          </div>
        )}
      </div>
    </div>
  );
}
