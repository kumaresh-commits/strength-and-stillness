import React from 'react';
import { useStore } from '../store/useStore';
import { themes } from '../lib/themes';
import { sound } from '../lib/sound';
import { Utensils, Dumbbell, Sparkles, BarChart3, Settings } from 'lucide-react';

export const BottomNav: React.FC = () => {
  const { theme, activeTab, setActiveTab } = useStore();
  const t = themes[theme];

  const navItems = [
    { label: 'Diet', icon: Utensils },
    { label: 'Gym', icon: Dumbbell },
    { label: 'Recovery', icon: Sparkles },
    { label: 'Progress', icon: BarChart3 },
    { label: 'Settings', icon: Settings },
  ];

  const handleTabClick = (idx: number) => {
    sound.triggerHaptic('light');
    setActiveTab(idx);
  };

  return (
    <nav className="fixed bottom-0 left-0 right-0 z-30 glass-nav-dock transition-colors duration-300">
      <div className="max-w-md mx-auto flex items-center justify-around px-2 py-2 pb-[max(0.5rem,env(safe-area-inset-bottom))]">
        {navItems.map((item, idx) => {
          const isActive = activeTab === idx;
          const Icon = item.icon;

          return (
            <button
              key={idx}
              onClick={() => handleTabClick(idx)}
              className="flex-1 py-1.5 px-1 rounded-2xl flex flex-col items-center gap-1 transition-all active:scale-90 cursor-pointer relative"
              style={{
                color: isActive ? t.primary : theme === 'cyber' ? '#94A3B8' : '#64748B',
              }}
            >
              <div
                className={`p-1.5 rounded-xl transition-all ${
                  isActive ? 'scale-105 shadow-xs glass-btn-primary text-white' : 'opacity-75'
                }`}
              >
                <Icon size={18} strokeWidth={isActive ? 2.5 : 2} />
              </div>
              <span
                className={`text-[10px] tracking-tight ${
                  isActive ? 'font-black text-[#1B4332]' : 'font-semibold text-slate-500'
                }`}
              >
                {item.label}
              </span>

              {/* Active dot */}
              {isActive && (
                <span
                  className="w-1.5 h-1.5 rounded-full absolute bottom-0 bg-[#D4AF37] shadow-xs"
                />
              )}
            </button>
          );
        })}
      </div>
    </nav>
  );
};

export default BottomNav;
