import { Component, inject, signal } from '@angular/core';
import { Router } from '@angular/router';
import { WebViewBridgeService } from '../../services/webview-bridge.service';
import { VotersEpicsService } from '../../services/voters-epics.service';
import { VoterResponse } from '../../models/voter-response.model';
import { MatToolbarModule } from "@angular/material/toolbar";
import { MatIconModule } from "@angular/material/icon";
import { MatProgressSpinner } from "@angular/material/progress-spinner";
import { AndroidBridgeService } from '../../services/android-bridge.service';

@Component({
  selector: 'app-sir-status-result',
  imports: [MatToolbarModule, MatIconModule, MatProgressSpinner],
  templateUrl: './sir-status-result.html',
  styleUrl: './sir-status-result.css',
})
export class SirStatusResult {
  inProgress = signal(true);
  isFailed = signal(false);
  message = signal('');
  response = signal<VoterResponse | null>(null)
  votersEpicDB = inject(VotersEpicsService);
  webviewBridge = inject(WebViewBridgeService);

  constructor(private router: Router, private androidBridgeService:AndroidBridgeService) {}

  async ngOnInit() {
    
    const formData = history.state.formData;

    if (!formData) {
      this.router.navigate(['']);
    }

    const stateCode = formData.stateCode;
    const epic = formData.epic;
    const stateName = formData.stateName;

    try {
        const result = await this.webviewBridge.executeInWebViewB(`
          return await fetchSIRInfo('${epic}', '${stateCode}', '${stateName}');
        `);
        //console.log('Result:', JSON.stringify(result));
        this.inProgress.set(false);
        this.message.set(result.message);
        if(!result.success){
          this.isFailed.set(true);
        }else{
        this.response.set(new VoterResponse(result.data)) ;
      
        this.votersEpicDB.add({
          epic:epic,
          name: this.response()?.payload?.fullName || "-",
          stateCode: stateCode,
          stateName: stateName,
        });
        } 
    } catch (err) {
      console.error('Execution failed:', err);
      this.inProgress.set(false);
      this.isFailed.set(true);
      this.message.set('Execution failed: '+ err);
    }
    this.androidBridgeService.showInterstitial();
  }
}
