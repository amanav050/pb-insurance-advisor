export default function ProgressBar({ current, total }) {
  const percentage = Math.min((current / total) * 100, 100);

  return (
    <div className="flex items-center gap-3 px-4 py-2" aria-label={`Question ${current} of ${total}`}>
      <div 
        className="flex-1 h-1.5 rounded-full overflow-hidden"
        style={{ backgroundColor: 'var(--pb-gray-border)' }}
        role="progressbar"
        aria-valuenow={current}
        aria-valuemin={0}
        aria-valuemax={total}
      >
        <div
          className="h-full rounded-full transition-all duration-500 ease-out"
          style={{ 
            width: `${percentage}%`,
            backgroundColor: 'var(--pb-green-success)',
          }}
        />
      </div>
      <span 
        className="text-xs font-medium whitespace-nowrap"
        style={{ color: 'var(--pb-gray-text)' }}
      >
        {current}/{total}
      </span>
    </div>
  );
}
