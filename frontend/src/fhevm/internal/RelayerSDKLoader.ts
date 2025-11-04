declare global {
  interface Window {
    relayerSDK: any;
  }
}

export class RelayerSDKLoader {
  private static instance: RelayerSDKLoader;
  private isLoading = false;
  private loadPromise: Promise<void> | null = null;

  static getInstance(): RelayerSDKLoader {
    if (!RelayerSDKLoader.instance) {
      RelayerSDKLoader.instance = new RelayerSDKLoader();
    }
    return RelayerSDKLoader.instance;
  }

  async load(): Promise<void> {
    if (window.relayerSDK) {
      console.log('RelayerSDK already loaded');
      return Promise.resolve();
    }

    if (this.isLoading && this.loadPromise) {
      return this.loadPromise;
    }

    this.isLoading = true;

    this.loadPromise = new Promise((resolve, reject) => {
      const script = document.createElement('script');
      script.src = 'https://relayer.fhevm.network/relayer-sdk-js.umd.cjs';
      script.defer = true;

      script.onload = () => {
        console.log('RelayerSDK loaded successfully');
        this.isLoading = false;
        resolve();
      };

      script.onerror = () => {
        console.error('Failed to load RelayerSDK');
        this.isLoading = false;
        reject(new Error('Failed to load RelayerSDK'));
      };

      document.head.appendChild(script);
    });

    return this.loadPromise;
  }

  isLoaded(): boolean {
    return !!window.relayerSDK;
  }
}
