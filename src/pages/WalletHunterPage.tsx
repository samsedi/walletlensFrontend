import { WalletHunterHeader } from '../components/WalletHunterHeader';
import { WalletHunterStats } from '../components/WalletHunterStats';
import { WalletHunterChart } from '../components/WalletHunterChart';
import { WalletHunterTable } from '../components/WalletHunterTable';
import { WalletHunterSidebar } from '../components/WalletHunterSidebar';
import { LatestThreatFeed } from '../components/LatestThreatFeed';

export function WalletHunterPage() {
  return (
    <main className="flex-1 w-full max-w-[1600px] mx-auto grid grid-cols-1 xl:grid-cols-[1fr_380px] gap-8 p-6 lg:p-8 mt-2 pb-12 transition-colors">
      {/* Left Column */}
      <div className="flex flex-col gap-6 min-w-0">
        <WalletHunterHeader />
        <WalletHunterStats />
        <WalletHunterChart />
        <WalletHunterTable />
      </div>

      {/* Right Column: Sidebar */}
      <div className="h-[calc(100vh-120px)] flex flex-col gap-6 sticky top-[88px]">
        <LatestThreatFeed />
        <WalletHunterSidebar />
      </div>
    </main>
  );
}
