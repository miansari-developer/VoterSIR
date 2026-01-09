import { Component, inject, input, signal } from '@angular/core';
import { VoterEpic, VotersEpicsService } from '../../services/voters-epics.service';
import { MatIconModule } from '@angular/material/icon';
import { MatButtonModule } from '@angular/material/button';
import { MatRippleModule } from '@angular/material/core';
import { MatDividerModule } from '@angular/material/divider';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatListModule } from '@angular/material/list';
import { MatSelectModule } from '@angular/material/select';
import { MatToolbarModule } from '@angular/material/toolbar';
import { Router } from '@angular/router';
import { UpperCasePipe } from '@angular/common';

@Component({
  selector: 'app-voter-epic-item',
  imports: [
    MatIconModule,
    MatListModule,
    MatRippleModule,
    MatIconModule,
    MatButtonModule,
    MatToolbarModule,
    MatFormFieldModule,
    MatInputModule,
    MatSelectModule,
    MatDividerModule,
    UpperCasePipe
  ],
  template: `
    <a mat-list-item matRipple (click)="onItemClicked($event)">
      <div matListItemAvatar class="avatar-number">{{ index() + 1 }}</div>
      <div matListItemTitle>{{ epicItem().name | uppercase}}</div>
      <div matListItemLine>{{ epicItem().epic }}</div>
      <div matListItemLine>{{ epicItem().stateName }}</div>
      <!-- <div matListItemMeta>
        <button mat-icon-button (click)="onDelete($event, epicItem().id)">
          <mat-icon>delete</mat-icon>
        </button>
      </div> -->
    </a>
    <mat-divider></mat-divider>
  `,
  styleUrl: './voter-epic-item.css',
})
export class VoterEpicItem {
  votersEpicDB = inject(VotersEpicsService);
  epicItem = input.required<VoterEpic>();
  index = input.required<number>();
   constructor(private router: Router) {
  }
  onItemClicked($event: MouseEvent){
    //$event.stopPropagation();
    $event.preventDefault();
     this.router.navigate(['/sirstatusresult'], {
      state: {
        formData: {
          epic:this.epicItem().epic,
          stateCode:this.epicItem().stateCode,
          stateName:this.epicItem().stateName}
      },
    });

  }
  onDelete($event: MouseEvent, id: number) {
    $event.stopPropagation();
    $event.preventDefault();
    this.votersEpicDB.delete(id);
  }
}
