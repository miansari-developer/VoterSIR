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
import {MatMenuModule} from '@angular/material/menu';

@Component({
  selector: 'app-home2',
  imports: [
    MatListModule,
    MatRippleModule,
    MatIconModule,
    MatButtonModule,
    MatMenuModule,
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
//     let epics = [
// 	{
// 		name: 'Abdul Salam Ansari',
// 		epic: 'FZJ3054012',
// 		stateCode: 'S24',
// 		stateName: 'Uttar Pradesh',
// 	},
// 	{
// 		name: 'Hasina Khatoon',
// 		epic: 'FZJ3054038',
// 		stateCode: 'S24',
// 		stateName: 'Uttar Pradesh',
// 	},
// 	{
// 		name: 'Mohammad Imran Ansari',
// 		epic: 'UCC2398857',
// 		stateCode: 'S24',
// 		stateName: 'Uttar Pradesh',
// 	},
// 	{
// 		name: 'Shaziya Ansari',
// 		epic: 'ZJG1710169',
// 		stateCode: 'S24',
// 		stateName: 'Uttar Pradesh',
// 	},
// 	{
// 		name: 'Afsana Khatoon',
// 		epic: 'INB3961026',
// 		stateCode: 'S24',
// 		stateName: 'Uttar Pradesh',
// 	},
// 	{
// 		name: 'Mohammad Ali Ansari',
// 		epic: 'UP/57/277/0141782',
// 		stateCode: 'S24',
// 		stateName: 'Uttar Pradesh',
// 	},
// 	{
// 		name: 'Baby Maimuna',
// 		epic: 'KZP2782381',
// 		stateCode: 'S24',
// 		stateName: 'Uttar Pradesh',
// 	},
// 	{
// 		name: 'Rabia',
// 		epic: 'UCC3428844',
// 		stateCode: 'S24',
// 		stateName: 'Uttar Pradesh',
// 	},
// 	{
// 		name: 'Alquama Tabish',
// 		epic: 'UCC3428422',
// 		stateCode: 'S24',
// 		stateName: 'Uttar Pradesh',
// 	},
// 	{
// 		name: 'Rifat Sania',
// 		epic: 'UCC4294237',
// 		stateCode: 'S24',
// 		stateName: 'Uttar Pradesh',
// 	},
// 	{
// 		name: 'Sadaf Ali',
// 		epic: 'UCC4294344',
// 		stateCode: 'S24',
// 		stateName: 'Uttar Pradesh',
// 	},
// 	{
// 		name: 'Ashraf Ali Ansari',
// 		epic: 'UP/50/232/0591023',
// 		stateCode: 'S24',
// 		stateName: 'Uttar Pradesh',
// 	},
// 	{
// 		name: 'Zaheda Khatoon',
// 		epic: 'UCC0612929',
// 		stateCode: 'S24',
// 		stateName: 'Uttar Pradesh',
// 	},
// 	{
// 		name: 'Ahmad Ali Ansari',
// 		epic: 'UCC4296174',
// 		stateCode: 'S24',
// 		stateName: 'Uttar Pradesh',
// 	},
// 	{
// 		name: 'Noorfishan',
// 		epic: 'UCC4294450',
// 		stateCode: 'S24',
// 		stateName: 'Uttar Pradesh',
// 	},
// 	{
// 		name: 'Shaukat Ali Ansari',
// 		epic: 'UCC2958486',
// 		stateCode: 'S24',
// 		stateName: 'Uttar Pradesh',
// 	},
// 	{
// 		name: 'Anjum Ara',
// 		epic: 'KZP2281020',
// 		stateCode: 'S24',
// 		stateName: 'Uttar Pradesh',
// 	},
// 	{
// 		name: 'Abdul Qadir',
// 		epic: 'UP/50/231/0756551',
// 		stateCode: 'S24',
// 		stateName: 'Uttar Pradesh',
// 	},
// 	{
// 		name: 'Azmeri Khatun',
// 		epic: 'FZJ2880383',
// 		stateCode: 'S24',
// 		stateName: 'Uttar Pradesh',
// 	},
// 	{
// 		name: 'Aftab Ansari',
// 		epic: 'XBY2496719',
// 		stateCode: 'S24',
// 		stateName: 'Uttar Pradesh',
// 	},
// 	{
// 		name: 'Salauddin Khan',
// 		epic: 'XBY0153528',
// 		stateCode: 'S24',
// 		stateName: 'Uttar Pradesh',
// 	},
// 	{
// 		name: 'Zubaida Khatoon',
// 		epic: 'XBY1070028',
// 		stateCode: 'S24',
// 		stateName: 'Uttar Pradesh',
// 	},
// 	{
// 		name: 'Asghari Khatoon',
// 		epic: 'RQB0047522',
// 		stateCode: 'S24',
// 		stateName: 'Uttar Pradesh',
// 	},
// 	{
// 		name: 'Shahid Ali Ansari',
// 		epic: 'RQB3379898',
// 		stateCode: 'S24',
// 		stateName: 'Uttar Pradesh',
// 	},
// 	{
// 		name: 'Shahina Parveen',
// 		epic: 'RQB3379930',
// 		stateCode: 'S24',
// 		stateName: 'Uttar Pradesh',
// 	},
// 	{
// 		name: 'Rehana Khatoon',
// 		epic: 'IEJ3074481',
// 		stateCode: 'S24',
// 		stateName: 'Uttar Pradesh',
// 	},
// 	{
// 		name: 'Shahnaz Banoo',
// 		epic: 'UKC2080299',
// 		stateCode: 'S24',
// 		stateName: 'Uttar Pradesh',
// 	},
// 	{
// 		name: 'Ashiya Khatoon',
// 		epic: 'ZJG3182755',
// 		stateCode: 'S24',
// 		stateName: 'Uttar Pradesh',
// 	},
// 	{
// 		name: 'Nazia Sultana',
// 		epic: 'RQB2638666',
// 		stateCode: 'S24',
// 		stateName: 'Uttar Pradesh',
// 	},
// 	{
// 		name: 'Mohd. Haroon Ansari',
// 		epic: 'RQB2638633',
// 		stateCode: 'S24',
// 		stateName: 'Uttar Pradesh',
// 	},
// 	{
// 		name: 'SHAGUFTA YASMEEN',
// 		epic: 'RQB2638641',
// 		stateCode: 'S24',
// 		stateName: 'Uttar Pradesh',
// 	},
// 	{
// 		name: 'SHABEENA HAROON',
// 		epic: 'RQB2638658',
// 		stateCode: 'S24',
// 		stateName: 'Uttar Pradesh',
// 	},
// 	{
// 		name: 'MOHD. SHARIQ HAROON',
// 		epic: 'RQB2638625',
// 		stateCode: 'S24',
// 		stateName: 'Uttar Pradesh',
// 	},
// 	{
// 		name: 'FARHEENA HAROON',
// 		epic: 'RQB2638674',
// 		stateCode: 'S24',
// 		stateName: 'Uttar Pradesh',
// 	},
// 	{
// 		name: 'Mushtak Ahamad',
// 		epic: 'RQB1117324',
// 		stateCode: 'S24',
// 		stateName: 'Uttar Pradesh',
// 	},
// 	{
// 		name: 'Rubina Harun',
// 		epic: 'RQB1117332',
// 		stateCode: 'S24',
// 		stateName: 'Uttar Pradesh',
// 	},
// 	{
// 		name: 'Faiyaz Ansari',
// 		epic: 'ZJG0162784',
// 		stateCode: 'S24',
// 		stateName: 'Uttar Pradesh',
// 	},
// 	{
// 		name: 'Niyaz Ansari',
// 		epic: 'ZJG0504720',
// 		stateCode: 'S24',
// 		stateName: 'Uttar Pradesh',
// 	},
// 	{
// 		name: 'Riyaz Ansari',
// 		epic: 'ZJG0504597',
// 		stateCode: 'S24',
// 		stateName: 'Uttar Pradesh',
// 	},
// 	{
// 		name: 'Bechan Ansari',
// 		epic: 'UP/50/231/0837010',
// 		stateCode: 'S24',
// 		stateName: 'Uttar Pradesh',
// 	},
// 	{
// 		name: 'Sarfaraz Ansari',
// 		epic: 'ZJG0505420',
// 		stateCode: 'S24',
// 		stateName: 'Uttar Pradesh',
// 	},
// 	{
// 		name: 'Irshad Ansari',
// 		epic: 'ZJG0876805',
// 		stateCode: 'S24',
// 		stateName: 'Uttar Pradesh',
// 	},
// 	{
// 		name: 'Laila Begum',
// 		epic: 'UP/50/231/0831160',
// 		stateCode: 'S24',
// 		stateName: 'Uttar Pradesh',
// 	},
// 	{
// 		name: 'Mohammad Imgeeyaul Ansari',
// 		epic: 'ZJG1313147',
// 		stateCode: 'S24',
// 		stateName: 'Uttar Pradesh',
// 	},
// 	{
// 		name: 'Md Shoiab Ansari',
// 		epic: 'ZJG2023190',
// 		stateCode: 'S24',
// 		stateName: 'Uttar Pradesh',
// 	},
// ];
// epics.forEach(item=>{
//   this.votersEpicDB.add({
//           epic:item.epic,
//           name: item.name,
//           stateCode: item.stateCode,
//           stateName: item.stateName,
//         });
// });
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
