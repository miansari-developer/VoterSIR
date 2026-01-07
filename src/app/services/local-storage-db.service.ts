export interface BaseEntity {
  id: number;
  [key: string]: any;
}

export class LocalStorageDB<T extends BaseEntity> {
  private data: T[] = [];
  private idKey: string;

  constructor(private storageKey: string, private uniqueKeys: string[] = []) {
    this.idKey = `${storageKey}_last_id`;
    this.data = this.load();
  }

  private checkUnique<K extends keyof T>(
  item: Pick<T, K>,
  ignoreId: number | null = null
): number {
  for (const key of this.uniqueKeys) {
    if (!(key in item)) return -1;

    const index = this.data.findIndex(
      (record) =>
        record[key] === (item as any)[key] &&
        record.id !== ignoreId
    );

    if (index !== -1) {
      return index;
    }
  }

  return -1;
}

insert(item: Omit<T, 'id'>): T {
  const duplicateIndex = this.checkUnique(item);

  // UPDATE (duplicate found)
  if (duplicateIndex !== -1) {
    const existing = this.data[duplicateIndex];

    const updated = {
      ...existing,
      ...item,
      id: existing.id, // preserve id
    } as T;

    this.data[duplicateIndex] = updated;
    this.save();
    return updated;
  }

  // INSERT (no duplicate)
  const newItem = {
    id: this.generateId(),
    ...item,
  } as T;

  this.data.push(newItem);
  this.save();
  return newItem;
}

  private load(): T[] {
    const stored = localStorage.getItem(this.storageKey);
    return stored ? JSON.parse(stored) : [];
  }

  private save(): void {
    localStorage.setItem(this.storageKey, JSON.stringify(this.data));
  }

  private generateId(): number {
    const lastId = Number(localStorage.getItem(this.idKey)) || 0;
    const newId = lastId + 1;
    localStorage.setItem(this.idKey, String(newId));
    return newId;
  }

  getAll(reverse = true): T[] {
    const copy = [...this.data];
    return reverse ? copy.reverse() : copy;
  }

  // private checkUnique<K extends keyof T>(
  //   item: Pick<T, K>,
  //   ignoreId: number | null = null
  // ): boolean {
  //   for (const key of this.uniqueKeys) {
  //     if (!(key in item)) return false;

  //     const duplicate = this.data.some(
  //       (record) => record[key] === (item as any)[key] && record.id !== ignoreId
  //     );

  //     if (duplicate) return false;
  //   }
  //   return true;
  // }


  // insert(item: Omit<T, 'id'>): T | null {
  //   if (!this.checkUnique(item)) return null;

  //   const newItem = {
  //     id: this.generateId(),
  //     ...item,
  //   } as T;

  //   this.data.push(newItem);
  //   this.save();
  //   return newItem;
  // }

  edit(id: number, updates: Partial<T>): T {
    const index = this.data.findIndex((item) => item.id === id);
    if (index === -1) throw new Error('Item not found');

    const updatedItem = { ...this.data[index], ...updates };

    if (!this.checkUnique(updatedItem, id)) {
      throw new Error('Unique constraint violated');
    }

    this.data[index] = updatedItem;
    this.save();
    return updatedItem;
  }

  remove(id: number): void {
    const index = this.data.findIndex((item) => item.id === id);
    if (index === -1) throw new Error('Item not found');

    this.data.splice(index, 1);
    this.save();
  }

  getById(id: number): T | null {
    return this.data.find((item) => item.id === id) || null;
  }

  search(query: string): T[] {
    const q = query.toLowerCase();

    return this.data.filter((item) =>
      Object.entries(item).some(([key, value]) => {
        if (key === 'id' || value == null) return false;
        return String(value).toLowerCase().includes(q);
      })
    );
  }

  clear(): void {
    this.data = [];
    localStorage.removeItem(this.idKey);
    this.save();
  }
}
