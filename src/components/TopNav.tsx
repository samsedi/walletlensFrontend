import { Search, Moon, Sun, Bell, ChevronDown, Command } from 'lucide-react';
import { useDarkMode } from '../hooks/useDarkMode';
import { useState, useRef, useEffect } from 'react';

interface TopNavProps {
  onAnalyze?: (address: string) => void;
  selectedChain?: string;
  onNetworkChange?: (chain: string) => void;
}

const NETWORKS = [
  { id: 'eth', name: 'Ethereum Mainnet', color: '#627EEA', iconUrl: 'https://raw.githubusercontent.com/trustwallet/assets/master/blockchains/ethereum/info/logo.png' },
  { id: 'bsc', name: 'Binance Smart Chain', color: '#F3BA2F', iconUrl: 'https://raw.githubusercontent.com/trustwallet/assets/master/blockchains/binance/info/logo.png' },
  { id: 'polygon', name: 'Polygon', color: '#8247E5', iconUrl: 'https://raw.githubusercontent.com/trustwallet/assets/master/blockchains/polygon/info/logo.png' },
  { id: 'arbitrum', name: 'Arbitrum', color: '#28A0F0', iconUrl: 'https://raw.githubusercontent.com/trustwallet/assets/master/blockchains/arbitrum/info/logo.png' },
  { id: 'optimism', name: 'Optimism', color: '#FF0420', iconUrl: 'https://raw.githubusercontent.com/trustwallet/assets/master/blockchains/optimism/info/logo.png' },
  { id: 'base', name: 'Base', color: '#0052FF', iconUrl: 'https://raw.githubusercontent.com/trustwallet/assets/master/blockchains/base/info/logo.png' }
];

export function TopNav({ onAnalyze, selectedChain = 'eth', onNetworkChange }: TopNavProps) {
  const { isDark, toggleDarkMode } = useDarkMode();
  const [searchInput, setSearchInput] = useState('');
  const [isNetworkOpen, setIsNetworkOpen] = useState(false);
  const dropdownRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    function handleClickOutside(event: MouseEvent) {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target as Node)) {
        setIsNetworkOpen(false);
      }
    }
    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, [dropdownRef]);

  const handleSearch = (e: React.KeyboardEvent<HTMLInputElement>) => {
    if (e.key === 'Enter' && searchInput.trim() && onAnalyze) {
      onAnalyze(searchInput.trim());
    }
  };

  const currentNetwork = NETWORKS.find(n => n.id === selectedChain) || NETWORKS[0];

  return (
    <header className="bg-white/90 dark:bg-black/70 backdrop-blur-md border-b border-gray-200 dark:border-gray-800/50 shadow-sm w-full sticky top-0 z-40 h-16 transition-colors">
      <div className="flex items-center justify-between px-6 w-full mx-auto h-full gap-4">
        
        {/* Left Side: Network Selector */}
        <div className="flex-shrink-0 flex items-center relative" ref={dropdownRef}>
          <button 
            onClick={() => setIsNetworkOpen(!isNetworkOpen)}
            className="flex items-center gap-2 border border-gray-200 dark:border-gray-700 rounded-full px-3 py-1.5 text-sm font-medium text-gray-700 dark:text-gray-200 bg-white dark:bg-gray-800 shadow-sm hover:bg-gray-50 dark:hover:bg-gray-700 transition-colors"
          >
            <div className="flex items-center justify-center w-5 h-5 rounded-full relative overflow-hidden bg-gray-100 dark:bg-gray-700">
              <img src={currentNetwork.iconUrl} alt={currentNetwork.name} className="w-full h-full object-cover" />
              <div className="absolute -bottom-0.5 -right-0.5 w-2 h-2 bg-green-500 rounded-full border border-white dark:border-gray-800"></div>
            </div>
            {currentNetwork.name}
            <ChevronDown className={`w-4 h-4 text-gray-400 dark:text-gray-500 ml-1 transition-transform ${isNetworkOpen ? 'rotate-180' : ''}`} />
          </button>
          
          {isNetworkOpen && (
            <div className="absolute top-full mt-2 left-0 w-56 bg-white dark:bg-gray-800 border border-gray-200 dark:border-gray-700 rounded-xl shadow-lg z-50 overflow-hidden py-1">
              {NETWORKS.map((network) => (
                <button
                  key={network.id}
                  onClick={() => {
                    onNetworkChange?.(network.id);
                    setIsNetworkOpen(false);
                  }}
                  className={`w-full text-left px-4 py-2 text-sm flex items-center gap-3 transition-colors ${selectedChain === network.id ? 'bg-gray-50 dark:bg-gray-700/50 font-medium' : 'hover:bg-gray-50 dark:hover:bg-gray-700/50 text-gray-700 dark:text-gray-300'}`}
                >
                  <img src={network.iconUrl} alt={network.name} className="w-5 h-5 rounded-full object-cover" />
                  {network.name}
                </button>
              ))}
            </div>
          )}
        </div>

        {/* Center: Pronounced Search Bar */}
        <div className="flex-1 max-w-2xl px-4 hidden md:block">
          <div className="relative group w-full">
            <Search className="absolute inset-y-0 left-4 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-400 group-focus-within:text-blue-500 transition-colors" />
            <input
              className="w-full bg-gray-50 dark:bg-gray-800 border border-gray-200 dark:border-gray-700 rounded-full pl-11 pr-12 py-2 text-sm focus:outline-none focus:border-blue-500 focus:ring-1 focus:ring-blue-500 transition-all text-gray-800 dark:text-gray-100 placeholder-gray-500 dark:placeholder-gray-400 shadow-inner dark:shadow-none"
              placeholder="Paste wallet address to check your wallet risk score... (Press Enter to search)"
              type="text"
              value={searchInput}
              onChange={(e) => setSearchInput(e.target.value)}
              onKeyDown={handleSearch}
            />
            <div className="absolute inset-y-0 right-2 top-1/2 -translate-y-1/2 flex items-center">
              <div className="flex items-center gap-1 bg-white dark:bg-gray-700 border border-gray-200 dark:border-gray-600 rounded-full px-2 py-0.5 shadow-sm">
                <Command className="w-3 h-3 text-gray-400 dark:text-gray-300" />
                <span className="text-[10px] font-medium text-gray-500 dark:text-gray-300">K</span>
              </div>
            </div>
          </div>
        </div>

        {/* Right Side: Actions & Profile */}
        <div className="flex-shrink-0 flex items-center gap-3">
          <div className="flex items-center gap-1 border border-gray-200 dark:border-gray-700 rounded-full p-1 bg-gray-50 dark:bg-gray-800 hidden sm:flex">
            <button 
              onClick={toggleDarkMode}
              className={`w-7 h-7 rounded-full flex items-center justify-center transition-all ${!isDark ? 'text-gray-700 bg-white shadow-sm' : 'text-gray-400 hover:text-gray-200'}`}
            >
              <Sun className="w-4 h-4" />
            </button>
            <button 
              onClick={toggleDarkMode}
              className={`w-7 h-7 rounded-full flex items-center justify-center transition-all ${isDark ? 'text-gray-200 bg-gray-700 shadow-sm' : 'text-gray-400 hover:text-gray-700'}`}
            >
              <Moon className="w-4 h-4" />
            </button>
          </div>

          <button className="w-9 h-9 rounded-full flex items-center justify-center border border-gray-200 dark:border-gray-700 hover:bg-gray-50 dark:hover:bg-gray-800 transition-colors text-gray-500 dark:text-gray-400 relative">
            <Bell className="w-4 h-4" />
            <span className="absolute top-2 right-2 w-2 h-2 bg-red-500 rounded-full border border-white dark:border-gray-900"></span>
          </button>

          <div className="flex items-center gap-2 pl-3 py-1 pr-3 border border-transparent hover:border-gray-200 dark:hover:border-gray-700 rounded-full cursor-pointer group transition-all hover:bg-gray-50 dark:hover:bg-gray-800">
            <div className="w-8 h-8 rounded-full bg-green-900 flex items-center justify-center overflow-hidden ring-2 ring-white dark:ring-gray-900 shadow-sm group-hover:ring-gray-100 dark:group-hover:ring-gray-800 transition-all">
               <img src="https://api.dicebear.com/7.x/avataaars/svg?seed=Paul" alt="Avatar" className="w-full h-full object-cover" />
            </div>
            <div className="hidden lg:flex flex-col">
              <span className="text-sm font-medium text-gray-700 dark:text-gray-200 leading-tight">Paul Adams</span>
              <span className="text-xs text-gray-400 dark:text-gray-500 leading-tight">Admin</span>
            </div>
            <ChevronDown className="w-4 h-4 text-gray-400 dark:text-gray-500 hidden lg:block" />
          </div>
        </div>
        
      </div>
    </header>
  );
}
