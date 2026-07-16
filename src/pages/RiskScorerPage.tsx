import { motion } from 'motion/react';
import { RefreshCw } from 'lucide-react';
import { ActivityChart } from '../components/ActivityChart';
import { RiskDonut } from '../components/RiskDonut';
import { StatsRow } from '../components/StatsRow';
import { Interactions } from '../components/Interactions';
import { SignalSidebar } from '../components/SignalSidebar';

import { useWalletData } from '../hooks/useWalletData';

interface RiskScorerPageProps {
  wallet: string;
  chain?: string;
}

export function RiskScorerPage({ wallet, chain = 'eth' }: RiskScorerPageProps) {
  const { profile, details, loading, refreshing, refreshData, addressToSearch } = useWalletData(wallet, chain);

  return (
    <main className="flex-1 w-full max-w-[1600px] mx-auto grid grid-cols-1 xl:grid-cols-[1fr_360px] gap-8 p-6 lg:p-8 mt-2 pb-12 transition-colors">
      {/* Left Column */}
      <div className="flex flex-col gap-8 min-w-0">
        
        {/* Header Area */}
        <motion.div 
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.4 }}
          className="flex flex-col md:flex-row justify-between items-start md:items-end gap-4"
        >
          <div className="flex items-center gap-4">
            {profile?.avatarUrl && (
              <img 
                src={profile.avatarUrl} 
                alt="Avatar" 
                className="w-16 h-16 rounded-full border-2 border-gray-200 dark:border-gray-700 shadow-sm object-cover bg-white dark:bg-gray-800" 
              />
            )}
            <div>
              <h1 className="text-3xl md:text-[32px] font-bold text-gray-900 dark:text-gray-100 tracking-tight leading-tight transition-colors">
                {profile?.displayName || 'Wallet Risk Analyzer'}
              </h1>
              <p className="text-gray-500 dark:text-gray-400 text-sm mt-1.5 flex items-center gap-2 transition-colors">
                Analyzing wallet: 
                <span className="font-mono text-gray-900 dark:text-gray-100 font-medium bg-gray-100 dark:bg-gray-800 px-2 py-0.5 rounded text-xs transition-colors">
                  {profile?.address || addressToSearch}
                </span>
                {loading && <span className="text-gray-400 dark:text-gray-500 animate-pulse text-xs">(resolving ENS...)</span>}
                {profile?.resolved && <span className="bg-blue-50 text-blue-600 dark:bg-blue-900/30 dark:text-blue-400 px-1.5 py-0.5 rounded text-[10px] uppercase font-bold tracking-wider ml-1">Verified ENS</span>}
              </p>
            </div>
          </div>
          
          <div className="flex items-center gap-3 self-start md:self-auto">
            <div className="bg-white dark:bg-gray-800 text-gray-500 dark:text-gray-400 px-4 py-2 rounded-full text-xs font-medium border border-gray-200 dark:border-gray-700 shadow-sm transition-colors">
              {loading || refreshing ? 'Scanning...' : `Last Scanned : ${new Date().toLocaleDateString('en-GB').replace(/\//g, '-')} : ${new Date().toLocaleTimeString('en-GB', { hour: '2-digit', minute: '2-digit' })}`}
            </div>
            
            <button
              onClick={refreshData}
              disabled={loading || refreshing}
              className="flex items-center justify-center gap-2 bg-white dark:bg-gray-800 hover:bg-gray-50 dark:hover:bg-gray-700 text-gray-700 dark:text-gray-300 px-3 py-1.5 rounded-full border border-gray-200 dark:border-gray-700 shadow-sm transition-all disabled:opacity-50 disabled:cursor-not-allowed group text-xs font-medium"
              title="Bypass cache and fetch latest data from the blockchain"
            >
              <RefreshCw className={`w-3.5 h-3.5 ${(loading || refreshing) ? 'animate-spin text-blue-500' : 'group-hover:text-blue-500 transition-colors'}`} />
              <span>Refresh Data</span>
            </button>
          </div>
        </motion.div>
        
        {/* Charts Row */}
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
          <div className="lg:col-span-2">
            <ActivityChart wallet={profile?.address || addressToSearch} />
          </div>
          <div>
            <RiskDonut score={details?.stats?.riskScore} level={details?.stats?.riskLevel} />
          </div>
        </div>
        
        {/* Stats Row */}
        <StatsRow stats={details?.stats} />
        
        {/* Interactions */}
        <Interactions interactions={details?.recentInteractions} chain={chain} />
        
      </div>
      
      {/* Right Column: Sidebar */}
      <div>
        <SignalSidebar address={addressToSearch} chain={chain} profile={profile} loading={loading} signals={details?.signalFlags} />
      </div>
    </main>
  );
}
