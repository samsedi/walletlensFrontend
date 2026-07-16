import { AlertTriangle, CheckCircle2, ArrowUpRight, Sparkles } from 'lucide-react';

export function WalletHunterSidebar() {
  return (
    <div className="flex flex-col flex-1 bg-auralis-panel text-white rounded-[1.5rem] p-6 shadow-xl">
      <div className="flex items-center justify-between mb-8">
        <h3 className="text-lg font-semibold tracking-tight">Signal Flags</h3>
        <button className="w-8 h-8 rounded-full bg-white/10 flex items-center justify-center hover:bg-white/20 transition-colors">
          <ArrowUpRight className="w-4 h-4 text-white" />
        </button>
      </div>

      <div className="mb-6">
        <div className="text-sm text-white/70 mb-4 font-medium">Data Sources</div>
        <div className="grid grid-cols-2 gap-3">
          <div className="bg-auralis-green/10 border border-auralis-green/20 rounded-xl p-3 flex flex-col gap-2 transition-all cursor-default hover:bg-auralis-green/20">
            <div className="flex justify-between items-start w-full">
              <CheckCircle2 className="w-5 h-5 text-auralis-green" />
              <span className="text-[9px] font-mono text-auralis-green bg-auralis-green/10 px-1.5 py-0.5 rounded">v24.02</span>
            </div>
            <span className="text-xs font-medium leading-tight text-auralis-green mt-1">OFAC Sanctions:<br/>Active</span>
          </div>
          
          <div className="bg-auralis-green/10 border border-auralis-green/20 rounded-xl p-3 flex flex-col gap-2 transition-all cursor-default hover:bg-auralis-green/20">
            <div className="flex justify-between items-start w-full">
              <CheckCircle2 className="w-5 h-5 text-auralis-green" />
              <span className="text-[9px] font-mono text-auralis-green bg-auralis-green/10 px-1.5 py-0.5 rounded">Live</span>
            </div>
            <span className="text-xs font-medium leading-tight text-auralis-green mt-1">GoPlus Security:<br/>Clear</span>
          </div>

          <div className="bg-orange-500/10 border border-orange-500/20 rounded-xl p-3 flex flex-col gap-2 transition-all cursor-default hover:bg-orange-500/20">
            <div className="flex justify-between items-start w-full">
              <AlertTriangle className="w-5 h-5 text-orange-400" />
              <span className="text-[9px] font-mono text-orange-400 bg-orange-500/10 px-1.5 py-0.5 rounded">Polling</span>
            </div>
            <span className="text-xs font-medium leading-tight text-orange-400 mt-1">Chainabuse:<br/>Degraded</span>
          </div>

          <div className="bg-auralis-green/10 border border-auralis-green/20 rounded-xl p-3 flex flex-col gap-2 transition-all cursor-default hover:bg-auralis-green/20">
            <div className="flex justify-between items-start w-full">
              <CheckCircle2 className="w-5 h-5 text-auralis-green" />
              <span className="text-[9px] font-mono text-auralis-green bg-auralis-green/10 px-1.5 py-0.5 rounded">Proprietary</span>
            </div>
            <span className="text-xs font-medium leading-tight text-auralis-green mt-1">Internal Intel:<br/>Clear</span>
          </div>
        </div>
      </div>

      <div className="mt-4">
        <div className="text-sm text-white/70 mb-4 font-medium">Graph Traversal</div>
        <div className="mb-4 bg-white/5 border border-white/10 rounded-xl p-4">
          <div className="flex justify-between text-[11px] font-bold text-white/70 mb-3 uppercase tracking-wider">
            <span>Hop 1 of 2</span>
            <span className="text-auralis-green">45%</span>
          </div>
          <div className="w-full bg-black/40 rounded-full h-1.5 flex overflow-hidden mb-5">
            <div className="bg-auralis-green h-full w-[45%] rounded-full shadow-[0_0_8px_rgba(56,189,104,0.5)]"></div>
          </div>
          
          <div className="grid grid-cols-2 gap-4">
            <div>
              <div className="text-[10px] text-white/50 tracking-wider mb-1 uppercase">Seeds</div>
              <div className="text-sm font-bold text-white">847 <span className="text-white/50 font-normal text-xs">/1,847</span></div>
            </div>
            <div>
              <div className="text-[10px] text-white/50 tracking-wider mb-1 uppercase">Discovered</div>
              <div className="text-sm font-bold text-white">42,341</div>
            </div>
          </div>
        </div>
      </div>

      {/* Bottom AI Area */}
      <div className="mt-auto pt-4 flex flex-col gap-3">
        <div className="flex flex-wrap gap-2">
          <button className="bg-white/5 hover:bg-white/10 text-[11px] text-gray-300 px-3 py-1.5 rounded-full border border-white/10 transition-colors whitespace-nowrap">
            Summarize Hop-2 exposure
          </button>
          <div className="flex gap-2">
            <button className="bg-white/5 hover:bg-white/10 text-[11px] text-gray-300 px-3 py-1.5 rounded-full border border-white/10 transition-colors whitespace-nowrap">
              List top origin mixers
            </button>
            <button className="bg-white/5 hover:bg-white/10 text-[11px] text-gray-300 px-3 py-1.5 rounded-full border border-white/10 transition-colors whitespace-nowrap">
              Export SAR Dossier
            </button>
          </div>
        </div>
        
        <div className="relative mt-2">
          <input 
            type="text" 
            placeholder="Ask AI about this traversal..." 
            className="w-full bg-white/5 border border-white/10 rounded-full py-3.5 pl-4 pr-12 text-sm text-white placeholder-gray-500 focus:outline-none focus:ring-1 focus:ring-[#4ade80] transition-all"
          />
          <button className="absolute right-1.5 top-1.5 bottom-1.5 w-[34px] bg-[#4ade80] hover:bg-[#3bcf6d] rounded-full flex items-center justify-center transition-colors shadow-sm">
            <Sparkles className="w-4 h-4 text-[#1a1f1a]" />
          </button>
        </div>
      </div>
    </div>
  );
}
