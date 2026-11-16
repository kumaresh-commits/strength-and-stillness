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
    <nav
      className="fixed bottom-0 left-0 right-0 z-30 border-t backdrop-blur-xl transition-colors duration-300"
      style={{
        backgroundColor:
          theme === 'cyber' ? 'rgba(15, 23, 42, 0.92)' : 'rgba(255, 255, 255, 0.92)',
        borderColor:
          theme === 'cyber' ? 'rgba(255, 255, 255, 0.08)' : 'rgba(0, 0, 0, 0.06)',
      }}
    >
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
                color: isActive ? t.primary : theme === 'cyber' ? '#94A3B8' : '#6B7280',
              }}
            >
              <div
                className={`p-1 rounded-xl transition-all ${
                  isActive ? 'scale-110 shadow-xs' : 'opacity-70'
                }`}
                style={{
                  backgroundColor: isActive
                    ? 'rgba(27, 67, 50, 0.12)'
                    : 'transparent',
                }}
              >
                <Icon size={20} strokeWidth={isActive ? 2.5 : 2} />
              </div>
              <span
                className={`text-[10px] tracking-tight ${
                  isActive ? 'font-black' : 'font-semibold'
                }`}
              >
                {item.label}
              </span>

              {/* Active dot */}
              {isActive && (
                <span
                  className="w-1 h-1 rounded-full absolute bottom-0"
                  style={{ backgroundColor: t.primary }}
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
