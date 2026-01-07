import { Component, inject, signal } from '@angular/core';
import { FormControl, FormGroup, ReactiveFormsModule } from '@angular/forms';
import { MatButtonModule } from '@angular/material/button';
import { MatRippleModule } from '@angular/material/core';
import { MatDividerModule } from '@angular/material/divider';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatIconModule } from '@angular/material/icon';
import { MatInputModule } from '@angular/material/input';
import { MatListModule } from '@angular/material/list';
import { MatSelectModule } from '@angular/material/select';
import { MatToolbarModule } from '@angular/material/toolbar';
import { VoterEpic, VotersEpicsService } from '../../services/voters-epics.service';
import { List } from '../../services/list';
import { VoterEpicList } from '../voter-epic-list/voter-epic-list';
import { WebViewBridgeService } from '../../services/webview-bridge.service';
import { Router, RouterModule } from '@angular/router';
import { VoterResponse } from '../../models/voter-response.model';

@Component({
  selector: 'app-home2',
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
    RouterModule,
  ],
  templateUrl: './home2.html',
  styleUrl: './home2.css',
})
export class Home2 {
  protected readonly title = signal('Voters SIR');
  epicList = signal<VoterEpic[]>([]);
  votersEpicDB = inject(VotersEpicsService);
  listService = inject(List);
  stateList = this.listService.stateList;

  webviewBridge = inject(WebViewBridgeService);
  constructor(private router: Router) {
    this.epicList.set(this.votersEpicDB.getAll());
  }

  formValues = signal('');
  myform = new FormGroup({
    stateCode: new FormControl('S24'),
    epic: new FormControl('FZJ3054038'), 
  });

  async onMyFormSubmit() {

    const epic = this.myform.getRawValue().epic;
    const stateCode = this.myform.getRawValue().stateCode;
    const stateName = this.stateList.find((x) => x.stateCd === stateCode)?.stateName;

    this.router.navigate(['/sirstatusresult'], {
      state: {
        formData: {epic,stateCode,stateName},
      },
    });
   
  }

  
  
  onDelete($event: MouseEvent, id: number) {
    $event.stopPropagation();
    $event.preventDefault();
    this.votersEpicDB.delete(id);
  }
  dummyfunc() {}

  capitalizeEpic() {
    const control = this.myform.get('epic');
    const value = control?.value;

    if (value) {
      control?.setValue(value.toUpperCase(), { emitEvent: false });
    }
  }
}
