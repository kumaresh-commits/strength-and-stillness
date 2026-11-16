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
      className="min-h-screen pb-24 transition-colors duration-300"
      style={{ backgroundColor: t.bg, color: t.text }}
    >
      <Toaster richColors position="top-center" />
      <div className="max-w-lg mx-auto px-4 pt-safe">
        <HeroCard />
        {tabs[activeTab]}
      </div>
      <BottomNav />
    </div>
  );
}

export default App;
