export {};

declare global {
  interface Window {
    AndroidBridge?: {
      loadInterstitial: () => void;
      showInterstitial: () => void;
      showToast:(message:string) => void;
    };
  }
}
