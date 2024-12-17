import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class DiscCategoryService {

order: string = 'reset';

constructor() { }

  getOrder(): string {
    if(localStorage.getItem('order')) {
      return localStorage.getItem('order')!;
    }
    return this.order;
  }

  setOrder(order: string) {
    this.order = order;
    if(this.order != 'reset') {
      localStorage.setItem('order', this.order);
    }
  }
}