import { Search, Hexagon, CircleDashed, Library, ArrowUpRight } from 'lucide-react';
import { motion } from 'motion/react';
import { LandingNav } from '../components/LandingNav';

interface LandingPageProps {
  onAnalyze: (address: string) => void;
  onDocs?: () => void;
}

export function LandingPage({ onAnalyze, onDocs }: LandingPageProps) {
  return (
    <div className="min-h-screen bg-[#FDFDFE] dark:bg-black flex flex-col font-sans selection:bg-auralis-green/30 dark:selection:bg-gray-800 transition-colors">
      <LandingNav onDocs={onDocs} />

      {/* Hero Section */}
      <main className="flex-1 flex flex-col items-center pt-24 pb-16 px-4">
        {/* Badge */}
        <motion.div 
          initial={{ opacity: 0, y: -10 }}
          animate={{ opacity: 1, y: 0 }}
          className="flex items-center gap-2 bg-green-50 dark:bg-green-900/30 text-green-700 dark:text-green-400 px-3 py-1 rounded-full text-xs font-semibold tracking-wide border border-green-100 dark:border-green-800/50 mb-8 transition-colors"
        >
          <span className="w-1.5 h-1.5 bg-green-500 rounded-full animate-pulse"></span>
          REAL-TIME ANALYSIS ACTIVE
        </motion.div>

        {/* Headlines */}
        <motion.div 
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.1 }}
          className="text-center max-w-3xl mb-12"
        >
          <h1 className="text-5xl md:text-6xl font-extrabold text-gray-900 dark:text-white tracking-tight mb-6 transition-colors">
            Navigate Web3 with Confidence
          </h1>
          <p className="text-lg md:text-xl text-gray-500 dark:text-gray-400 max-w-2xl mx-auto font-medium transition-colors">
            Institutional-grade risk scoring and on-chain forensics for any Ethereum wallet. Clear the fog of decentralized finance.
          </p>
        </motion.div>

        {/* Search Bar */}
        <motion.div 
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.2 }}
          className="w-full max-w-2xl mb-4 relative"
        >
          <div className="flex items-center bg-white dark:bg-gray-900 border border-gray-200 dark:border-gray-800 rounded-full p-1.5 shadow-sm dark:shadow-none hover:shadow-md dark:hover:border-gray-700 transition-all">
            <div className="pl-4 pr-2 text-gray-400 dark:text-gray-500">
              <Search className="w-5 h-5" />
            </div>
            <input 
              type="text" 
              placeholder="Paste wallet address to check your wallet risk score..." 
              className="flex-1 bg-transparent py-3 px-2 outline-none text-gray-800 dark:text-gray-100 placeholder-gray-400 dark:placeholder-gray-500 text-base"
              onKeyDown={(e) => {
                if (e.key === 'Enter') {
                  onAnalyze((e.target as HTMLInputElement).value || 'vitalik.eth');
                }
              }}
            />
            <button 
              onClick={() => onAnalyze('vitalik.eth')}
              className="bg-gray-900 dark:bg-white hover:bg-gray-800 dark:hover:bg-gray-100 text-white dark:text-gray-900 px-6 py-3 rounded-full font-medium transition-colors"
            >
              Analyze Wallet
            </button>
          </div>
        </motion.div>

        {/* Search Helper */}
        <motion.p 
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.3 }}
          className="text-sm text-gray-500 dark:text-gray-400 transition-colors"
        >
          Try: <span className="font-mono text-gray-900 dark:text-gray-200 font-medium cursor-pointer hover:underline" onClick={() => onAnalyze('vitalik.eth')}>vitalik.eth</span> or <span className="font-mono text-gray-900 dark:text-gray-200 font-medium cursor-pointer hover:underline" onClick={() => onAnalyze('0xd8dA6BF...C7D')}>0xd8dA6BF...C7D</span>
        </motion.p>
      </main>

      {/* Integrations Banner */}
      <div className="border-t border-gray-200 dark:border-gray-800 bg-[#FAFAFA] dark:bg-gray-900 py-12 px-6 transition-colors">
        <div className="max-w-[1600px] mx-auto">
          <p className="text-center text-xs font-bold text-gray-400 dark:text-gray-500 tracking-widest uppercase mb-8 transition-colors">
            Supported Ecosystems & Protocols
          </p>
          <div className="flex flex-wrap justify-center items-center gap-12 md:gap-24 opacity-60 dark:opacity-40 grayscale hover:grayscale-0 dark:hover:opacity-100 transition-all duration-500">
            <div className="flex items-center gap-2 font-bold text-xl text-gray-700 dark:text-gray-300">
              <Hexagon className="w-6 h-6" /> ETHEREUM
            </div>
            <div className="flex items-center gap-2 font-bold text-xl text-gray-700 dark:text-gray-300">
              <CircleDashed className="w-6 h-6" /> UNISWAP
            </div>
            <div className="flex items-center gap-2 font-bold text-xl text-gray-700 dark:text-gray-300">
              <Library className="w-6 h-6" /> AAVE
            </div>
            <div className="flex items-center gap-2 font-bold text-xl text-gray-700 dark:text-gray-300">
              <Hexagon className="w-6 h-6" /> POLYGON
            </div>
          </div>
        </div>
      </div>

      {/* Features Section */}
      <div className="flex-1 bg-[#F4F5F7] dark:bg-[#111827] border-t border-gray-200 dark:border-gray-800 py-16 px-6 relative overflow-hidden transition-colors">
        <div className="max-w-[1600px] mx-auto grid grid-cols-1 md:grid-cols-3 gap-8 relative z-10">
          
          {/* Feature Card 1 */}
          <div className="bg-white dark:bg-gray-800 rounded-2xl p-8 shadow-sm border border-gray-100 dark:border-gray-700 flex flex-col h-full transition-colors">
            <div className="w-10 h-10 rounded-lg bg-blue-50 dark:bg-blue-900/30 text-blue-600 dark:text-blue-400 flex items-center justify-center mb-6">
               <ArrowUpRight className="w-5 h-5" />
            </div>
            <h3 className="text-xl font-bold text-gray-900 dark:text-white mb-3 transition-colors">Real-time Risk Scoring</h3>
            <p className="text-gray-500 dark:text-gray-400 leading-relaxed mb-8 flex-1 transition-colors">
              Instant 0-100 score generation based on historical behavior, liquidity profiles, and interaction patterns. Segmented donut visuals provide immediate clarity on risk vectors.
            </p>
            
            <div className="flex justify-center items-center mt-auto py-4">
              <div className="relative w-24 h-24">
                <svg className="w-full h-full transform -rotate-90" viewBox="0 0 100 100">
                  <circle cx="50" cy="50" r="40" fill="transparent" stroke="currentColor" className="text-gray-200 dark:text-gray-700" strokeWidth="12" />
                  <circle cx="50" cy="50" r="40" fill="transparent" stroke="currentColor" className="text-indigo-100 dark:text-indigo-500" strokeWidth="12" strokeDasharray="251.2" strokeDashoffset="60" />
                </svg>
              </div>
            </div>
          </div>

        </div>
      </div>
    </div>
  );
}
