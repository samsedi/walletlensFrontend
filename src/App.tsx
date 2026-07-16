import { useState } from 'react';
import { TopNav } from './components/TopNav';
import { LandingPage } from './pages/LandingPage';
import { Sidebar, DashboardTab } from './components/Sidebar';
import { RiskScorerPage } from './pages/RiskScorerPage';
import { WalletHunterPage } from './pages/WalletHunterPage';
import { PlaceholderPage } from './pages/PlaceholderPage';
import { SettingsPage } from './pages/SettingsPage';
import { ApiDocsPage } from './pages/ApiDocsPage';
import { Eye, Microscope, FileText, Settings } from 'lucide-react';

export default function App() {
  const [view, setView] = useState<'landing' | 'dashboard' | 'docs'>('landing');
  const [wallet, setWallet] = useState('');
  const [activeTab, setActiveTab] = useState<DashboardTab>('Risk Scorer');
  const [selectedChain, setSelectedChain] = useState<string>('eth');

  const handleAnalyze = (address: string) => {
    setWallet(address);
    setView('dashboard');
    setActiveTab('Risk Scorer'); // Reset to default tab
  };

  const handleHome = () => {
    setView('landing');
  };

  if (view === 'landing') {
    return <LandingPage onAnalyze={handleAnalyze} onDocs={() => setView('docs')} />;
  }

  if (view === 'docs') {
    return <ApiDocsPage onBack={() => setView('dashboard')} />;
  }

  return (
    <div className="min-h-screen flex font-sans bg-surface-main dark:bg-black text-gray-900 dark:text-gray-100 selection:bg-gray-200 dark:selection:bg-gray-800 transition-colors">
      <Sidebar onHome={handleHome} activeTab={activeTab} onChangeTab={setActiveTab} onDocs={() => setView('docs')} />
      
      <div className="flex-1 flex flex-col min-w-0">
        <TopNav 
          onAnalyze={handleAnalyze} 
          selectedChain={selectedChain} 
          onNetworkChange={setSelectedChain} 
        />
        
        {/* Render all tabs to preserve DOM state and prevent re-playing entry animations, using display to toggle visibility */}
        <div style={{ display: activeTab === 'Risk Scorer' ? 'contents' : 'none' }}>
          <RiskScorerPage wallet={wallet} chain={selectedChain} />
        </div>
        
        <div style={{ display: activeTab === 'Wallet Hunter' ? 'contents' : 'none' }}>
          <WalletHunterPage />
        </div>
        
        <div style={{ display: activeTab === 'Investigations' ? 'contents' : 'none' }}>
          <PlaceholderPage 
            title="Deep Dive Investigations" 
            icon={Microscope} 
            description="Access your saved investigation reports, graph visualizations, and collaborative case files."
          />
        </div>
        
        <div style={{ display: activeTab === 'Reports' ? 'contents' : 'none' }}>
          <PlaceholderPage 
            title="Compliance Reports" 
            icon={FileText} 
            description="Generate, export, and manage regulatory compliance reports and SAR filings for suspicious wallets."
          />
        </div>
        
        <div style={{ display: activeTab === 'Settings' ? 'contents' : 'none' }}>
          <SettingsPage />
        </div>
      </div>
    </div>
  );
}
