import { Injectable } from '@angular/core';
import { Response, Http, URLSearchParams } from '@angular/http';

import 'rxjs/add/operator/map';
import 'rxjs/add/operator/catch';
import { Observable } from 'rxjs/Rx';

import { Config } from '../../shared/config/env.config';

import { Cliente } from './cliente.model';

@Injectable()
export class ClienteService {

    private url: string = Config.API + 'cliente';

    constructor(private http: Http) { }

    getClientes(filterText: string): Observable<Cliente[]> {
        let params: URLSearchParams = new URLSearchParams();
            params.set('filter', filterText);

        return this.http.get(this.url, { search: params  })
            .map((res: Response) => res.json())
            .catch(this.handleError);
    }

    handleError(error: any) {
        console.error(error);
        return Observable.throw(error.json().Error || 'Server error');
    }

}

