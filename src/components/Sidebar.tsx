import { Shield, Activity, Eye, Microscope, FileText, Settings } from 'lucide-react';

export type DashboardTab = 'Risk Scorer' | 'Wallet Hunter' | 'Investigations' | 'Reports' | 'Settings';

interface SidebarProps {
  onHome: () => void;
  activeTab: DashboardTab;
  onChangeTab: (tab: DashboardTab) => void;
  onDocs?: () => void;
}

export function Sidebar({ onHome, activeTab, onChangeTab, onDocs }: SidebarProps) {
  const navItems = [
    { name: 'Risk Scorer', icon: Shield },
    { name: 'Wallet Hunter', icon: Eye },
    { name: 'Investigations', icon: Microscope },
    { name: 'Reports', icon: FileText },
  ];

  return (
    <aside className="w-16 h-screen bg-white dark:bg-[#0a0a0a] border-r border-gray-200 dark:border-gray-800/50 flex flex-col items-center py-4 sticky top-0 z-50 transition-colors">
      {/* Logo */}
      <button 
        onClick={onHome} 
        className="w-10 h-10 flex items-center justify-center rounded-xl bg-gray-900 dark:bg-white text-white dark:text-black mb-8 hover:bg-gray-800 dark:hover:bg-gray-200 transition-colors shadow-sm"
        title="Home"
      >
        <Shield className="w-6 h-6" />
      </button>

      {/* Nav Items */}
      <nav className="flex flex-col gap-4 flex-1 w-full items-center">
        {navItems.map((item) => {
          const isActive = activeTab === item.name;
          return (
            <button
              key={item.name}
              title={item.name}
              onClick={() => onChangeTab(item.name as DashboardTab)}
              className={`w-10 h-10 flex items-center justify-center rounded-xl transition-colors relative group ${
                isActive 
                  ? 'bg-gray-100 dark:bg-gray-800 text-gray-900 dark:text-gray-100' 
                  : 'text-gray-500 dark:text-gray-400 hover:bg-gray-50 dark:hover:bg-gray-800 hover:text-gray-900 dark:hover:text-gray-100'
              }`}
            >
              <item.icon className="w-5 h-5" />
              
              {/* Tooltip */}
              <span className="absolute left-14 bg-gray-900 dark:bg-gray-700 text-white text-xs font-medium px-2 py-1 rounded opacity-0 group-hover:opacity-100 pointer-events-none transition-opacity whitespace-nowrap z-50 shadow-md">
                {item.name}
              </span>
            </button>
          );
        })}
      </nav>

      {/* Bottom Items */}
      <div className="flex flex-col gap-4 w-full items-center mt-auto">
        <button
          title="API Docs"
          onClick={onDocs}
          className="w-10 h-10 flex items-center justify-center rounded-xl transition-colors relative group text-gray-500 dark:text-gray-400 hover:bg-gray-50 dark:hover:bg-gray-800 hover:text-gray-900 dark:hover:text-gray-100"
        >
          <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
            <path strokeLinecap="round" strokeLinejoin="round" d="M8 9l3 3-3 3m5 0h3M5 20h14a2 2 0 002-2V6a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z" />
          </svg>
          <span className="absolute left-14 bg-gray-900 dark:bg-gray-700 text-white text-xs font-medium px-2 py-1 rounded opacity-0 group-hover:opacity-100 pointer-events-none transition-opacity whitespace-nowrap z-50 shadow-md">
            API Docs
          </span>
        </button>

        <button
          title="Settings"
          onClick={() => onChangeTab('Settings')}
          className={`w-10 h-10 flex items-center justify-center rounded-xl transition-colors relative group ${
            activeTab === 'Settings'
              ? 'bg-gray-100 dark:bg-gray-800 text-gray-900 dark:text-gray-100' 
              : 'text-gray-500 dark:text-gray-400 hover:bg-gray-50 dark:hover:bg-gray-800 hover:text-gray-900 dark:hover:text-gray-100'
          }`}
        >
          <Settings className="w-5 h-5" />
          <span className="absolute left-14 bg-gray-900 dark:bg-gray-700 text-white text-xs font-medium px-2 py-1 rounded opacity-0 group-hover:opacity-100 pointer-events-none transition-opacity whitespace-nowrap z-50 shadow-md">
            Settings
          </span>
        </button>
      </div>
    </aside>
  );
}
