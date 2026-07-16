import { motion } from 'motion/react';

export function WalletHunterHeader() {
  return (
    <motion.div 
      initial={{ opacity: 0, y: 10 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.4 }}
      className="flex justify-between items-center bg-white dark:bg-[#fafafa] rounded-[1.5rem] p-4 shadow-sm border border-gray-200 dark:border-gray-100"
    >
      <div className="flex items-center gap-4 pl-2">
        <div className="flex items-center gap-2">
          <div className="w-2.5 h-2.5 bg-green-500 rounded-full"></div>
          <span className="text-[10px] font-bold text-gray-500 tracking-wider bg-gray-100 dark:bg-gray-200 px-2 py-1 rounded-md uppercase">Mode: Passive Ingestion (Read-Only)</span>
        </div>
        <div className="flex flex-col ml-4">
          <span className="font-bold text-gray-900 dark:text-gray-900">Hunter Active</span>
          <span className="text-xs text-gray-500">Last run: 2 mins ago · Next run: in 5h 58m</span>
        </div>
      </div>
      <button className="bg-green-500 hover:bg-green-600 text-white font-semibold py-2.5 px-6 rounded-full transition-colors shadow-sm text-sm">
        Run Now
      </button>
    </motion.div>
  );
}
