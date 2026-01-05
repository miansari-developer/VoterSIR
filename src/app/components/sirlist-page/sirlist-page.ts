import { Component, inject, signal } from '@angular/core';
import { VoterEpicList } from '../voter-epic-list/voter-epic-list';
import { MatToolbarModule } from '@angular/material/toolbar';
import { MatIconModule } from '@angular/material/icon';
import { MatIconButton } from '@angular/material/button';
import { MatFormField } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { VotersEpicsService } from '../../services/voters-epics.service';

@Component({
  selector: 'app-sirlist-page',
  imports: [
    VoterEpicList,
    MatToolbarModule,
    MatIconModule,
    MatIconButton,
    MatFormField,
    MatInputModule,
  ],
  template: ` <div class="container-fluid">
    <div class="row">
      <div class="col-12 px-0">
        <mat-toolbar>
          <span>EPIC List</span>
        </mat-toolbar>
      </div>
      <div class="col-12 mt-2">
        <mat-form-field appearance="outline" class="search-field w-100">
          <mat-icon matPrefix>search</mat-icon>
          <input
            matInput
            placeholder="Search EPIC..."
            [value]="searchText()"
            (input)="onSearch($any($event.target).value)"
            autofocus
          />
        </mat-form-field>
      </div>
    </div>
    <div class="row">
      <div class="col-12 px-0">
        <app-voter-epic-list></app-voter-epic-list>
      </div>
    </div>
  </div>`,
  styleUrl: './sirlist-page.css',
})
export class SIRListPage {
  searchText = signal('');
  votersEpicDB = inject(VotersEpicsService);
  onSearch(value: string) {
    this.searchText.set(value);
    this.votersEpicDB.search(value);
  }
}
