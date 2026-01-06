import { Component, inject } from '@angular/core';
import { MatListModule } from '@angular/material/list';
import { VotersLastSirService } from '../../services/voter-last-sir-data.service';
import { MatIconModule } from '@angular/material/icon';
import { MatButtonModule } from '@angular/material/button';
import { MatRippleModule } from '@angular/material/core';
import { Router } from '@angular/router';
import { VoterLastSIRRecord } from '../../models/last-sir-api-response';

@Component({
  selector: 'app-last-sir-history',
  imports: [MatListModule, MatIconModule, MatIconModule, MatButtonModule, MatRippleModule],
  templateUrl: './last-sir-history.html',
  styleUrl: './last-sir-history.css',
})
export class LastSirHistory {
  lastSirDB = inject(VotersLastSirService);
  constructor(private router: Router) {}
  onHistoryItemClicked(item: VoterLastSIRRecord) {
    console.log(item);
    this.router.navigate(['/lastsirresult'], {
      state: {
        formData: {
          stateCode: item.stateCode,
          acNumber: item.oldAcNo,
          partNumber: item.oldPartNumber,
          partSerialNumber: item.oldPartSerialNo,
        },
      },
    });
  }
  onDelete($event: MouseEvent, id: number) {
    $event.stopPropagation();
    $event.preventDefault();
    this.lastSirDB.delete(id);
  }
}
