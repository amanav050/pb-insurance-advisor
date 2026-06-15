import { ArrowLeft } from 'lucide-react';
import { APP_CONFIG } from '../utils/constants';

export default function Header({ onBack, showBack = false }) {
  return (
    <header
      className="sticky top-0 z-20 w-full flex items-center px-4 md:px-6"
      style={{
        background: 'linear-gradient(135deg, #2B3A8C 0%, #1A237E 100%)',
        height: '56px',
        boxShadow: '0 2px 12px rgba(26,35,126,0.3)',
      }}
    >
      {showBack && (
        <button
          onClick={onBack}
          className="mr-3 flex items-center justify-center rounded-xl text-white/80 hover:text-white hover:bg-white/10 transition-all duration-150 cursor-pointer focus:outline-none focus:ring-2 focus:ring-white focus:ring-offset-2 focus:ring-offset-[#2B3A8C]"
          style={{ width: '36px', height: '36px' }}
          aria-label="Go back to home"
        >
          <ArrowLeft size={20} aria-hidden="true" strokeWidth={2} />
        </button>
      )}

      <div className="flex items-center gap-2.5">
        {/* Logo mark */}
        <div className="w-7 h-7 rounded-lg flex items-center justify-center" style={{ backgroundColor: 'rgba(255,255,255,0.15)' }}>
          <span className="text-white font-bold text-sm">P</span>
        </div>
        <span className="text-white font-bold text-base md:text-lg tracking-tight">
          {APP_CONFIG.appName}
        </span>
        <span
          className="text-[10px] font-bold px-2 py-0.5 rounded-full tracking-wider"
          style={{
            background: 'linear-gradient(135deg, #F56B2A, #E55A1B)',
            color: 'var(--pb-white)',
            letterSpacing: '0.04em',
          }}
        >
          AI
        </span>
      </div>
    </header>
  );
}
