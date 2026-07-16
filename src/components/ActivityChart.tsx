import { motion } from 'motion/react';
import { useEffect, useState } from 'react';

interface ActivityChartProps {
  wallet?: string;
}

interface ChartData {
  label: string;
  value: number;
  height: string;
  active: boolean;
}

export function ActivityChart({ wallet }: ActivityChartProps) {
  const [data, setData] = useState<ChartData[]>([]);
  const [loading, setLoading] = useState(false);
  const [timeframe, setTimeframe] = useState<'D' | 'W' | 'M'>('M');
  const [year, setYear] = useState<number>(2026);

  useEffect(() => {
    async function fetchActivity() {
      if (!wallet) return;
      setLoading(true);
      try {
        const res = await fetch(`${import.meta.env.VITE_API_URL || ''}/api/wallet/transactions?address=${wallet}&timeframe=${timeframe}&year=${year}`, {
          headers: {
            'x-api-key': import.meta.env.VITE_API_KEY || 'default-frontend-key'
          }
        });
        if (res.ok) {
          const result = await res.json();
          console.log("Successfully fetched chart data from backend:", result);
          setData(result);
        } else {
          console.error("Backend returned an error code:", res.status);
        }
      } catch (err) {
        console.error("Failed to fetch activity:", err);
      } finally {
        setLoading(false);
      }
    }
    
    fetchActivity();
  }, [wallet, timeframe, year]);

  // Fallback if data is empty (e.g. initial load)
  const displayData = data.length > 0 ? data : Array(12).fill({ label: '-', value: 0, height: '5%', active: false });

  // Calculate dynamic bar width based on how many items we are displaying
  const getBarWidthClass = () => {
    if (displayData.length <= 7) return 'w-[10%]';
    if (displayData.length <= 12) return 'w-[6%]';
    return 'flex-1 mx-[1px]'; // 52 weeks gets tightly packed
  };

  return (
    <motion.div 
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5, delay: 0.1 }}
      className="bg-white border border-gray-200 rounded-[1.5rem] p-6 shadow-sm flex flex-col h-full relative"
    >
      <div className="flex justify-between items-center mb-8">
        <h3 className="font-semibold text-lg text-auralis-dark flex items-center gap-3">
          Activity
          {loading && <span className="text-xs text-gray-400 animate-pulse font-normal">Syncing...</span>}
        </h3>
        
        <div className="flex gap-3">
          {/* Year Toggle */}
          <select 
            value={year}
            onChange={(e) => setYear(Number(e.target.value))}
            className="bg-gray-100/80 rounded-full px-3 py-1 border border-gray-200/50 text-xs font-bold text-gray-600 outline-none cursor-pointer hover:bg-gray-200/50 transition-colors"
          >
            {[2026, 2025, 2024, 2023, 2022, 2021].map(y => (
              <option key={y} value={y}>{y}</option>
            ))}
          </select>

          {/* Timeframe Toggle */}
          <div className="flex bg-gray-100/80 rounded-full p-1 border border-gray-200/50">
            {['D', 'W', 'M'].map((t) => (
              <button
                key={t}
                onClick={() => setTimeframe(t as 'D'|'W'|'M')}
                className={`px-3 py-1 text-xs font-bold rounded-full transition-all ${
                  timeframe === t 
                    ? 'bg-white text-auralis-dark shadow-sm ring-1 ring-black/5' 
                    : 'text-gray-400 hover:text-gray-600 hover:bg-transparent'
                }`}
              >
                {t === 'D' ? 'Day' : t === 'W' ? 'Week' : 'Month'}
              </button>
            ))}
          </div>
        </div>
      </div>
      
      <div className="flex-1 w-full flex flex-col relative min-h-[300px] mt-2">
        {/* Y-Axis Labels */}
        <div className="absolute left-0 top-0 bottom-6 w-8 flex flex-col justify-between text-xs text-auralis-text-muted font-medium z-10">
          <span>Max</span>
          <span></span>
          <span></span>
          <span></span>
          <span>0</span>
        </div>
        
        {/* Grid Lines */}
        <div className="absolute left-10 right-0 top-2 bottom-8 flex flex-col justify-between z-0">
          {[1, 2, 3, 4, 5].map(i => (
            <div key={i} className="w-full border-t border-dashed border-gray-200 h-0"></div>
          ))}
        </div>

        {/* Bars Container */}
        <div className="ml-10 flex-1 flex justify-between items-end z-10 relative pt-2 pb-8">
          
          {displayData.map((item, index) => (
            <motion.div 
              key={index + item.label}
              initial={{ height: 0 }}
              animate={{ height: '100%' }}
              transition={{ duration: 0.5, delay: 0.1 + (index * 0.02) }}
              className={`${getBarWidthClass()} flex flex-col items-center justify-end h-full group relative cursor-pointer`}
            >
              <div 
                className={`w-full rounded-md flex items-end justify-center pb-2 transition-all duration-300 relative ${
                  item.active 
                    ? 'bg-auralis-green shadow-[0_0_15px_rgba(74,222,128,0.4)] hover:bg-opacity-90' 
                    : 'bg-auralis-green-light hover:bg-green-200'
                }`}
                style={{ height: item.height === '100%' ? '85%' : item.height }}
              >
                {/* Tooltip positioned relative to the bar itself */}
                {item.value > 0 && (
                  <div 
                    className={`absolute -top-10 bg-auralis-dark text-white text-xs font-bold px-3 py-1.5 rounded-lg whitespace-nowrap z-30 shadow-lg pointer-events-none transition-all duration-200 ${
                      item.active 
                        ? 'opacity-100 scale-100' 
                        : 'opacity-0 scale-90 group-hover:opacity-100 group-hover:scale-100'
                    }`}
                  >
                    {item.value} Tx
                    <div className="absolute -bottom-1 left-1/2 transform -translate-x-1/2 w-2 h-2 bg-auralis-dark rotate-45"></div>
                  </div>
                )}
                
                {displayData.length <= 12 && (
                  <span className={`text-[10px] font-bold ${item.active ? 'text-white' : 'text-auralis-panel'}`}>
                    {item.value}
                  </span>
                )}
              </div>
              {/* Only show every 4th label if we have 52 weeks to avoid text overlap */}
              {(displayData.length <= 12 || index % 4 === 0) && (
                <span className="absolute -bottom-8 text-[10px] text-auralis-text-muted font-medium whitespace-nowrap overflow-visible">
                  {item.label}
                </span>
              )}
            </motion.div>
          ))}
        </div>
      </div>
    </motion.div>
  );
}
