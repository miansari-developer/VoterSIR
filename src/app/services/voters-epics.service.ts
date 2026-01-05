import { Injectable, signal } from '@angular/core';
import { LocalStorageDB, BaseEntity } from './local-storage-db.service';

export interface VoterEpic extends BaseEntity {
  epic: string;
  name: string;
  stateCode: string;
  stateName: string;
}

@Injectable({
  providedIn: 'root',
})
export class VotersEpicsService {
  private db = new LocalStorageDB<VoterEpic>('voters-epics', ['epic']);
  voterEpicList = signal<VoterEpic[]>([]);

  constructor() {
    this.voterEpicList.set(this.getAll());
  }
  getAll() {
    return this.db.getAll();
  }

  add(voter: Omit<VoterEpic, 'id'>) {
    console.log('inside add:', voter);
    const a = this.db.insert(voter);
    this.voterEpicList.set(this.getAll());
    return a;
  }

  update(id: number, updates: Partial<VoterEpic>) {
    const a = this.db.edit(id, updates);
    this.voterEpicList.set(this.getAll());
    return a;
  }

  delete(id: number) {
    const a = this.db.remove(id);
    this.voterEpicList.set(this.getAll());
    return a;
  }

  search(query: string) {
    const a = this.db.search(query);
    this.voterEpicList.set(a);
    return a;
  }

  clear() {
    this.db.clear();
  }
}
