import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class StorageService {

  setItem<T>(key: string, value: T, ttl: number = 3600000): void {
    const expireAt = Date.now() + ttl;
    const data = { value, expireAt };
    localStorage.setItem(key, JSON.stringify(data));
  }

  getItem<T>(key: string): T | null {
    const item = localStorage.getItem(key);
    if (!item) return null;

    const { value, expireAt } = JSON.parse(item);
    if (Date.now() > expireAt) {
      this.removeItem(key);
      return null;
    }
    return value;
  }

  removeItem(key: string): void {
    localStorage.removeItem(key);
  }

  clear(): void {
    localStorage.clear();
  }

}
