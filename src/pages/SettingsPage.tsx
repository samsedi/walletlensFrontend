import { useState, useEffect } from 'react';
import { Key, Trash2, Plus, ShieldCheck, AlertCircle } from 'lucide-react';

interface ApiKey {
  id: number;
  keyValue: string;
  clientName: string;
  active: boolean;
  createdAt: string;
}

export function SettingsPage() {
  const [keys, setKeys] = useState<ApiKey[]>([]);
  const [clientName, setClientName] = useState('');
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  const fetchKeys = async () => {
    setLoading(true);
    try {
      const res = await fetch('/admin/keys');
      if (!res.ok) throw new Error('Failed to fetch API keys');
      const data = await res.json();
      setKeys(data);
    } catch (err: any) {
      setError(err.message);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchKeys();
  }, []);

  const handleGenerateKey = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!clientName.trim()) return;

    try {
      const res = await fetch('/admin/keys/generate', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ clientName })
      });
      if (!res.ok) throw new Error('Failed to generate key');
      setClientName('');
      fetchKeys(); // Refresh list
    } catch (err: any) {
      setError(err.message);
    }
  };

  const handleRevokeKey = async (id: number) => {
    if (!confirm('Are you sure you want to revoke this API key? This action cannot be undone.')) return;
    
    try {
      const res = await fetch(`/admin/keys/${id}`, { method: 'DELETE' });
      if (!res.ok) throw new Error('Failed to revoke key');
      fetchKeys(); // Refresh list
    } catch (err: any) {
      setError(err.message);
    }
  };

  return (
    <div className="flex-1 overflow-y-auto p-8 relative">
      <div className="max-w-4xl mx-auto space-y-8 animate-in fade-in slide-in-from-bottom-4 duration-500 ease-out">
        
        {/* Header */}
        <div className="flex flex-col gap-2 border-b border-gray-200 dark:border-gray-800/50 pb-6">
          <div className="flex items-center gap-3 text-emerald-600 dark:text-emerald-400">
            <Key className="w-8 h-8" />
            <h1 className="text-3xl font-bold text-gray-900 dark:text-white">API Key Management</h1>
          </div>
          <p className="text-gray-500 dark:text-gray-400">
            Generate and manage access keys for your B2B clients and external integrations.
          </p>
        </div>

        {error && (
          <div className="p-4 bg-red-50 dark:bg-red-900/20 text-red-600 dark:text-red-400 rounded-xl flex items-center gap-3 border border-red-200 dark:border-red-800/30">
            <AlertCircle className="w-5 h-5 flex-shrink-0" />
            <p>{error}</p>
          </div>
        )}

        {/* Generate New Key Form */}
        <div className="bg-white dark:bg-[#111] border border-gray-200 dark:border-gray-800 rounded-2xl p-6 shadow-sm">
          <h2 className="text-xl font-semibold mb-4 flex items-center gap-2">
            <Plus className="w-5 h-5 text-gray-400" />
            Create New Key
          </h2>
          <form onSubmit={handleGenerateKey} className="flex gap-4">
            <input
              type="text"
              value={clientName}
              onChange={(e) => setClientName(e.target.value)}
              placeholder="Client or Application Name"
              className="flex-1 bg-gray-50 dark:bg-black border border-gray-200 dark:border-gray-800 rounded-xl px-4 py-3 focus:outline-none focus:ring-2 focus:ring-emerald-500/50 transition-all text-gray-900 dark:text-white"
            />
            <button
              type="submit"
              disabled={!clientName.trim()}
              className="bg-emerald-600 hover:bg-emerald-700 text-white px-6 py-3 rounded-xl font-medium transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
            >
              Generate Key
            </button>
          </form>
        </div>

        {/* Keys List */}
        <div className="bg-white dark:bg-[#111] border border-gray-200 dark:border-gray-800 rounded-2xl overflow-hidden shadow-sm">
          <div className="p-6 border-b border-gray-200 dark:border-gray-800 flex items-center justify-between">
            <h2 className="text-xl font-semibold flex items-center gap-2">
              <ShieldCheck className="w-5 h-5 text-gray-400" />
              Active API Keys
            </h2>
            <span className="bg-gray-100 dark:bg-gray-800 text-gray-600 dark:text-gray-300 px-3 py-1 rounded-full text-sm font-medium">
              {keys.length} Keys
            </span>
          </div>

          {loading ? (
            <div className="p-12 text-center text-gray-500">Loading keys...</div>
          ) : keys.length === 0 ? (
            <div className="p-12 text-center text-gray-500">No API keys found. Generate one above.</div>
          ) : (
            <div className="divide-y divide-gray-200 dark:divide-gray-800/50">
              {keys.map((key) => (
                <div key={key.id} className={`p-6 flex items-center justify-between transition-colors ${!key.active ? 'opacity-50 grayscale' : 'hover:bg-gray-50 dark:hover:bg-gray-800/30'}`}>
                  <div className="flex flex-col gap-1">
                    <div className="flex items-center gap-3">
                      <span className="font-semibold text-gray-900 dark:text-white">{key.clientName}</span>
                      {key.active ? (
                        <span className="bg-emerald-100 dark:bg-emerald-900/30 text-emerald-700 dark:text-emerald-400 text-xs px-2 py-0.5 rounded-full border border-emerald-200 dark:border-emerald-800/50">Active</span>
                      ) : (
                        <span className="bg-red-100 dark:bg-red-900/30 text-red-700 dark:text-red-400 text-xs px-2 py-0.5 rounded-full border border-red-200 dark:border-red-800/50">Revoked</span>
                      )}
                    </div>
                    <code className="text-sm font-mono bg-gray-100 dark:bg-black px-2 py-1 rounded text-gray-600 dark:text-gray-400 select-all border border-gray-200 dark:border-gray-800">
                      {key.keyValue}
                    </code>
                    <span className="text-xs text-gray-400 mt-1">
                      Created: {new Date(key.createdAt).toLocaleString()}
                    </span>
                  </div>

                  {key.active && (
                    <button
                      onClick={() => handleRevokeKey(key.id)}
                      className="p-2 text-gray-400 hover:text-red-500 hover:bg-red-50 dark:hover:bg-red-900/20 rounded-lg transition-colors"
                      title="Revoke Key"
                    >
                      <Trash2 className="w-5 h-5" />
                    </button>
                  )}
                </div>
              ))}
            </div>
          )}
        </div>

      </div>
    </div>
  );
}
