import { Injectable } from '@angular/core';
import { Subject } from 'rxjs';

export interface AlertMessage {
  message: string;
  class: string;
}

@Injectable()
export class AlertService {
  message = new Subject<AlertMessage>();

  /**
   * @ngdoc service
   * @name showAlert
   * @memberof AlertService
   * @param {object} obj data object
   *
   * @description
   *
   * This function is used to show bootstrap alert box.
   **/

  showAlert = (obj: any) => {
    this.message.next(obj);
  };
}
