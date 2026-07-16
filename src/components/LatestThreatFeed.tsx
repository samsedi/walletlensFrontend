import { useState, useEffect } from 'react';
import { ArrowUpRight } from 'lucide-react';
import { motion, AnimatePresence } from 'motion/react';

const MOCK_THREATS = [
  { id: 't1', hash: '0x098B...2f96', badge: 'OFAC · Lazarus Group', time: 'Just now', color: 'bg-red-50 text-red-700 border-red-100', dot: 'bg-red-500', ping: 'bg-red-400' },
  { id: 't2', hash: '0x71C3...9a12', badge: 'Tornado Cash · Mixer', time: '1 min ago', color: 'bg-orange-50 text-orange-700 border-orange-100', dot: 'bg-orange-500', ping: 'bg-orange-400' },
  { id: 't3', hash: '0x44F1...e33d', badge: 'Phishing · Drainer', time: '3 mins ago', color: 'bg-purple-50 text-purple-700 border-purple-100', dot: 'bg-purple-500', ping: 'bg-purple-400' },
  { id: 't4', hash: '0xaa10...00b4', badge: 'Exploit · PolyNetwork', time: '5 mins ago', color: 'bg-red-50 text-red-700 border-red-100', dot: 'bg-red-500', ping: 'bg-red-400' },
  { id: 't5', hash: '0x88eD...11c9', badge: 'Scam · Pig Butchering', time: '8 mins ago', color: 'bg-yellow-50 text-yellow-700 border-yellow-100', dot: 'bg-yellow-500', ping: 'bg-yellow-400' },
];

export function LatestThreatFeed() {
  const [currentThreat, setCurrentThreat] = useState(MOCK_THREATS[0]);
  const [index, setIndex] = useState(1);

  useEffect(() => {
    const interval = setInterval(() => {
      setIndex((i) => i + 1);
      setCurrentThreat(MOCK_THREATS[index % MOCK_THREATS.length]);
    }, 4500);

    return () => clearInterval(interval);
  }, [index]);

  return (
    <div className="relative w-full h-[120px] z-10 shrink-0">
      {/* Background Stack Effect (Illusion of depth) */}
      <div className="absolute top-[8px] left-2 right-2 h-[105px] bg-white border border-gray-200 rounded-xl z-0 shadow-sm opacity-60"></div>
      <div className="absolute top-[16px] left-4 right-4 h-[105px] bg-white border border-gray-200 rounded-xl -z-10 shadow-sm opacity-30"></div>

      {/* Main Card Container */}
      <div className="absolute top-0 left-0 w-full h-[105px] z-10">
        <AnimatePresence mode="popLayout">
          <motion.div
            key={currentThreat.id}
            initial={{ opacity: 0, y: -30, scale: 1.05 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: 16, scale: 0.95, zIndex: -1 }}
            transition={{ type: 'spring', stiffness: 300, damping: 25 }}
            className="h-[105px] w-full bg-white dark:bg-white rounded-xl border border-gray-200 p-3.5 shadow-sm flex flex-col justify-between absolute top-0 left-0"
          >
            {/* Top Header Row */}
            <div className="flex justify-between items-center">
              <span className="text-[10px] tracking-wider font-semibold text-gray-400 uppercase">
                LATEST THREAT DETECTED
              </span>
              <span className="text-[11px] font-mono text-emerald-600 font-medium">
                {currentThreat.time}
              </span>
            </div>

            {/* Middle Data Row */}
            <div className="flex items-center gap-3">
              <div className="relative flex h-2.5 w-2.5 items-center justify-center">
                <span className={`animate-ping absolute inline-flex h-full w-full rounded-full ${currentThreat.ping} opacity-75`}></span>
                <span className={`relative inline-flex rounded-full h-2 w-2 ${currentThreat.dot}`}></span>
              </div>
              <span className="text-[14px] font-mono font-bold text-gray-800 tracking-tight">
                {currentThreat.hash}
              </span>
            </div>

            {/* Bottom Metadata Row */}
            <div className="flex justify-between items-end">
              <div className={`${currentThreat.color} text-[10px] font-medium px-2 py-0.5 rounded border shadow-sm uppercase tracking-wide`}>
                {currentThreat.badge}
              </div>
              <button className="text-xs font-semibold text-emerald-600 hover:text-emerald-700 hover:underline cursor-pointer flex items-center gap-1 transition-colors">
                Investigate
                <ArrowUpRight className="w-3 h-3" />
              </button>
            </div>
          </motion.div>
        </AnimatePresence>
      </div>
    </div>
  );
}
