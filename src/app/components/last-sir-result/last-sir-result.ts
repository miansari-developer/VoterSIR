import { Component, inject, signal } from '@angular/core';
import { Router } from '@angular/router';
import { WebViewBridgeService } from '../../services/webview-bridge.service';
import {
  LastSIRApiResponse,
  VoterLastSIRRecord,
  VoterLastSIRRecordDTO,
} from '../../models/last-sir-api-response';
import { VotersLastSirService } from '../../services/voter-last-sir-data.service';
import { MatToolbarModule } from '@angular/material/toolbar';
import { MatProgressSpinnerModule } from '@angular/material/progress-spinner';

@Component({
  selector: 'app-last-sir-result',
  imports: [MatToolbarModule, MatProgressSpinnerModule],
  templateUrl: './last-sir-result.html',
  styleUrl: './last-sir-result.css',
})
export class LastSirResult {
  inProgress = signal(true);
  isFailed = signal(false);
  message = signal('');

  sirData = signal<Omit<VoterLastSIRRecord, 'id'> | null>(null);
  lastSirDB = inject(VotersLastSirService);
  webviewBridge = inject(WebViewBridgeService);
  constructor(private router: Router) {}

  async ngOnInit() {
    const formData = history.state.formData;

    if (!formData) {
      this.router.navigate(['']);
    }

    const stateCode = formData.stateCode;
    const acNumber = formData.acNumber;
    const partNumber = formData.partNumber;
    const serialNumber = formData.partSerialNumber;
    try {
      const result = await this.webviewBridge.executeInWebViewB(`
        return await getLastSirDetails(
          '${stateCode}',
          '${acNumber}',
          '${partNumber}',
          '${serialNumber}'
        );
      `);
      const response: LastSIRApiResponse<VoterLastSIRRecordDTO> = result;
      this.inProgress.set(false);
      this.message.set(response.message);
      if (response.status === 'Failed') {
        this.isFailed.set(true);
      } else {
        const payload = response.payload[0];
        const sirData2 = {
          electorName: payload.firstName + ' ' + payload.lastName,
          epicNumber: payload.epicNumber,
          stateCode: payload.oldStateCd,
          electorHindiName: payload.firstNameHindi + ' ' + payload.lastNameHindi,
          relativeName: payload.relativeFName + ' ' + payload.relativeLName,
          relativeHindiName: payload.relativeFNameHindi + ' ' + payload.relativeLNameHindi,
          oldPartNumber: payload.oldPartNumber,
          oldPartName: payload.oldPartName,
          oldPartSerialNo: payload.oldPartSerialNo,
          oldAcName: payload.oldAcName,
          oldAcNo: payload.oldAcNo,
          oldDistName: payload.oldDistName,
          oldDistNo: payload.oldDistNo,
          oldStateName: payload.oldStateName,
          oldStateCd: payload.oldStateCd,
          relationType: payload.relationType,
          oldFullName: payload.oldFullName,
          oldFullNameL1: payload.oldFullNameL1,
          oldRelativeFullName: payload.oldRelativeFullName,
          oldRelativeFullNameL1: payload.oldRelativeFullNameL1,
          age: payload.age,
          gender: payload.gender || '',
        };
        this.sirData.set(sirData2);
        this.lastSirDB.add(sirData2);
      }
    } catch (err) {
      console.error('Execution failed:', err);
    }
  }
}
