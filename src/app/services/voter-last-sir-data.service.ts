import { Injectable, signal } from '@angular/core';
import { LocalStorageDB, BaseEntity } from './local-storage-db.service';
import { VoterLastSIRRecord } from '../models/last-sir-api-response';


@Injectable({
  providedIn: 'root',
})
export class VotersLastSirService {
  private db = new LocalStorageDB<VoterLastSIRRecord>('voters-last-sir-records', []);
  votersLastSirList = signal<VoterLastSIRRecord[]>([]);

  constructor() {
    this.votersLastSirList.set(this.getAll());
  }
  
  getAll() {
    return this.db.getAll();
  }

  add(voter: Omit<VoterLastSIRRecord, 'id'>) {
    console.log('inside add:', voter);
    const a = this.db.insert(voter);
    this.votersLastSirList.set(this.getAll());
    return a;
  }

  update(id: number, updates: Partial<VoterLastSIRRecord>) {
    const a = this.db.edit(id, updates);
    this.votersLastSirList.set(this.getAll());
    return a;
  }

  delete(id: number) {
    const a = this.db.remove(id);
    this.votersLastSirList.set(this.getAll());
    return a;
  }

  search(query: string) {
    const a = this.db.search(query);
    this.votersLastSirList.set(a);
    return a;
  }

  clear() {
    this.db.clear();
  }
}
