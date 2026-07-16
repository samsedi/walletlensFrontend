import { Shield } from 'lucide-react';

export function WalletHunterStats() {
  return (
    <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
      {/* Card 1 */}
      <div className="bg-white dark:bg-white rounded-[1.5rem] p-6 shadow-sm border border-gray-200 flex flex-col justify-between relative overflow-hidden h-32">
        <div className="text-[10px] font-bold text-gray-500 tracking-wider uppercase">Total Wallets Indexed</div>
        <div className="flex items-end gap-3 mt-auto relative z-10">
          <span className="text-4xl font-bold text-gray-900">247,832</span>
          <span className="text-[10px] font-bold text-green-700 bg-green-100 px-2 py-1 rounded mb-1 leading-tight">+1,247<br/>cycle</span>
        </div>
        <div className="absolute -bottom-8 -right-8 w-40 h-24 bg-green-200/40 rounded-[100%] blur-2xl pointer-events-none z-0"></div>
        <div className="absolute -bottom-6 -left-6 w-32 h-16 bg-green-100/40 rounded-[100%] blur-xl pointer-events-none z-0"></div>
      </div>

      {/* Card 2 */}
      <div className="bg-white dark:bg-white rounded-[1.5rem] p-6 shadow-sm border border-gray-200 flex flex-col justify-between relative overflow-hidden h-32">
        <div className="text-[10px] font-bold text-gray-500 tracking-wider uppercase">Critical Threats</div>
        <div className="flex flex-col mt-auto relative z-10">
          <span className="text-4xl font-bold text-gray-900">12,441</span>
          <span className="text-[10px] text-gray-500 mt-1">Matched to OFAC & Known Drainers</span>
        </div>
        <div className="absolute -bottom-10 left-0 right-0 h-24 bg-red-50/80 transform -rotate-3 scale-110 pointer-events-none z-0 border-t-2 border-red-100/50"></div>
      </div>

      {/* Card 3 */}
      <div className="bg-white dark:bg-white rounded-[1.5rem] p-6 shadow-sm border border-gray-200 flex flex-col justify-between relative overflow-hidden h-32">
        <div className="text-[10px] font-bold text-gray-500 tracking-wider uppercase">Anomalies Tracked</div>
        <div className="flex flex-col mt-auto relative z-10">
          <span className="text-4xl font-bold text-gray-900">34,209</span>
          <span className="text-[10px] text-gray-500 mt-1">1-Hop Mixer & Structuring Footprints</span>
        </div>
        <div className="absolute -bottom-10 left-0 right-0 h-24 bg-orange-50/80 transform rotate-3 scale-110 pointer-events-none z-0 border-t-2 border-orange-100/50"></div>
      </div>

      {/* Card 4 */}
      <div className="bg-[#f2fdf5] dark:bg-[#f2fdf5] rounded-[1.5rem] p-6 shadow-sm border border-green-100 flex flex-col relative overflow-hidden h-32">
        <div className="flex justify-between items-start">
          <div className="text-[10px] font-bold text-green-700 tracking-wider uppercase">Sources Active</div>
          <Shield className="w-4 h-4 text-green-600" />
        </div>
        <div className="flex flex-col mt-auto">
          <span className="text-4xl font-bold text-green-600 mb-2">4/4</span>
          <div className="flex gap-1.5 w-full">
            {[1, 2, 3, 4].map(i => (
              <div key={i} className="h-1.5 rounded-full bg-green-500 flex-1"></div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}
