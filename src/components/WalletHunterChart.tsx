import { useState } from 'react';
import { BarChart2, LineChart, PieChart } from 'lucide-react';

export function WalletHunterChart() {
  const [timeframe, setTimeframe] = useState<'Day' | 'Week' | 'Month'>('Month');
  const [chartType, setChartType] = useState<'line' | 'bar' | 'pie'>('line');

  return (
    <div className="bg-white dark:bg-white rounded-[1.5rem] p-6 shadow-sm border border-gray-200 flex flex-col relative h-[380px]">
      <div className="flex justify-between items-center z-10 relative">
        <h3 className="font-bold text-xl text-gray-900">Activity</h3>
        <div className="flex items-center gap-3">
          {/* Chart Type Toggle */}
          <div className="flex bg-gray-100/80 rounded-full p-1 border border-gray-200/60 shadow-inner">
            {[
              { id: 'line', icon: LineChart },
              { id: 'bar', icon: BarChart2 },
              { id: 'pie', icon: PieChart }
            ].map((type) => (
              <button
                key={type.id}
                onClick={() => setChartType(type.id as any)}
                className={`p-1.5 rounded-full transition-all duration-200 ${
                  chartType === type.id 
                    ? 'bg-white text-gray-900 shadow-[0_1px_3px_rgba(0,0,0,0.1)] border-gray-200/50' 
                    : 'text-gray-400 hover:text-gray-600 hover:bg-gray-200/50'
                }`}
              >
                <type.icon className="w-3.5 h-3.5" />
              </button>
            ))}
          </div>

          {/* Timeframe Toggle */}
          <div className="flex bg-gray-100/80 rounded-full p-1 border border-gray-200/60 shadow-inner hidden md:flex">
            {['Day', 'Week', 'Month'].map((tf) => (
              <button
                key={tf}
                onClick={() => setTimeframe(tf as any)}
                className={`px-4 py-1 text-[11px] font-bold rounded-full transition-all duration-200 ${
                  timeframe === tf 
                    ? 'bg-white text-gray-900 shadow-[0_1px_3px_rgba(0,0,0,0.1)] border-gray-200/50' 
                    : 'text-gray-500 hover:text-gray-700 hover:bg-gray-200/50'
                }`}
              >
                {tf}
              </button>
            ))}
          </div>
        </div>
      </div>
      
      <div className="flex-1 w-full relative mt-4">
        {/* Grid & Axis */}
        <div className="absolute inset-0 flex flex-col justify-between pt-4 pb-8 z-0">
          <div className="w-full border-t border-dashed border-gray-200"></div>
          <div className="w-full border-t border-dashed border-gray-200"></div>
          <div className="w-full border-t border-dashed border-gray-200"></div>
        </div>
        <div className="absolute left-0 top-0 bottom-8 flex flex-col justify-between text-[10px] font-medium text-gray-400 z-0 py-4">
          <span>Max</span>
          <span></span>
          <span>0</span>
        </div>

        {/* Custom SVG Area Chart */}
        <div className="absolute inset-0 left-10 pb-8 z-10 overflow-hidden">
          <svg viewBox="0 0 1000 300" preserveAspectRatio="none" className="w-full h-full">
            <defs>
              <linearGradient id="chartGradient" x1="0" y1="0" x2="0" y2="1">
                <stop offset="0%" stopColor="rgba(74, 222, 128, 0.4)" />
                <stop offset="100%" stopColor="rgba(74, 222, 128, 0.05)" />
              </linearGradient>
            </defs>
            <path 
              d="M0,250 L80,250 L140,200 L220,230 L300,280 L380,230 L450,260 L520,200 L600,230 L680,180 L760,240 L840,160 L920,220 L1000,100 L1000,300 L0,300 Z" 
              fill="url(#chartGradient)" 
            />
            <path 
              d="M0,250 L80,250 L140,200 L220,230 L300,280 L380,230 L450,260 L520,200 L600,230 L680,180 L760,240 L840,160 L920,220 L1000,100" 
              fill="none" 
              stroke="rgba(74, 222, 128, 0.5)" 
              strokeWidth="2" 
            />
          </svg>
          
          {/* Tooltip point for May */}
          <div className="absolute left-[38%] top-[76%] transform -translate-x-1/2 -translate-y-1/2 z-20">
            <div className="relative">
              <div className="absolute -top-10 -left-6 bg-gray-900 text-white text-[10px] font-bold px-2 py-1 rounded shadow-md">
                73 Tx
              </div>
            </div>
          </div>
        </div>

        {/* X-Axis Labels */}
        <div className="absolute bottom-0 left-10 right-0 flex justify-between text-[10px] font-medium text-gray-400 z-10 px-2">
          <span>Jan</span>
          <span>Feb</span>
          <span>Mar</span>
          <span>Apr</span>
          <span className="text-gray-900 font-bold">May</span>
          <span>Jun</span>
          <span>Jul</span>
          <span>Aug</span>
          <span>Sep</span>
          <span>Oct</span>
          <span>Nov</span>
          <span>Dec</span>
        </div>
      </div>
    </div>
  );
}
