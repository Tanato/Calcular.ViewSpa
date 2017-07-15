import { Injectable } from '@angular/core';
import { Response, Http, URLSearchParams } from '@angular/http';

import { IKeyValuePair } from '../../shared/interfaces';

import 'rxjs/add/operator/map';
import 'rxjs/add/operator/catch';
import { Observable } from 'rxjs/Rx';

import { Config } from '../../shared/config/env.config';

import { Processo, ProcessoDetalhe, FaseProcesso } from './processo.model';

@Injectable()
export class ProcessoService {

    private url: string = Config.API + 'processo';
    private urlCliente: string = Config.API + 'cliente';
    private urlUser: string = Config.API + 'user';
    private urlFaseProcesso: string = Config.API + 'faseprocesso';

    constructor(private http: Http) { }

    postProcesso(processo: Processo) {
        return this.http.post(this.url, processo)
            .map(this.handleResult)
            .catch(this.handleError);
    }

    postProcessoDetalhes(processoDetalhe: ProcessoDetalhe) {
        return this.http.post(this.url + '/detalhe', processoDetalhe)
            .catch(this.handleError);
    }

    putProcesso(processo: Processo) {
        return this.http
            .put(this.url, JSON.stringify(processo))
            .map(this.handleResult)
            .catch(this.handleError);
    }

    getProcessos(filterText: string): Observable<Processo[]> {
        let params: URLSearchParams = new URLSearchParams();
        params.set('filter', filterText);

        return this.http.get(this.url, { search: params })
            .map((res: Response) => res.json())
            .catch(this.handleError);
    }

    postValorCausa(processoId: number, valorCausa: number) {
        let params: URLSearchParams = new URLSearchParams();
        params.set('processoId', processoId.toString());
        params.set('valorCausa', valorCausa.toString());

        return this.http.post(this.url + '/valorCausa', null, { search: params })
            .catch(this.handleError);
    }

    getProcessosPaged(filterText: string, page: number, itemsPerPage: number): Observable<any> {
        let params: URLSearchParams = new URLSearchParams();
        params.set('filter', filterText);
        params.set('page', page.toString());
        params.set('itemsPerPage', itemsPerPage.toString());

        return this.http.get(this.url + '/paged', { search: params })
            .map((res: Response) => res.json())
            .catch(this.handleError);
    }

    getProcessosSelect(numero: string): Observable<Processo[]> {
        let params: URLSearchParams = new URLSearchParams();
        params.set('filter', numero);

        return this.http.get(this.url + '/numero', { search: params })
            .map((res: Response) => res.json())
            .catch(this.handleError);
    }

    getProcessoById(id: string): Observable<Processo> {
        return this.http.get(this.url + '/' + id)
            .map(this.handleResult)
            .catch(this.handleError);
    }

    getParteSelect() {
        return this.http.get(this.url + '/parte')
            .map(this.handleResult)
            .catch(this.handleError);
    }

    deleteProcesso(id: number) {
        return this.http.delete(this.url + '/' + id)
            .map(this.handleResult)
            .catch(this.handleError);
    }

    getLocalSelect() {
        return this.http.get(this.url + '/local')
            .map(this.handleLocalResult)
            .catch(this.handleError);
    }

    getAdvogadoSelect(filter: string = ''): Observable<any[]> {
        let params: URLSearchParams = new URLSearchParams();
        params.set('filter', filter);

        return this.http.get(this.urlCliente + '/select', { search: params })
            .map(this.handleResult)
            .catch(this.handleError);
    }

    getAdvogadoSelectById(id: number): Observable<IKeyValuePair> {
        return this.http.get(this.urlCliente + '/select/' + id)
            .map(this.handleResult)
            .catch(this.handleError);
    }

    getUserSelect(filter: string = ''): Observable<IKeyValuePair[]> {
        let params: URLSearchParams = new URLSearchParams();
        params.set('filter', filter);

        return this.http.get(this.urlUser + '/select', { search: params })
            .map(this.handleResult)
            .catch(this.handleError);
    }

    getUserSelectById(id: string): Observable<IKeyValuePair> {
        return this.http.get(this.urlUser + '/select/' + id)
            .map(this.handleResult)
            .catch(this.handleError);
    }

    getVaraSelect(filterText: string = ''): Observable<string[]> {
        let params: URLSearchParams = new URLSearchParams();
        params.set('filter', filterText);

        return this.http.get(this.url + '/vara', { search: params })
            .map(this.handleResult)
            .catch(this.handleError);
    }

    getIndicacaoSelect(filterText: string = ''): Observable<string[]> {
        let params: URLSearchParams = new URLSearchParams();
        params.set('filter', filterText);

        return this.http.get(this.url + '/indicacao', { search: params })
            .map(this.handleResult)
            .catch(this.handleError);
    }

    getPeritoSelect(filterText: string = ''): Observable<string[]> {
        let params: URLSearchParams = new URLSearchParams();
        params.set('filter', filterText);

        return this.http.get(this.url + '/perito', { search: params })
            .map(this.handleResult)
            .catch(this.handleError);
    }

    getAutorSelect(filterText: string = ''): Observable<string[]> {
        let params: URLSearchParams = new URLSearchParams();
        params.set('filter', filterText);

        return this.http.get(this.url + '/autor', { search: params })
            .map(this.handleResult)
            .catch(this.handleError);
    }

    getReuSelect(filterText: string = ''): Observable<string[]> {
        let params: URLSearchParams = new URLSearchParams();
        params.set('filter', filterText);

        return this.http.get(this.url + '/reu', { search: params })
            .map(this.handleResult)
            .catch(this.handleError);
    }

    postFaseProcesso(faseProcesso: string) {
        var model = new FaseProcesso();
        model.nome = faseProcesso;

        return this.http.post(this.urlFaseProcesso, model)
            .catch(this.handleError);
    }

    deleteFaseProcesso(id: number) {
        return this.http.delete(this.urlFaseProcesso + '/' + id)
            .map(this.handleResult)
            .catch(this.handleError);
    }

    getFaseProcesso() {
        return this.http.get(this.urlFaseProcesso)
            .map(this.handleResult)
            .catch(this.handleError);
    }

    getFaseProcessoSelect(): Observable<IKeyValuePair[]> {
        return this.http.get(this.urlFaseProcesso + '/select')
            .map(this.handleResult)
            .catch(this.handleError);
    }

    private handleResult(res: Response) {
        let body = res.json();
        return body || {};
    }

    private handleLocalResult(res: Response) {
        let body = res.json();
        if (body) {
            body.forEach((element: any) => {
                switch (element.key) {
                    case 0:
                        element.mask = [/\d/, /\d/, /\d/, /\d/, /\d/, /\d/, '-', /\d/, /\d/, '.',
                        /\d/, /\d/, /\d/, /\d/, '.', /\d/, '.', /\d/, /\d/, '.', /\d/, /\d/, /\d/, /\d/];
                        break;
                    case 1:
                        element.mask = [/\d/, /\d/, /\d/, /\d/, /\d/, /\d/, /\d/, '-', /\d/, /\d/, '.',
                            /\d/, /\d/, /\d/, /\d/, '.', /\d/, /\d/, /\d/, '.', /\d/, /\d/, /\d/, /\d/];
                        break;
                    case 2:
                        element.mask = [/\d/, /\d/, /\d/, /\d/, /\d/, /\d/, /\d/, '-', /\d/, /\d/, '.',
                            /\d/, /\d/, /\d/, /\d/, '.', /\d/, '.', /\d/, /\d/, '.', /\d/, /\d/, /\d/, /\d/];
                        break;
                    case 3:
                        element.mask = null;
                        break;
                }
            });
        }
        return body;
    }


    private handleError(error: any) {
        return Observable.throw(error._body || 'Server error');
    }
}
