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

  const tabs = [
    <DietTab key="diet" />,
    <WorkoutTab key="workout" />,
    <RecoveryTab key="recovery" />,
    <ProgressTab key="progress" />,
    <SettingsTab key="settings" />,
  ];

  return (
    <div
      className="min-h-screen pb-24 transition-colors duration-300 relative overflow-x-hidden"
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
      <div className="max-w-lg mx-auto px-4 pt-safe relative z-10">
        <HeroCard />
        {tabs[activeTab]}
      </div>
      <BottomNav />
    </div>
  );
}

export default App;
