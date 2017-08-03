import { Injectable } from '@angular/core';
import { Response, Http, URLSearchParams } from '@angular/http';
import 'rxjs/add/operator/map';
import 'rxjs/add/operator/catch';
import { Observable } from 'rxjs/Rx';
import { Config } from '../../shared/config/env.config';

import { CustoProcesso, ProdutividadeColaborador } from './report.model';

@Injectable()
export class ReportService {

    private url: string = Config.API + 'report';

    constructor(private http: Http) { }

    getCUstoProcesso(): Observable<CustoProcesso[]> {
        return this.http.get(this.url + '/custoprocesso')
            .map((res: Response) => res.json())
            .catch(this.handleError);
    }

    getProdutividadeColaborador(data: Date, quantidadeMesesFilter: number): Observable<ProdutividadeColaborador> {
        let params: URLSearchParams = new URLSearchParams();
        params.set('dataFim', data.toISOString());
        params.set('quantidadeMeses', quantidadeMesesFilter.toString());

        return this.http.get(this.url + '/produtividadecolaborador', { search: params })
            .map((res: Response) => res.json())
            .catch(this.handleError);
    }

    getHonorarios(data: Date, quantidadeMesesFilter: number): Observable<any> {
        let params: URLSearchParams = new URLSearchParams();
        params.set('dataFim', data.toISOString());
        params.set('quantidadeMeses', quantidadeMesesFilter.toString());

        return this.http.get(this.url + '/honorarios', { search: params })
            .map((res: Response) => res.json())
            .catch(this.handleError);
    }

    getTipoProcesso(data: Date, quantidadeMesesFilter: number): Observable<any> {
        let params: URLSearchParams = new URLSearchParams();
        params.set('dataFim', data.toISOString());
        params.set('quantidadeMeses', quantidadeMesesFilter.toString());

        return this.http.get(this.url + '/tipoprocesso', { search: params })
            .map((res: Response) => res.json())
            .catch(this.handleError);
    }

    private handleResult(res: Response) {
        let body = res.json();
        return body || {};
    }

    private handleError(error: any) {
        console.error(error._body ? error._body : error);
        return Observable.throw(error._body ? error._body : error.json().Error || 'Server error');
    }
}
