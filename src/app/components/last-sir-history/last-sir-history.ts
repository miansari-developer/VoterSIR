import { Component, inject } from '@angular/core';
import { MatListModule } from '@angular/material/list';
import { VotersLastSirService } from '../../services/voter-last-sir-data.service';
import { MatIconModule } from '@angular/material/icon';
import { MatButtonModule } from '@angular/material/button';
import {  MatRippleModule } from '@angular/material/core';

@Component({
  selector: 'app-last-sir-history',
  imports: [MatListModule, MatIconModule, MatIconModule, MatButtonModule,MatRippleModule],
  templateUrl: './last-sir-history.html',
  styleUrl: './last-sir-history.css',
})
export class LastSirHistory {
 lastSirDB = inject(VotersLastSirService);
 
 onDelete($event: MouseEvent, id: number) {
    $event.stopPropagation();
    $event.preventDefault();
    this.lastSirDB.delete(id);
  }
   
}
