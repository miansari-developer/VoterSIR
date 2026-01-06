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
import { RouterModule } from '@angular/router';
import { VoterEpicList } from '../voter-epic-list/voter-epic-list';
import { MatIconModule } from '@angular/material/icon';
import { MatToolbarModule } from '@angular/material/toolbar';
import { VotersLastSirService } from '../../services/voter-last-sir-data.service';

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
    VoterEpicList,
    RouterModule],
  templateUrl: './last-sir-page.html',
  styleUrl: './last-sir-page.css',
})
export class LastSirPage {
listService = inject(List);
  stateList = this.listService.stateList;
  lastSirDB = inject(VotersLastSirService);

  webviewBridge = inject(WebViewBridgeService);

  formValues = signal('');
  myform = new FormGroup({
    stateCode: new FormControl('S24'),
    acNumber: new FormControl(''),
    partNumber:new FormControl(''),
    partSerialNumber:new FormControl('')
  });

 async onMyFormSubmit(){
    console.log(this.myform.getRawValue());
    this.formValues.set(JSON.stringify(this.myform.getRawValue()));
 }
}
