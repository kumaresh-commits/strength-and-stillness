import { useEffect } from 'react';
import { Toaster } from 'sonner';
import { useStore } from './store/useStore';
import { themes } from './lib/themes';
import { useReminderScheduler } from './hooks/useReminderScheduler';

// Tab components will be created by other workers
import DietTab from './components/DietTab';
import WorkoutTab from './components/WorkoutTab';
import RecoveryTab from './components/RecoveryTab';
import ProgressTab from './components/ProgressTab';
import SettingsTab from './components/SettingsTab';
import BottomNav from './components/BottomNav';
import HeroCard from './components/HeroCard';

function App() {
  const { theme, activeTab } = useStore();
  const t = themes[theme];

  // Active background reminder scheduler for meals, workout, and hydration
  useReminderScheduler();

  // Sync theme attribute to HTML document root for dynamic high-contrast styles
  useEffect(() => {
    document.documentElement.setAttribute('data-theme', theme);
    if (theme === 'cyber') {
      document.documentElement.classList.add('dark');
    } else {
      document.documentElement.classList.remove('dark');
    }
  }, [theme]);

  // Detect if launched as a mobile home screen bookmark / standalone PWA
  const isStandalone =
    typeof window !== 'undefined' &&
    (window.matchMedia('(display-mode: standalone)').matches ||
      Boolean((window.navigator as unknown as { standalone?: boolean }).standalone));

  const tabs = [
    <DietTab key="diet" />,
    <WorkoutTab key="workout" />,
    <RecoveryTab key="recovery" />,
    <ProgressTab key="progress" />,
    <SettingsTab key="settings" />,
  ];

  return (
    <div
      className="min-h-screen transition-colors duration-300 relative overflow-x-hidden"
      style={{ backgroundColor: t.bg, color: t.text }}
    >
      {/* Dynamic Specular Glass Light Reflections */}
      <div
        className="fixed top-[-10%] left-[-15%] w-[420px] h-[420px] rounded-full blur-[100px] opacity-30 pointer-events-none"
        style={{
          background: 'radial-gradient(circle, #2D6A4F 0%, rgba(45,106,79,0) 70%)',
        }}
      />
      <div
        className="fixed top-[35%] right-[-15%] w-[380px] h-[380px] rounded-full blur-[120px] opacity-25 pointer-events-none"
        style={{
          background: 'radial-gradient(circle, #D4AF37 0%, rgba(212,175,55,0) 70%)',
        }}
      />
      <div
        className="fixed bottom-[10%] left-[5%] w-[350px] h-[350px] rounded-full blur-[110px] opacity-25 pointer-events-none"
        style={{
          background: 'radial-gradient(circle, #52B788 0%, rgba(82,183,136,0) 70%)',
        }}
      />

      <Toaster richColors position="top-center" />
      {/* Mobile-first main container with calibrated margins and standalone safe-area clearance */}
      <main
        className={`w-full max-w-md mx-auto px-3.5 sm:px-4 app-safe-top ${
          isStandalone ? 'standalone-home-screen' : ''
        } pb-28 sm:pb-32 relative z-10 box-border`}
      >
        <HeroCard />
        {tabs[activeTab]}
      </main>
      <BottomNav />
    </div>
  );
}

export default App;
