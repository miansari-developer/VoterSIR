import { Injectable, NgZone } from '@angular/core';

interface PendingRequest {
  resolve: (value: any) => void;
  reject: (reason?: any) => void;
}

@Injectable({
  providedIn: 'root',
})
export class WebViewBridgeService {
  private webViewBReady = false;
  private requestQueue: Array<() => void> = [];
  private pending = new Map<string, PendingRequest>();

  constructor(private zone: NgZone) {
    this.registerGlobalHandlers();
  }

  uuid(): string {
    if (crypto?.randomUUID) {
      return crypto.randomUUID();
    }

    // Fallback (RFC 4122 v4 compliant)
    return 'xxxxxxxx-xxxx-4xxx-yxxx-xxxxxxxxxxxx'.replace(/[xy]/g, (c) => {
      const r = (Math.random() * 16) | 0;
      const v = c === 'x' ? r : (r & 0x3) | 0x8;
      return v.toString(16);
    });
  }
  /**
   * Registers global functions required by Android WebView
   */
  private registerGlobalHandlers(): void {
    const win = window as any;

    // Called by WebView-B when ready
    win.__onWebViewBReady = () => {
      this.zone.run(() => {
        console.log('✅ WebView-B is ready');
        this.webViewBReady = true;

        while (this.requestQueue.length) {
          this.requestQueue.shift()?.();
        }
      });
    };

    // Called by Android with RPC response
    win.__onAndroidResponse = (raw: string) => {
      this.zone.run(() => {
        const msg = JSON.parse(raw);
        const resolver = this.pending.get(msg.responseId);
        if (!resolver) return;

        this.pending.delete(msg.responseId);

        msg.success
          ? console.log(`✅ Success: onAndroidResponse -->\n${JSON.stringify(msg, null, 2)}`)
          : console.log(`❌ Failed: onAndroidResponse -->\n${JSON.stringify(msg, null, 2)}`);

        msg.success ? resolver.resolve(msg.result) : resolver.reject(msg.error);
      });
    };
  }

  /**
   * Execute JavaScript inside WebView-B
   */
  executeInWebViewB(code: string): Promise<any> {
    console.log(`📌 Code pushed in requestQueue -->\n${code}`);

    return new Promise((resolve, reject) => {
      const requestId = this.uuid();

      const task = () => {
        this.pending.set(requestId, { resolve, reject });

        (window as any).AndroidBridge?.postMessage(
          JSON.stringify({
            type: 'EXECUTE_JS',
            requestId,
            payload: { code },
          })
        );
      };

      this.webViewBReady ? task() : this.requestQueue.push(task);
    });
  }
}
