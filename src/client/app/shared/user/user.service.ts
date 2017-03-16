import { Injectable } from '@angular/core';
import { Response, Http } from '@angular/http';
import { Cookie } from 'ng2-cookies/ng2-cookies';

export class IUser {
    id: string;
    name: string;
    roles: string[];
}

import 'rxjs/add/operator/map';
import 'rxjs/add/operator/catch';
import { Observable } from 'rxjs/Rx';

import { Config } from '../../shared/config/env.config';

@Injectable()
export class UserService {

    private user: IUser;
    private observable: Observable<IUser>;

    private url: string = Config.API + 'account';

    constructor(private http: Http) { }

    getUser(): Observable<IUser> {
        if (this.user) {
            return Observable.of(this.user);
        } else if (this.observable) {
            return this.observable;
        };

        this.observable = this.http.get(this.url + '/loggeduser')
            .map(response => {
                this.observable = null;
                this.user = response.json();

                return this.user;
            })
            .catch(this.handleError)
            .share();

        return this.observable;
    }

    logoutUser() {
        this.user = null;
        this.observable = null;
    }

    handleResult(res: Response) {
        let body = res.json();
        return body || {};
    }

    handleError(error: any) {
        console.error(error._body ? error._body : error);
        return Observable.throw(error.json().Error || 'Server error');
    }

    clearCookie(observable: Observable<Response>): Observable<Response> {
        return observable.finally(() => Cookie.deleteAll());
    }

    isInRole(role: string) {
        return this.user
            && this.user.roles
            && this.user.roles.indexOf(role) !== -1;
    }
}

