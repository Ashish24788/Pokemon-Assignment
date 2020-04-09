import { Injectable } from '@angular/core';
import { Observable, Subject } from 'rxjs';

export interface AlertMessage {
    message: string;
    class: string;
}

@Injectable()
export class AlertService {
    private message = new Subject<AlertMessage>();
    getAlert(): Observable<AlertMessage> {
        return this.message.asObservable();
    }
    showAlert = (obj: any) => {
        this.message.next(obj);
    }

}