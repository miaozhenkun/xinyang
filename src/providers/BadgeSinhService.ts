import { Injectable } from '@angular/core';
import 'rxjs/add/operator/toPromise';
@Injectable()
export class BadgeSinhService {
  badge: number = 0;
  constructor() {
  }
  getBadge(): number {
    return this.badge;
  }
  setBadge(badge): number {
    this.badge = badge;
    return this.badge;
  }
  incrementBadge() {
    this.badge++
    return
  }
  decreaseBadge() {
    if (this.badge > 0) {
      this.badge--
    }
    return;
  }
}
