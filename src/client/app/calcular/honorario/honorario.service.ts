import { Injectable } from '@angular/core';
import { Response, Http } from '@angular/http';
import 'rxjs/add/operator/map';
import 'rxjs/add/operator/catch';
import { Observable } from 'rxjs/Rx';
import { Config } from '../../shared/config/env.config';
import { Processo } from '../processo/processo.model';
import { Honorario } from './honorario.model';

@Injectable()
export class HonorarioService {

    private url: string = Config.API + 'honorario';

    constructor(private http: Http) { }

    postHonorario(honorario: Honorario) {
        return this.http.post(this.url, honorario)
            .map(this.handleResult)
            .catch(this.handleError);
    }

    putProcesso(processo: Processo) {
        return this.http
            .put(this.url, JSON.stringify(processo))
            .map(this.handleResult)
            .catch(this.handleError);
    }

    getParteSelect() {
        return this.http.get(this.url + '/parte')
            .map(this.handleResult)
            .catch(this.handleError);
    }

    deleteHonorario(id: number) {
        return this.http.delete(this.url + '/' + id)
            .map(this.handleResult)
            .catch(this.handleError);
    }

    getRegistroSelect() {
        return this.http.get(this.url + '/registro')
            .map(this.handleResult)
            .catch(this.handleError);
    }

    getTipoPagamentoSelect(registro: number) {
        return this.http.get(this.url + '/tipopagamento/' + registro)
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

