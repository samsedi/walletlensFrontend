import { useState, useEffect } from 'react';
import { Terminal, Copy, Check, ChevronRight, Shield, ArrowLeft, Play, Code2 } from 'lucide-react';

interface InteractiveEndpointProps {
  method: 'GET' | 'POST';
  url: string;
  language: string;
  code: string;
  defaultResponse?: string;
  parameters: { name: string; type: string; required?: boolean; defaultValue?: string; isBody?: boolean }[];
}

const InteractiveEndpoint = ({ method, url, language, code, defaultResponse, parameters }: InteractiveEndpointProps) => {
  const [mode, setMode] = useState<'code' | 'try'>('code');
  const [copied, setCopied] = useState(false);
  const [apiKey, setApiKey] = useState('');
  
  // State for parameters
  const [paramValues, setParamValues] = useState<Record<string, string>>(() => {
    const init: Record<string, string> = {};
    parameters.forEach(p => { if (p.defaultValue) init[p.name] = p.defaultValue; });
    return init;
  });

  const [response, setResponse] = useState<string | null>(defaultResponse || null);
  const [loading, setLoading] = useState(false);
  const [status, setStatus] = useState<{ code: number; ok: boolean } | null>(null);

  const handleCopy = () => {
    navigator.clipboard.writeText(code);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  const handleSend = async () => {
    setLoading(true);
    setStatus(null);
    try {
      let finalUrl = url;
      let options: RequestInit = {
        method,
        headers: {
          'x-api-key': apiKey,
          'Content-Type': 'application/json'
        }
      };

      if (method === 'GET') {
        const queryParams = new URLSearchParams();
        parameters.forEach(p => {
          if (paramValues[p.name]) {
            queryParams.append(p.name, paramValues[p.name]);
          }
        });
        const qs = queryParams.toString();
        if (qs) finalUrl += `?${qs}`;
      } else if (method === 'POST') {
        const body: Record<string, string> = {};
        parameters.forEach(p => {
          if (p.isBody && paramValues[p.name]) {
            body[p.name] = paramValues[p.name];
          }
        });
        options.body = JSON.stringify(body);
      }

      const fullUrl = finalUrl.startsWith('http') ? finalUrl : `${window.location.origin}${finalUrl}`;

      const res = await fetch(fullUrl, options);
      setStatus({ code: res.status, ok: res.ok });
      
      const contentType = res.headers.get('content-type');
      if (contentType && contentType.includes('application/json')) {
        const data = await res.json();
        setResponse(JSON.stringify(data, null, 2));
      } else {
        const text = await res.text();
        setResponse(text);
      }
    } catch (err: any) {
      setResponse(`Error: ${err.message}`);
      setStatus({ code: 0, ok: false });
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="bg-[#1e1e1e] rounded-xl overflow-hidden shadow-2xl border border-gray-800 mb-8 mt-4 sticky top-8">
      {/* Header Tabs */}
      <div className="flex items-center justify-between px-4 py-3 bg-[#252525] border-b border-gray-800">
        <div className="flex items-center gap-4">
          <div className="flex items-center gap-2">
            <span className={`text-xs font-bold px-2 py-0.5 rounded ${method === 'POST' ? 'bg-emerald-500/20 text-emerald-400' : 'bg-blue-500/20 text-blue-400'}`}>
              {method}
            </span>
            <span className="text-gray-300 text-sm font-mono truncate max-w-[200px] sm:max-w-xs">{url}</span>
          </div>
          <div className="h-4 w-px bg-gray-700 hidden sm:block"></div>
          <div className="flex items-center gap-1 hidden sm:flex">
            <button 
              onClick={() => setMode('code')}
              className={`px-3 py-1 rounded-md text-xs font-medium flex items-center gap-1.5 transition-colors ${mode === 'code' ? 'bg-gray-700 text-white' : 'text-gray-400 hover:text-white'}`}
            >
              <Code2 className="w-3.5 h-3.5" /> Code
            </button>
            <button 
              onClick={() => setMode('try')}
              className={`px-3 py-1 rounded-md text-xs font-medium flex items-center gap-1.5 transition-colors ${mode === 'try' ? 'bg-emerald-500/20 text-emerald-400' : 'text-gray-400 hover:text-white'}`}
            >
              <Play className="w-3.5 h-3.5" /> Try It
            </button>
          </div>
        </div>
        {mode === 'code' && (
          <button onClick={handleCopy} className="text-gray-400 hover:text-white transition-colors" title="Copy code">
            {copied ? <Check className="w-4 h-4 text-emerald-400" /> : <Copy className="w-4 h-4" />}
          </button>
        )}
      </div>

      {/* Mobile Tabs */}
      <div className="flex items-center gap-1 p-2 bg-[#1e1e1e] border-b border-gray-800 sm:hidden">
        <button 
          onClick={() => setMode('code')}
          className={`flex-1 py-1.5 rounded-md text-xs font-medium flex items-center justify-center gap-1.5 transition-colors ${mode === 'code' ? 'bg-gray-700 text-white' : 'text-gray-400 hover:text-white'}`}
        >
          <Code2 className="w-3.5 h-3.5" /> Code
        </button>
        <button 
          onClick={() => setMode('try')}
          className={`flex-1 py-1.5 rounded-md text-xs font-medium flex items-center justify-center gap-1.5 transition-colors ${mode === 'try' ? 'bg-emerald-500/20 text-emerald-400' : 'text-gray-400 hover:text-white'}`}
        >
          <Play className="w-3.5 h-3.5" /> Try It
        </button>
      </div>

      {/* Content Area */}
      <div className="p-4 overflow-x-auto min-h-[150px]">
        {mode === 'code' ? (
          <pre className="text-sm font-mono text-gray-300 leading-relaxed">
            <code>{code}</code>
          </pre>
        ) : (
          <div className="space-y-4 animate-in fade-in duration-200">
            <div className="space-y-1">
              <label className="text-xs font-medium text-gray-400">API Key</label>
              <input 
                type="password" 
                value={apiKey}
                onChange={e => setApiKey(e.target.value)}
                placeholder="wr_your_api_key"
                className="w-full bg-[#111] border border-gray-700 rounded-lg px-3 py-2 text-sm text-white focus:outline-none focus:border-emerald-500 transition-colors"
              />
            </div>
            {parameters.map(p => (
              <div key={p.name} className="space-y-1">
                <label className="text-xs font-medium text-gray-400 flex justify-between">
                  <span>{p.name}</span>
                  {p.required && <span className="text-red-400">Required</span>}
                </label>
                <input 
                  type="text" 
                  value={paramValues[p.name] || ''}
                  onChange={e => setParamValues({...paramValues, [p.name]: e.target.value})}
                  placeholder={p.defaultValue || `Enter ${p.name}`}
                  className="w-full bg-[#111] border border-gray-700 rounded-lg px-3 py-2 text-sm text-white focus:outline-none focus:border-emerald-500 transition-colors"
                />
              </div>
            ))}
            <button 
              onClick={handleSend}
              disabled={loading}
              className="w-full bg-emerald-600 hover:bg-emerald-700 text-white py-2 rounded-lg text-sm font-medium transition-colors disabled:opacity-50 disabled:cursor-not-allowed flex items-center justify-center gap-2"
            >
              {loading ? 'Sending...' : <><Play className="w-4 h-4" /> Send Request</>}
            </button>
          </div>
        )}
      </div>

      {/* Response Area */}
      {(response || status) && (
        <div className="border-t border-gray-800 mt-2">
          <div className="px-4 py-2 bg-[#252525] border-b border-gray-800 text-xs font-semibold text-gray-400 uppercase tracking-wider flex items-center justify-between">
            <span>Response</span>
            {status && (
              <span className={`px-2 py-0.5 rounded text-[10px] font-bold ${status.ok ? 'bg-emerald-500/20 text-emerald-400' : 'bg-red-500/20 text-red-400'}`}>
                {status.code}
              </span>
            )}
          </div>
          <div className="p-4 overflow-x-auto bg-[#1e1e1e]">
            <pre className={`text-sm font-mono leading-relaxed ${status && !status.ok ? 'text-red-400/90' : 'text-emerald-400/90'}`}>
              <code>{response}</code>
            </pre>
          </div>
        </div>
      )}
    </div>
  );
};

export function ApiDocsPage({ onBack }: { onBack: () => void }) {
  const [activeSection, setActiveSection] = useState('overview');

  useEffect(() => {
    const handleScroll = () => {
      const sections = ['overview', 'authentication', 'wallet-details', 'transactions', 'ens', 'ai-chat', 'llm-docs'];
      for (const section of sections) {
        const el = document.getElementById(section);
        if (el && el.getBoundingClientRect().top < 200) {
          setActiveSection(section);
        }
      }
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const scrollTo = (id: string) => {
    document.getElementById(id)?.scrollIntoView({ behavior: 'smooth' });
  };

  return (
    <div className="min-h-screen bg-white dark:bg-[#0a0a0a] text-gray-900 dark:text-gray-100 flex font-sans">
      
      {/* Left Sidebar Navigation */}
      <aside className="w-64 border-r border-gray-200 dark:border-gray-800/50 hidden lg:block sticky top-0 h-screen overflow-y-auto">
        <div className="p-6">
          <button 
            onClick={onBack}
            className="flex items-center gap-2 text-gray-500 hover:text-gray-900 dark:hover:text-white font-medium text-sm mb-8 transition-colors"
          >
            <ArrowLeft className="w-4 h-4" /> Back to Dashboard
          </button>
          <div className="flex items-center gap-2 font-bold text-xl mb-8">
            <Terminal className="w-6 h-6 text-emerald-500" /> API Reference
          </div>
          
          <nav className="space-y-1">
            {['overview', 'authentication', 'wallet-details', 'transactions', 'ens', 'ai-chat', 'llm-docs'].map((id) => (
              <button
                key={id}
                onClick={() => scrollTo(id)}
                className={`w-full text-left px-3 py-2 text-sm font-medium rounded-lg transition-colors flex items-center justify-between ${
                  activeSection === id 
                    ? 'bg-emerald-50 dark:bg-emerald-500/10 text-emerald-700 dark:text-emerald-400' 
                    : 'text-gray-600 dark:text-gray-400 hover:bg-gray-100 dark:hover:bg-gray-800/50'
                }`}
              >
                {id.replace('-', ' ').replace(/\b\w/g, l => l.toUpperCase())}
                {activeSection === id && <ChevronRight className="w-4 h-4" />}
              </button>
            ))}
          </nav>
        </div>
      </aside>

      {/* Main Content Area (Split Prose / Code) */}
      <div className="flex-1 w-full bg-white dark:bg-[#0a0a0a] overflow-x-hidden">
        
        {/* Section: Overview */}
        <section id="overview" className="border-b border-gray-200 dark:border-gray-800/50">
          <div className="max-w-7xl mx-auto grid grid-cols-1 xl:grid-cols-2">
            <div className="p-8 lg:p-12 xl:pr-16 bg-white dark:bg-[#0a0a0a]">
              <h1 className="text-4xl font-bold mb-6">WalletLens API Overview</h1>
              <p className="text-gray-600 dark:text-gray-400 text-lg leading-relaxed mb-6">
                WalletLens provides an institutional-grade risk scoring and on-chain forensics API for Ethereum wallets. Our tools help you clear the fog of decentralized finance by providing instant clarity on risk vectors.
              </p>
              <h3 className="font-semibold uppercase tracking-wider text-sm text-gray-500 dark:text-gray-400 mb-4 mt-8">Endpoints at a Glance</h3>
              <ul className="space-y-4 mb-8">
                <li className="flex flex-col gap-1">
                  <strong className="text-gray-900 dark:text-gray-100">Wallet Details</strong>
                  <span className="text-gray-600 dark:text-gray-400 text-sm">Fetches a 0-100 risk score, historical interaction metrics, and specific risk flags (like OFAC sanctions or mixer exposure).</span>
                </li>
                <li className="flex flex-col gap-1">
                  <strong className="text-gray-900 dark:text-gray-100">Transactions</strong>
                  <span className="text-gray-600 dark:text-gray-400 text-sm">Retrieves historical transaction counts grouped by days, weeks, or months to easily track wallet activity trends over time.</span>
                </li>
                <li className="flex flex-col gap-1">
                  <strong className="text-gray-900 dark:text-gray-100">ENS Resolution</strong>
                  <span className="text-gray-600 dark:text-gray-400 text-sm">Provides forward and reverse ENS resolution alongside rich social metadata like Twitter handles and avatars.</span>
                </li>
                <li className="flex flex-col gap-1">
                  <strong className="text-gray-900 dark:text-gray-100">AI Chat</strong>
                  <span className="text-gray-600 dark:text-gray-400 text-sm">Powers an interactive chatbot capable of reasoning about a wallet's risk profile in natural language.</span>
                </li>
              </ul>
            </div>
            <div className="bg-gray-900 p-8 lg:p-12 xl:pl-16 flex items-center justify-center">
              <div className="text-center mt-12 mb-12">
                <div className="w-16 h-16 mx-auto bg-emerald-500/10 rounded-full flex items-center justify-center mb-6">
                  <Shield className="w-8 h-8 text-emerald-400" />
                </div>
                <h3 className="text-xl font-semibold text-white mb-3">Build with Confidence</h3>
                <p className="text-gray-400 text-sm max-w-xs mx-auto leading-relaxed">
                  Integrate institutional-grade forensics directly into your own Web3 dApps and compliance workflows.
                </p>
              </div>
            </div>
          </div>
        </section>

        {/* Section: Authentication */}
        <section id="authentication" className="border-b border-gray-200 dark:border-gray-800/50">
          <div className="max-w-7xl mx-auto grid grid-cols-1 xl:grid-cols-2">
            {/* Prose */}
            <div className="p-8 lg:p-12 xl:pr-16 bg-white dark:bg-[#0a0a0a]">
              <h2 className="text-3xl font-bold mb-4">Authentication</h2>
              <p className="text-gray-600 dark:text-gray-400 text-lg leading-relaxed mb-6">
                The Wallet Risk API uses API keys to authenticate requests. You can view and manage your API keys in the Settings dashboard.
              </p>
              <div className="bg-orange-50 dark:bg-orange-900/20 border border-orange-200 dark:border-orange-800/30 p-4 rounded-xl flex items-start gap-3 mb-6">
                <Shield className="w-5 h-5 text-orange-600 dark:text-orange-400 flex-shrink-0 mt-0.5" />
                <p className="text-sm text-orange-800 dark:text-orange-300">
                  Your API keys carry many privileges. Do not share your secret API keys in publicly accessible areas such as GitHub, client-side code, and so forth.
                </p>
              </div>
              <p className="text-gray-600 dark:text-gray-400 leading-relaxed">
                Authentication to the API is performed via the <code className="bg-gray-100 dark:bg-gray-800 px-1.5 py-0.5 rounded text-sm text-pink-500">x-api-key</code> HTTP header. Provide your API key in all requests. All API requests must be made over HTTPS.
              </p>
            </div>
            {/* Code */}
            <div className="bg-gray-900 p-8 lg:p-12 xl:pl-16">
              <InteractiveEndpoint 
                method="GET"
                url="/api/wallet/details"
                language="bash"
                code={`curl "https://api.domain.com/api/wallet/details" \\
  -H "x-api-key: wr_your_api_key_here"`}
                parameters={[{ name: 'address', type: 'string', required: true, defaultValue: 'vitalik.eth' }]}
              />
            </div>
          </div>
        </section>

        {/* Section: Wallet Details */}
        <section id="wallet-details" className="border-b border-gray-200 dark:border-gray-800/50">
          <div className="max-w-7xl mx-auto grid grid-cols-1 xl:grid-cols-2">
            <div className="p-8 lg:p-12 xl:pr-16 bg-white dark:bg-[#0a0a0a]">
              <h2 className="text-3xl font-bold mb-4">Retrieve Wallet Details</h2>
              <p className="text-gray-600 dark:text-gray-400 text-lg leading-relaxed mb-8">
                Retrieves a comprehensive risk assessment for a specific wallet address, including age, total transactions, funding sources, and flagged risk signals.
              </p>
              
              <h3 className="font-semibold uppercase tracking-wider text-sm text-gray-500 dark:text-gray-400 mb-4">Query Parameters</h3>
              <div className="space-y-6">
                <div className="border-b border-gray-100 dark:border-gray-800/50 pb-4">
                  <div className="flex items-center gap-2 mb-1">
                    <code className="font-bold text-gray-900 dark:text-gray-100">address</code>
                    <span className="text-xs text-red-500 uppercase font-semibold">Required</span>
                  </div>
                  <p className="text-gray-600 dark:text-gray-400 text-sm">The wallet address or ENS domain to analyze (e.g., <code className="text-pink-500 text-xs">vitalik.eth</code>).</p>
                </div>
                <div className="border-b border-gray-100 dark:border-gray-800/50 pb-4">
                  <div className="flex items-center gap-2 mb-1">
                    <code className="font-bold text-gray-900 dark:text-gray-100">chain</code>
                    <span className="text-xs text-gray-400">string</span>
                  </div>
                  <p className="text-gray-600 dark:text-gray-400 text-sm">The blockchain network (default: <code className="text-pink-500 text-xs">eth</code>).</p>
                </div>
                <div className="border-b border-gray-100 dark:border-gray-800/50 pb-4">
                  <div className="flex items-center gap-2 mb-1">
                    <code className="font-bold text-gray-900 dark:text-gray-100">refresh</code>
                    <span className="text-xs text-gray-400">boolean</span>
                  </div>
                  <p className="text-gray-600 dark:text-gray-400 text-sm">Forces a cache bypass to fetch live on-chain data (default: <code className="text-pink-500 text-xs">false</code>).</p>
                </div>
              </div>
            </div>
            <div className="bg-gray-900 p-8 lg:p-12 xl:pl-16">
              <InteractiveEndpoint 
                method="GET"
                url="/api/wallet/details"
                language="bash"
                code={`curl -G "https://api.domain.com/api/wallet/details" \\
  -d "address=vitalik.eth" \\
  -d "chain=eth" \\
  -H "x-api-key: wr_12345"`}
                defaultResponse={`{\n  "stats": {\n    "walletAge": "10.8y",\n    "totalTxs": "77,886",\n    "riskScore": 1,\n    "riskLevel": "Low Risk"\n  },\n  "recentInteractions": [...],\n  "signalFlags": [...]\n}`}
                parameters={[
                  { name: 'address', type: 'string', required: true, defaultValue: 'vitalik.eth' },
                  { name: 'chain', type: 'string', defaultValue: 'eth' },
                  { name: 'refresh', type: 'boolean' }
                ]}
              />
            </div>
          </div>
        </section>

        {/* Section: Transactions */}
        <section id="transactions" className="border-b border-gray-200 dark:border-gray-800/50">
          <div className="max-w-7xl mx-auto grid grid-cols-1 xl:grid-cols-2">
            <div className="p-8 lg:p-12 xl:pr-16 bg-white dark:bg-[#0a0a0a]">
              <h2 className="text-3xl font-bold mb-4">Retrieve Transactions</h2>
              <p className="text-gray-600 dark:text-gray-400 text-lg leading-relaxed mb-8">
                Retrieves a timeline of transaction counts for charting and historical activity tracking.
              </p>
              
              <h3 className="font-semibold uppercase tracking-wider text-sm text-gray-500 dark:text-gray-400 mb-4">Query Parameters</h3>
              <div className="space-y-6">
                <div className="border-b border-gray-100 dark:border-gray-800/50 pb-4">
                  <div className="flex items-center gap-2 mb-1">
                    <code className="font-bold text-gray-900 dark:text-gray-100">address</code>
                    <span className="text-xs text-red-500 uppercase font-semibold">Required</span>
                  </div>
                </div>
                <div className="border-b border-gray-100 dark:border-gray-800/50 pb-4">
                  <div className="flex items-center gap-2 mb-1">
                    <code className="font-bold text-gray-900 dark:text-gray-100">timeframe</code>
                  </div>
                  <p className="text-gray-600 dark:text-gray-400 text-sm">Grouping period: <code className="text-pink-500 text-xs">D</code> (Days), <code className="text-pink-500 text-xs">W</code> (Weeks), <code className="text-pink-500 text-xs">M</code> (Months).</p>
                </div>
              </div>
            </div>
            <div className="bg-gray-900 p-8 lg:p-12 xl:pl-16">
              <InteractiveEndpoint 
                method="GET"
                url="/api/wallet/transactions"
                language="bash"
                code={`curl -G "https://api.domain.com/api/wallet/transactions" \\
  -d "address=vitalik.eth" \\
  -d "timeframe=W" \\
  -H "x-api-key: wr_12345"`}
                defaultResponse={`[\n  { "date": "2026-06-01", "count": 42 },\n  { "date": "2026-06-08", "count": 15 }\n]`}
                parameters={[
                  { name: 'address', type: 'string', required: true, defaultValue: 'vitalik.eth' },
                  { name: 'timeframe', type: 'string', defaultValue: 'W' }
                ]}
              />
            </div>
          </div>
        </section>

        {/* Section: ENS */}
        <section id="ens" className="border-b border-gray-200 dark:border-gray-800/50">
          <div className="max-w-7xl mx-auto grid grid-cols-1 xl:grid-cols-2">
            <div className="p-8 lg:p-12 xl:pr-16 bg-white dark:bg-[#0a0a0a]">
              <h2 className="text-3xl font-bold mb-4">Resolve ENS</h2>
              <p className="text-gray-600 dark:text-gray-400 text-lg leading-relaxed mb-8">
                Resolves an ENS domain to its underlying Ethereum address with rich social metadata.
              </p>
            </div>
            <div className="bg-gray-900 p-8 lg:p-12 xl:pl-16">
              <InteractiveEndpoint 
                method="GET"
                url="/api/ens/resolve"
                language="bash"
                code={`curl -G "https://api.domain.com/api/ens/resolve" \\
  -d "address=vitalik.eth" \\
  -H "x-api-key: wr_12345"`}
                defaultResponse={`{\n  "address": "0xd8da6bf26964af9d7eed...",\n  "ensName": "vitalik.eth",\n  "twitter": "VitalikButerin"\n}`}
                parameters={[
                  { name: 'address', type: 'string', required: true, defaultValue: 'vitalik.eth' }
                ]}
              />
            </div>
          </div>
        </section>

        {/* Section: AI Chat */}
        <section id="ai-chat" className="border-b border-gray-200 dark:border-gray-800/50">
          <div className="max-w-7xl mx-auto grid grid-cols-1 xl:grid-cols-2">
            <div className="p-8 lg:p-12 xl:pr-16 bg-white dark:bg-[#0a0a0a]">
              <h2 className="text-3xl font-bold mb-4">AI Inference</h2>
              <p className="text-gray-600 dark:text-gray-400 text-lg leading-relaxed mb-8">
                Creates an AI inference stream using Gemini, grounded in the context of the requested wallet's risk profile.
              </p>
              <h3 className="font-semibold uppercase tracking-wider text-sm text-gray-500 dark:text-gray-400 mb-4">Body Parameters</h3>
              <div className="space-y-6">
                <div className="border-b border-gray-100 dark:border-gray-800/50 pb-4">
                  <div className="flex items-center gap-2 mb-1">
                    <code className="font-bold text-gray-900 dark:text-gray-100">walletAddress</code>
                    <span className="text-xs text-red-500 uppercase font-semibold">Required</span>
                  </div>
                </div>
                <div className="border-b border-gray-100 dark:border-gray-800/50 pb-4">
                  <div className="flex items-center gap-2 mb-1">
                    <code className="font-bold text-gray-900 dark:text-gray-100">message</code>
                    <span className="text-xs text-red-500 uppercase font-semibold">Required</span>
                  </div>
                </div>
              </div>
            </div>
            <div className="bg-gray-900 p-8 lg:p-12 xl:pl-16 h-full min-h-[400px]">
              <InteractiveEndpoint 
                method="POST"
                url="/api/ai/chat"
                language="bash"
                code={`curl -X POST "https://api.domain.com/api/ai/chat" \\
  -H "x-api-key: wr_12345" \\
  -H "Content-Type: application/json" \\
  -d '{\n    "walletAddress": "vitalik.eth",\n    "message": "Why is this wallet low risk?"\n  }'`}
                defaultResponse={`{\n  "reply": "This wallet lacks any interactions with OFAC-sanctioned entities..."\n}`}
                parameters={[
                  { name: 'walletAddress', type: 'string', required: true, defaultValue: 'vitalik.eth', isBody: true },
                  { name: 'message', type: 'string', required: true, defaultValue: 'Why is this wallet low risk?', isBody: true }
                ]}
              />
            </div>
          </div>
        </section>

        {/* Section: LLM Docs */}
        <section id="llm-docs" className="border-b border-gray-200 dark:border-gray-800/50">
          <div className="max-w-7xl mx-auto grid grid-cols-1 xl:grid-cols-2">
            <div className="p-8 lg:p-12 xl:pr-16 bg-white dark:bg-[#0a0a0a]">
              <h2 className="text-3xl font-bold mb-4">LLM Documentation</h2>
              <p className="text-gray-600 dark:text-gray-400 text-lg leading-relaxed mb-8">
                Building an integration with an AI coding assistant like Cursor, Claude, or GitHub Copilot? 
                Copy our consolidated API spec below to give your LLM full context on how to integrate with WalletLens.
              </p>
            </div>
            <div className="bg-gray-900 p-8 lg:p-12 xl:pl-16 flex flex-col h-full min-h-[400px]">
              <div className="flex items-center justify-between mb-4">
                <span className="text-gray-400 text-sm font-medium">llm.txt</span>
                <button 
                  onClick={() => {
                    navigator.clipboard.writeText(llmDocsContent);
                    alert("Copied LLM docs to clipboard!");
                  }}
                  className="flex items-center gap-2 text-emerald-400 hover:text-emerald-300 transition-colors text-sm font-medium"
                >
                  <Copy className="w-4 h-4" /> Copy Spec
                </button>
              </div>
              <pre className="flex-1 bg-[#1e1e1e] p-4 rounded-xl border border-gray-800 text-sm font-mono text-gray-300 overflow-y-auto max-h-[400px] leading-relaxed">
                <code>{llmDocsContent}</code>
              </pre>
            </div>
          </div>
        </section>

      </div>
    </div>
  );
}

const llmDocsContent = `# WalletLens API Specification

## Authentication
Base URL: \`https://api.domain.com\`
All endpoints require the \`x-api-key\` header.

## 1. Wallet Details
Endpoint: \`GET /api/wallet/details\`
Description: Retrieves a comprehensive risk assessment for a specific wallet address.
Query Parameters:
- \`address\` (string, required): Wallet address or ENS domain.
- \`chain\` (string, optional, default: eth): Blockchain network.
- \`refresh\` (boolean, optional, default: false): Bypass cache.
Response: JSON object containing stats (walletAge, totalTxs, riskScore, riskLevel), recentInteractions, and signalFlags.

## 2. Transactions
Endpoint: \`GET /api/wallet/transactions\`
Description: Retrieves a timeline of transaction counts.
Query Parameters:
- \`address\` (string, required): Wallet address or ENS domain.
- \`timeframe\` (string, optional, default: W): Grouping period (D, W, M).
Response: JSON array of objects with \`date\` and \`count\`.

## 3. Resolve ENS
Endpoint: \`GET /api/ens/resolve\`
Description: Resolves an ENS domain to its underlying Ethereum address with social metadata.
Query Parameters:
- \`address\` (string, required): Wallet address or ENS domain.
Response: JSON object containing \`address\`, \`ensName\`, and \`twitter\`.

## 4. AI Inference
Endpoint: \`POST /api/ai/chat\`
Description: Creates an AI inference stream grounded in the context of the requested wallet's risk profile.
Body Parameters (JSON):
- \`walletAddress\` (string, required): Target wallet address.
- \`message\` (string, required): Natural language query.
Response: JSON object containing \`reply\`.
`;
