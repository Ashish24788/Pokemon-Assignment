import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { Router } from '@angular/router';

@Injectable()
export class BaseService {
    private refreshing: boolean = false;
    private refreshTokenString: String;
    private intervalArray: any;

    constructor(
        private http: HttpClient,
        private router: Router
    ) {
        this.intervalArray = [];
    }
    request(method = '', url = '', data: any = '', token: any = '', options: any = '') {
        if (method == 'POST') {
            return this.http.post(url, data)
        } else if (method == 'POST_FILE') {
            return this.http.post(url, data)
        } else if (method == 'GET') {
            return this.http.get(url)
        } else if (method == 'GET_FILE') {
            return this.http.get(url)
        } else if (method == 'DELETE') {
            return this.http.delete(url)
        } else if (method == 'PUT') {
            return this.http.put(url, data)
        } else if (method == 'S3FILEPOST') {

            return this.http.post(url, data)
        }
    }
    get(url, headers = null) {
        return this.request('GET', url, '');
    }

    post(url = '', data: any = '', headers: any = '') {

        return this.request('POST', url, data, headers);
    }
}



