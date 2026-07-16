import { motion } from 'motion/react';
import { WalletDetails } from '../hooks/useWalletData';

interface InteractionsProps {
  interactions?: WalletDetails['recentInteractions'];
  chain?: string;
}

const getCoinLogo = (symbol: string) => {
  switch (symbol.toUpperCase()) {
    case 'BNB': return 'https://raw.githubusercontent.com/trustwallet/assets/master/blockchains/binance/info/logo.png';
    case 'POL':
    case 'MATIC': return 'https://raw.githubusercontent.com/trustwallet/assets/master/blockchains/polygon/info/logo.png';
    case 'ARB':
    case 'OP':
    case 'BASE':
    case 'ETH': return 'https://raw.githubusercontent.com/trustwallet/assets/master/blockchains/ethereum/info/logo.png';
    default: return 'https://raw.githubusercontent.com/trustwallet/assets/master/blockchains/ethereum/info/logo.png';
  }
};

export function Interactions({ interactions, chain = 'eth' }: InteractionsProps) {
  const symbol = (() => {
    switch (chain.toLowerCase()) {
      case 'bsc': return 'BNB';
      case 'polygon': return 'POL';
      default: return 'ETH';
    }
  })();

  // Mock fallback while loading or if no data
  const defaultInteractions = [
    {
      name: 'Uniswap V3',
      address: '0x1f98...0000',
      type: 'Swap',
      status: 'Safe',
      value: `1.24 ${symbol}`,
      isPositive: true
    },
    {
      name: 'OpenSea Seaport',
      address: '0x0000...0000',
      type: 'Approval',
      status: 'Safe',
      value: `0.00 ${symbol}`,
      isPositive: true
    },
    {
      name: 'Unknown Contract',
      address: '0x8a9b...4c21',
      type: 'Transfer',
      status: 'Flagged',
      value: `0.05 ${symbol}`,
      isPositive: false
    }
  ];

  const displayInteractions = interactions || defaultInteractions;

  return (
    <motion.div 
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5, delay: 0.4 }}
      className="bg-white border border-gray-200 rounded-[1.5rem] p-6 shadow-sm mb-8"
    >
      <h3 className="text-sm text-auralis-dark mb-4 font-semibold">Recent Interactions</h3>
      
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        {displayInteractions.map((item, i) => {
          const abbr = item.name.substring(0, 2).toUpperCase();
          const isPos = 'positive' in item ? (item as any).positive : (item as any).isPositive;
          const color = isPos ? 'bg-auralis-green-light text-auralis-green' : 'bg-auralis-red-light text-auralis-red';
          const statusColor = isPos ? 'bg-auralis-green-light text-auralis-green' : 'bg-auralis-red-light text-auralis-red';
          
          const getExplorerUrl = (chain: string, hash: string) => {
            switch (chain.toLowerCase()) {
              case 'bsc': return `https://bscscan.com/tx/${hash}`;
              case 'polygon': return `https://polygonscan.com/tx/${hash}`;
              case 'arbitrum': return `https://arbiscan.io/tx/${hash}`;
              case 'optimism': return `https://optimistic.etherscan.io/tx/${hash}`;
              case 'base': return `https://basescan.org/tx/${hash}`;
              default: return `https://etherscan.io/tx/${hash}`;
            }
          };

          return (
            <motion.div 
              key={`${item.hash || item.address}-${i}`}
              initial={{ opacity: 0, scale: 0.95 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ delay: 0.5 + (i * 0.1) }}
              whileHover={{ y: -4, shadow: "0 10px 15px -3px rgba(0, 0, 0, 0.1)" }}
              onClick={() => { if (item.hash) window.open(getExplorerUrl(chain, item.hash), '_blank'); }}
              className="border border-gray-200 rounded-xl p-5 flex flex-col bg-white transition-all cursor-pointer group hover:border-gray-300 relative"
            >
              {item.timeAgo && (
                <div className="absolute top-4 right-4 text-[10px] text-gray-400 font-medium">
                  {item.timeAgo}
                </div>
              )}
              
              <div className="flex items-center gap-3 mb-5 mt-1">
                <div className={`w-10 h-10 rounded-full flex items-center justify-center text-xs font-bold ${color} group-hover:scale-110 transition-transform`}>
                  {abbr}
                </div>
                <div>
                  <div className="text-sm font-semibold text-auralis-dark">{item.name}</div>
                  <div className="text-xs text-auralis-text-muted font-mono truncate w-32">{item.address}</div>
                </div>
              </div>
              
              <div className="flex justify-between items-center text-xs mb-3">
                <span className="text-auralis-text-muted">Type</span>
                <span className="font-semibold text-auralis-dark">{item.type}</span>
              </div>
              
              <div className="flex justify-between items-center text-xs mb-3">
                <span className="text-auralis-text-muted">Status</span>
                <span className={`px-2 py-0.5 rounded-full text-[10px] font-bold uppercase tracking-wider ${statusColor}`}>
                  {item.status}
                </span>
              </div>

              {item.hash && (
                <div className="flex justify-between items-center text-xs mb-4">
                  <span className="text-auralis-text-muted">Txn Hash</span>
                  <span className="font-mono text-gray-400 group-hover:text-blue-500 transition-colors">
                    {item.hash.substring(0, 6)}...{item.hash.substring(item.hash.length - 4)}
                  </span>
                </div>
              )}
              
              <div className="flex justify-between items-center text-xs pt-4 border-t border-gray-100 mt-auto">
                <span className="text-auralis-text-muted">Value</span>
                <div className="flex items-center gap-1.5">
                  <span className="text-auralis-dark font-mono font-medium">{item.value.split(" ")[0]}</span>
                  {item.value.split(" ")[1] && (
                    <img 
                      src={getCoinLogo(item.value.split(" ")[1])} 
                      alt={item.value.split(" ")[1]} 
                      className="w-4 h-4 rounded-full"
                    />
                  )}
                  {item.value.split(" ")[1] && (
                    <span className="text-auralis-text-muted font-medium text-[10px]">{item.value.split(" ")[1]}</span>
                  )}
                </div>
              </div>
            </motion.div>
          );
        })}
      </div>
    </motion.div>
  );
}
