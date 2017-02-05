import { Injectable } from '@angular/core';
import { Response, Http, URLSearchParams } from '@angular/http';
import 'rxjs/add/operator/map';
import 'rxjs/add/operator/catch';
import { Observable } from 'rxjs/Rx';
import { Config } from '../../shared/config/env.config';
import { Evento } from './evento.model';

@Injectable()
export class EventoService {

    private url: string = Config.API + 'evento';

    constructor(private http: Http) { }

    getEventos(filterText: string): Observable<Evento[]> {
        let params: URLSearchParams = new URLSearchParams();
        params.set('filter', filterText);

        return this.http.get(this.url, { search: params })
            .map((res: Response) => res.json())
            .catch(this.handleError);
    }

    getAniversarios(): Observable<any[]> {
        return this.http.get(this.url + '/aniversarios')
            .map((res: Response) => res.json())
            .catch(this.handleError);
    }

    putEvento(evento: Evento) {
        return this.http
            .put(this.url, JSON.stringify(evento))
            .map(this.handleResult)
            .catch(this.handleError);
    }

    private handleResult(res: Response) {
        let body = res.json();
        return body || {};
    }

    private handleError(error: any) {
        console.error(error._body ? error._body : error);
        return Observable.throw(error.json().Error || 'Server error');
    }
}
