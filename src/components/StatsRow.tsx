import { motion } from 'motion/react';
import { ShieldCheck, Wallet } from 'lucide-react';
import { WalletDetails } from '../hooks/useWalletData';

interface StatsRowProps {
  stats?: WalletDetails['stats'];
}

export function StatsRow({ stats }: StatsRowProps) {
  const container = {
    hidden: { opacity: 0 },
    show: {
      opacity: 1,
      transition: { staggerChildren: 0.1, delayChildren: 0.3 }
    }
  };

  const item = {
    hidden: { opacity: 0, y: 20 },
    show: { opacity: 1, y: 0, transition: { type: "spring", stiffness: 300, damping: 24 } }
  };

  const displayStats = stats || {
    walletAge: '--',
    totalTxs: '--',
    contractsHit: 0,
    fundSource: '--',
    tokenSpread: '--'
  };

  return (
    <motion.div 
      variants={container}
      initial="hidden"
      animate="show"
      className="grid grid-cols-2 md:grid-cols-6 gap-6"
    >
      {/* Stat 1: Radial */}
      <motion.div variants={item} className="bg-white border border-gray-200 rounded-[1.25rem] p-4 shadow-sm flex flex-col items-center justify-center hover:shadow-md transition-all group">
        <div className="relative w-12 h-12 mb-3">
          <svg className="w-full h-full -rotate-90 group-hover:scale-110 transition-transform" viewBox="0 0 36 36">
            <circle className="stroke-gray-100" cx="18" cy="18" fill="none" r="16" strokeWidth="4"></circle>
            <circle className="stroke-auralis-green" cx="18" cy="18" fill="none" r="16" strokeDasharray="75, 100" strokeWidth="4"></circle>
          </svg>
          <div className="absolute inset-0 flex items-center justify-center text-[11px] font-bold text-auralis-dark">{displayStats.walletAge}</div>
        </div>
        <div className="text-xs font-medium text-auralis-text-muted">Wallet Age</div>
      </motion.div>

      {/* Stat 2 */}
      <motion.div variants={item} className="bg-white border border-gray-200 rounded-[1.25rem] p-4 shadow-sm flex flex-col justify-between hover:shadow-md transition-all group relative">
        <div className="absolute top-4 right-4 text-[10px] font-bold text-auralis-green bg-auralis-green-light px-1.5 py-0.5 rounded-full">+12%</div>
        <div className="text-xs font-medium text-auralis-text-muted mb-2">Total Txns</div>
        <div className="text-2xl font-bold text-auralis-dark group-hover:text-auralis-green transition-colors mt-auto">{displayStats.totalTxs}</div>
      </motion.div>

      {/* Stat 3: Sparkline */}
      <motion.div variants={item} className="bg-white border border-gray-200 rounded-[1.25rem] p-4 shadow-sm flex flex-col justify-between hover:shadow-md transition-all">
        <div className="text-xs font-medium text-auralis-text-muted mb-2">Contracts Hit</div>
        <div className="flex items-end justify-between">
          <div className="text-2xl font-bold text-auralis-dark">{displayStats.contractsHit}</div>
          <svg className="w-14 h-6 text-auralis-green" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 48 24">
            <motion.path 
              initial={{ pathLength: 0 }}
              animate={{ pathLength: 1 }}
              transition={{ duration: 1, delay: 0.5 }}
              d="M0 20 L8 15 L16 18 L24 10 L32 14 L40 5 L48 8" 
              strokeLinecap="round" 
              strokeLinejoin="round"
            />
          </svg>
        </div>
      </motion.div>

      {/* Stat 4: Highlight */}
      <motion.div variants={item} className={`border rounded-[1.25rem] p-4 shadow-sm flex flex-col items-center justify-center transition-all cursor-pointer ${displayStats.riskContacts === 0 ? 'bg-auralis-green-light border-auralis-green/20 hover:bg-green-100' : 'bg-red-50 border-red-200 hover:bg-red-100'}`}>
        <ShieldCheck className={`w-6 h-6 mb-2 ${displayStats.riskContacts === 0 ? 'text-auralis-green' : 'text-red-500'}`} />
        <div className={`text-[11px] font-bold uppercase tracking-wider text-center ${displayStats.riskContacts === 0 ? 'text-auralis-green' : 'text-red-500'}`}>{displayStats.riskContacts} Risk<br/>Contacts</div>
        <div className={`text-[10px] mt-1 ${displayStats.riskContacts === 0 ? 'text-auralis-green/70' : 'text-red-500/70'}`}>{displayStats.riskContacts === 0 ? 'Safe Profile' : 'High Risk'}</div>
      </motion.div>

      {/* Stat 5 */}
      <motion.div variants={item} className="bg-white border border-gray-200 rounded-[1.25rem] p-4 shadow-sm flex flex-col justify-center hover:shadow-md transition-all">
        <div className="flex items-center gap-2 mb-2">
          <Wallet className="w-4 h-4 text-auralis-text-muted" />
          <div className="text-xs font-medium text-auralis-text-muted">Fund Source</div>
        </div>
        <div className="text-sm font-bold text-auralis-dark truncate">{displayStats.fundSource}</div>
      </motion.div>

      {/* Stat 6 */}
      <motion.div variants={item} className="bg-white border border-gray-200 rounded-[1.25rem] p-4 shadow-sm flex flex-col justify-center hover:shadow-md transition-all">
        <div className="text-xs font-medium text-auralis-text-muted mb-2">Token Spread</div>
        <div className="flex flex-wrap gap-1">
          <span className="bg-gray-100 text-auralis-dark text-[10px] px-2 py-1 rounded-full font-bold">Diverse</span>
          <span className="bg-auralis-dark text-white text-[10px] px-2 py-1 rounded-full font-bold">{displayStats.tokenSpread}</span>
        </div>
      </motion.div>

    </motion.div>
  );
}
