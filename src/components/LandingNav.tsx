import { Shield, Moon, Bell } from 'lucide-react';
import { useDarkMode } from '../hooks/useDarkMode';

interface LandingNavProps {
  onDocs?: () => void;
}

export function LandingNav({ onDocs }: LandingNavProps) {
  const { isDark, toggleDarkMode } = useDarkMode();

  return (
    <header className="bg-transparent w-full pt-6 pb-4 px-8 flex justify-between items-center max-w-[1600px] mx-auto transition-colors">
      {/* Logo */}
      <div className="flex items-center gap-2 font-bold text-xl text-gray-900 dark:text-white transition-colors">
        <Shield className="w-6 h-6" />
        WalletLens
      </div>

      {/* Nav Links */}
      <nav className="hidden md:flex gap-8 text-sm font-medium text-gray-500 dark:text-gray-400 transition-colors">
        <a href="#" className="text-gray-900 dark:text-white border-b-2 border-gray-900 dark:border-white pb-1 transition-colors">Analyze</a>
        <a href="#" className="hover:text-gray-900 dark:hover:text-white pb-1 transition-colors">How It Works</a>
        <button onClick={onDocs} className="hover:text-gray-900 dark:hover:text-white pb-1 transition-colors">API Docs</button>
      </nav>

      {/* Actions */}
      <div className="flex items-center gap-4">
        <button 
          onClick={toggleDarkMode}
          className="w-8 h-8 rounded-full flex items-center justify-center text-gray-500 dark:text-gray-400 hover:bg-gray-100 dark:hover:bg-gray-800 transition-colors"
        >
          <Moon className="w-5 h-5" />
        </button>
        <button className="relative w-8 h-8 rounded-full flex items-center justify-center text-gray-500 dark:text-gray-400 hover:bg-gray-100 dark:hover:bg-gray-800 transition-colors">
          <Bell className="w-5 h-5" />
          <span className="absolute top-1.5 right-1.5 w-2 h-2 bg-red-500 rounded-full border-2 border-white dark:border-gray-950"></span>
        </button>
        <button className="bg-gray-900 dark:bg-white hover:bg-gray-800 dark:hover:bg-gray-100 text-white dark:text-gray-900 px-5 py-2 rounded-full text-sm font-medium transition-colors">
          Connect
        </button>
      </div>
    </header>
  );
}
