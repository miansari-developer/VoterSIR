import { Component, inject, signal } from '@angular/core';
import { Router } from '@angular/router';
import { WebViewBridgeService } from '../../services/webview-bridge.service';
import { LastSIRApiResponse, VoterLastSIRRecord, VoterLastSIRRecordDTO } from '../../models/last-sir-api-response';
import { VotersLastSirService } from '../../services/voter-last-sir-data.service';

@Component({
  selector: 'app-last-sir-result',
  imports: [],
  templateUrl: './last-sir-result.html',
  styleUrl: './last-sir-result.css',
})
export class LastSirResult {
  sirData = signal<Omit<VoterLastSIRRecord, 'id'> | null>(null);
  lastSirDB = inject(VotersLastSirService);
  formData: any;
  webviewBridge = inject(WebViewBridgeService);
  constructor(private router: Router) {}
 async ngOnInit() {
    this.formData = history.state.formData;

    if (!this.formData) {
      // Optional: handle direct access or refresh
      this.router.navigate(['/']);
    }

    const stateCode = this.formData.stateCode;
    const acNumber = this.formData.acNumber;
    const partNumber = this.formData.partNumber;
    const serialNumber = this.formData.partSerialNumber;
     try {
      console.log('imran');
      const result = await this.webviewBridge.executeInWebViewB(`
        return await getLastSirDetails(
          '${stateCode}',
          '${acNumber}',
          '${partNumber}',
          '${serialNumber}'
        );
      `);
      console.log('Result:', result);
      const response:LastSIRApiResponse<VoterLastSIRRecordDTO> = result
      const payload = response.payload[0];
      const sirData2= {
      electorName: payload.firstName+" "+payload.lastName,
      epicNumber: payload.epicNumber,
      stateCode: payload.oldStateCd,
      electorHindiName:payload.firstNameHindi + " "+ payload.lastNameHindi,
      relativeName:payload.relativeFName+" "+payload.relativeLName,
      relativeHindiName:payload.relativeFNameHindi+" "+payload.relativeLNameHindi,
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
      gender: payload.gender || ""
    };
      this.lastSirDB.add(sirData2);
      this.sirData.set(sirData2)
    } catch (err) {
      console.error('Execution failed:', err);
    }
  }
}
