import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class DiscCategoryService {

private order: string = 'reset';

constructor() { }

  getOrder(): string {
    return this.order;
  }

  setOrder(order: string) {
    this.order = order;
  }
}