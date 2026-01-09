import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class AndroidBridgeService {

  private get bridge() {
    return window.AndroidBridge;
  }

  private isAvailable(): boolean {
    return typeof this.bridge !== 'undefined';
  }

  loadInterstitial(): void {
    if (!this.isAvailable()) {
      console.warn('[AndroidBridgeService] AndroidBridge not available (load)');
      return;
    }

    try {
      this.bridge!.loadInterstitial();
      console.log('[AndroidBridgeService] loadInterstitial called');
    } catch (error) {
      console.error('[AndroidBridgeService] loadInterstitial error', error);
    }
  }

  showInterstitial(): void {
    if (!this.isAvailable()) {
      console.warn('[AndroidBridgeService] AndroidBridge not available (show)');
      return;
    }

    try {
      this.bridge?.showInterstitial();
      console.log('[AndroidBridgeService] showInterstitial called');
    } catch (error) {
      console.error('[AndroidBridgeService] showInterstitial error', error);
    }
  }

  showToast(message:string):void{
    if (!this.isAvailable()) {
      console.warn('[AndroidBridgeService] AndroidBridge not available (showToast)');
      return;
    }
    try {
      this.bridge?.showToast(message);
      console.log('[AndroidBridgeService] showToast called');
    } catch (error) {
      console.error('[AndroidBridgeService] showToast error', error);
    }
  }
}
