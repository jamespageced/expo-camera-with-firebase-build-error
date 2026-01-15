import { create } from 'zustand';
import type { ScanStore } from '@app/types';

export const useScanStore = create<ScanStore>(set => ({
  globalScanResults: '',
  clearGlobalScanResults: () => {
    set(() => ({ globalScanResults: '' }));
  },
  setGlobalScanResults: (results: string) => {
    set(() => ({ globalScanResults: results }));
  }
}));
