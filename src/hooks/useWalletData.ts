import { useState, useEffect } from 'react';

export interface EnsProfile {
  address: string;
  ensName: string | null;
  displayName: string;
  avatarUrl: string | null;
  description: string | null;
  twitter: string | null;
  resolved: boolean;
}

export interface WalletDetails {
  stats: {
    walletAge: string;
    totalTxs: string;
    contractsHit: number;
    fundSource: string;
    tokenSpread: string;
    riskScore: number;
    riskLevel: string;
    riskContacts: number;
  };
  recentInteractions: Array<{
    name: string;
    address: string;
    type: string;
    status: string;
    value: string;
    positive: boolean;
    timeAgo?: string;
    hash?: string;
  }>;
  signalFlags: Array<{
    label: string;
    status: string;
    isClear: boolean;
  }>;
}

// Simple in-memory cache to prevent refetching when switching tabs
const cache: Record<string, { profile: EnsProfile | null, details: WalletDetails | null }> = {};

export function useWalletData(wallet: string, chain: string = 'eth') {
  const [profile, setProfile] = useState<EnsProfile | null>(null);
  const [details, setDetails] = useState<WalletDetails | null>(null);
  const [loading, setLoading] = useState(false);
  const [refreshing, setRefreshing] = useState(false);
  const [refreshTrigger, setRefreshTrigger] = useState(0);

  // Use the raw 0x address to bypass ENS resolution timeouts on initial load
  const addressToSearch = wallet || '0xd8dA6BF26964aF9D7eEd9e03E53415D37aA96045';

  useEffect(() => {
    const cacheKey = `${addressToSearch}-${chain}`;

    async function fetchData(isRefresh: boolean = false) {
      // If we have cached data for this wallet+chain, use it immediately!
      if (!isRefresh && cache[cacheKey]) {
        setProfile(cache[cacheKey].profile);
        setDetails(cache[cacheKey].details);
        return;
      }

      if (isRefresh) setRefreshing(true);
      else setLoading(true);
      
      try {
        let fetchedProfile = null;
        let fetchedDetails = null;

        // Fetch ENS Profile
        const ensRes = await fetch(`${import.meta.env.VITE_API_URL || ''}/api/ens/resolve?address=${addressToSearch}&refresh=${isRefresh}`, {
          headers: {
            'x-api-key': import.meta.env.VITE_API_KEY || 'default-frontend-key'
          }
        });
        if (ensRes.ok) {
          fetchedProfile = await ensRes.json();
          setProfile(fetchedProfile);
        }

        // Fetch Wallet Details with dynamic chain
        const detailsRes = await fetch(`${import.meta.env.VITE_API_URL || ''}/api/wallet/details?address=${addressToSearch}&chain=${chain}&refresh=${isRefresh}`, {
          headers: {
            'x-api-key': import.meta.env.VITE_API_KEY || 'default-frontend-key'
          }
        });
        if (detailsRes.ok) {
          fetchedDetails = await detailsRes.json();
          setDetails(fetchedDetails);
        }

        // Save to cache
        cache[cacheKey] = {
          profile: fetchedProfile,
          details: fetchedDetails
        };
      } catch (err) {
        console.error("Failed to fetch data", err);
      } finally {
        setLoading(false);
        setRefreshing(false);
      }
    }
    
    fetchData(refreshTrigger > 0);
  }, [addressToSearch, chain, refreshTrigger]);

  return {
    profile,
    details,
    loading,
    refreshing,
    addressToSearch,
    refreshData: () => {
      // Delete from memory cache so we guarantee a fresh state
      const cacheKey = `${addressToSearch}-${chain}`;
      delete cache[cacheKey];
      // Increment trigger to re-run useEffect with isRefresh = true
      setRefreshTrigger(prev => prev + 1);
    }
  };
}
