import React from 'react';

interface ProgressRingProps {
  progress: number; // 0 to 1
  size?: number;
  strokeWidth?: number;
  color: string;
  bgColor?: string;
  label?: string;
  sublabel?: string;
  icon?: React.ReactNode;
  onClick?: () => void;
  title?: string;
}

export const ProgressRing: React.FC<ProgressRingProps> = ({
  progress,
  size = 72,
  strokeWidth = 7,
  color,
  bgColor = 'rgba(0,0,0,0.06)',
  label,
  sublabel,
  icon,
  onClick,
  title,
}) => {
  const clampedProgress = Math.min(Math.max(progress, 0), 1);
  const radius = (size - strokeWidth) / 2;
  const circumference = 2 * Math.PI * radius;
  const strokeDashoffset = circumference - clampedProgress * circumference;

  return (
    <div
      onClick={onClick}
      role={onClick ? 'button' : undefined}
      tabIndex={onClick ? 0 : undefined}
      title={title}
      className={`flex flex-col items-center select-none ${
        onClick
          ? 'cursor-pointer active:scale-95 transition-all hover:opacity-90 group'
          : ''
      }`}
    >
      <div
        className="relative flex items-center justify-center transition-transform group-hover:scale-105"
        style={{ width: size, height: size }}
      >
        <svg width={size} height={size} className="transform -rotate-90">
          <circle
            cx={size / 2}
            cy={size / 2}
            r={radius}
            stroke={bgColor}
            strokeWidth={strokeWidth}
            fill="transparent"
          />
          <circle
            cx={size / 2}
            cy={size / 2}
            r={radius}
            stroke={color}
            strokeWidth={strokeWidth}
            strokeDasharray={circumference}
            strokeDashoffset={strokeDashoffset}
            strokeLinecap="round"
            fill="transparent"
            className="transition-all duration-700 ease-out"
          />
        </svg>
        <div className="absolute inset-0 flex flex-col items-center justify-center text-center">
          {icon ? (
            <div className="text-xs transition-transform group-hover:scale-110">{icon}</div>
          ) : (
            <span className="text-xs font-bold leading-none">{Math.round(clampedProgress * 100)}%</span>
          )}
        </div>
      </div>
      {label && (
        <span className="mt-1 text-[11px] font-bold text-slate-800 flex items-center gap-0.5">
          <span>{label}</span>
          {onClick && <span className="text-[8px] text-slate-400 font-semibold group-hover:text-[#1B4332]">›</span>}
        </span>
      )}
      {sublabel && <span className="text-[10px] text-slate-500 font-medium">{sublabel}</span>}
    </div>
  );
};

export default ProgressRing;
