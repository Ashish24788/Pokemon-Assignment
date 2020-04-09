import { Injectable } from '@angular/core';
import { Observable, Subject } from 'rxjs';

export interface AlertMessage {
    message: string;
    class: string;
}

@Injectable()
export class AlertService {
    message = new Subject<AlertMessage>();
        
    showAlert = (obj: any) => {
        this.message.next(obj);
    }

}