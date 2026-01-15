export interface ScanStore {
  globalScanResults: string;
  clearGlobalScanResults: () => void;
  setGlobalScanResults: (results: string) => void;
}
