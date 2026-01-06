import { Component, inject, signal } from '@angular/core';
import { FormGroup, FormControl, ReactiveFormsModule } from '@angular/forms';
import { List } from '../../services/list';
import { WebViewBridgeService } from '../../services/webview-bridge.service';
import { MatButtonModule } from '@angular/material/button';
import { MatRippleModule } from '@angular/material/core';
import { MatDividerModule } from '@angular/material/divider';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatListModule } from '@angular/material/list';
import { MatSelectModule } from '@angular/material/select';
import { Router, RouterModule } from '@angular/router';
import { MatIconModule } from '@angular/material/icon';
import { MatToolbarModule } from '@angular/material/toolbar';
import { VotersLastSirService } from '../../services/voter-last-sir-data.service';
import { LastSirHistory } from "../last-sir-history/last-sir-history";
import { DummyResponseService } from '../../services/dummy-response.service';
import { LastSIRApiResponse, VoterLastSIRRecord, VoterLastSIRRecordDTO } from '../../models/last-sir-api-response';

@Component({
  selector: 'app-last-sir-page',
  imports: [
    MatListModule,
    MatRippleModule,
    MatIconModule,
    MatButtonModule,
    MatToolbarModule,
    MatFormFieldModule,
    MatInputModule,
    MatSelectModule,
    MatDividerModule,
    ReactiveFormsModule,
    RouterModule,
    LastSirHistory
],
  templateUrl: './last-sir-page.html',
  styleUrl: './last-sir-page.css',
})
export class LastSirPage {
listService = inject(List);
  stateList = this.listService.stateList;
  lastSirDB = inject(VotersLastSirService);

  webviewBridge = inject(WebViewBridgeService);

  formValues = signal('');
  dummyData = inject(DummyResponseService);
  myform = new FormGroup({
    stateCode: new FormControl('S24'),
    acNumber: new FormControl(''),
    partNumber:new FormControl(''),
    partSerialNumber:new FormControl('')
  });
  constructor(private router: Router) {}

 async onMyFormSubmit(){
    console.log(this.myform.getRawValue());
    this.formValues.set(JSON.stringify(this.myform.getRawValue()));
    this.router.navigate(['/lastsirresult'], {
      state: {
        formData: this.myform.value
      }
    });
    return;
    const response:LastSIRApiResponse<VoterLastSIRRecordDTO> = this.dummyData.lastSirRecord
    const payload = response.payload[0];
    this.lastSirDB.add({
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
      gender: payload.gender
    });
 }


}
