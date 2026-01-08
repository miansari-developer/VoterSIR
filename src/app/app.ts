import { HttpClient } from '@angular/common/http';
import { Component, inject, signal } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { WebViewBridgeService } from './services/webview-bridge.service';

@Component({
  selector: 'app-root',
  imports: [RouterOutlet],
  templateUrl: './app.html',
  styleUrl: './app.css',
})
export class App {
  protected readonly title = signal('voters-sir');
  constructor(private http: HttpClient) {
   this.loadAndExecuteWebviewBJs();
  }
  webviewBridge = inject(WebViewBridgeService);

  loadAndExecuteWebviewBJs() {
    this.http
      .get('assets/webviewB-script.js', { responseType: 'text' })
      .subscribe(jsCode => {
        this.webviewBridge.executeInWebViewB(jsCode);
      });
  }
}
