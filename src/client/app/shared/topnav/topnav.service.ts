import { Injectable } from '@angular/core';
import { Response, Http } from '@angular/http';
import { Cookie } from 'ng2-cookies/ng2-cookies';

import 'rxjs/add/operator/map';
import 'rxjs/add/operator/catch';
import { Observable } from 'rxjs/Rx';

@Injectable()
export class TopnavService {

    private url: string = 'http://localhost:5000/api/account';

    constructor(private http: Http) { }

    getLoggedUser() {
        return this.http.get(this.url + '/loggeduser')
            .map(res => res.json().result)
            .catch(this.handleError);
    }

    logout() {
        return this.clearCookie(this.http.get(this.url + '/logout')
            .catch(this.handleError));
    }

    handleError(error: any) {
        console.error(error);
        return Observable.throw(error.json().Error || 'Server error');
    }

    clearCookie(observable: Observable<Response>): Observable<Response> {
        return observable.finally(() => Cookie.deleteAll());
    }
}

