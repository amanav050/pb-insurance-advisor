import { APP_CONFIG } from '../utils/constants';

export default function DisclaimerFooter() {
  return (
    <footer
      className="w-full mt-auto px-4 md:px-6 py-4 text-center"
      style={{
        backgroundColor: 'var(--pb-gray-bg)',
        borderTop: '1px solid var(--pb-gray-border)',
      }}
    >
      <p 
        className="max-w-2xl mx-auto leading-relaxed"
        style={{ 
          color: 'var(--pb-gray-text)', 
          fontSize: '12px',
        }}
      >
        {APP_CONFIG.disclaimer}
      </p>
    </footer>
  );
}
