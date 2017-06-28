import { Component, OnInit } from '@angular/core';
import { Processo } from '../processo/processo.model';
import { Servico } from './servico.model';
import { ProcessoService } from '../processo/processo.service';
import { AtividadeService } from '../atividade/atividade.service';
import { ServicoService } from './servico.service';
import { Observable } from 'rxjs/Observable';
import { ActivatedRoute, Router } from '@angular/router';
import { IKeyValuePair } from '../../shared/interfaces';
import { ToastsManager } from 'ng2-toastr/ng2-toastr';
import { Subscription } from 'rxjs';
import * as _ from 'lodash';

@Component({
    moduleId: module.id,
    selector: 'historicoServicoDetail-cmp',
    templateUrl: './historico.detail.component.html'
})
export class ServicoHistoricoDetailComponent implements OnInit {

    private wtoInput: NodeJS.Timer;

    private modelName = 'Histórico de Serviços';

    private model: Processo = new Processo;
    private parte: IKeyValuePair[];
    private faseProcesso: IKeyValuePair[];
    private local: any[];
    private tiposExecucao: IKeyValuePair[];
    private status: IKeyValuePair[];

    private servicos: Servico[];

    private advogado: any[];
    private advogadoInit: IKeyValuePair[];

    private blockEdit: boolean = true;

    private id: Observable<string>;
    private busy: Subscription;
    private disableChangeNumero: boolean = false;

    constructor(private service: ServicoService,
        private processoService: ProcessoService,
        private atividadeService: AtividadeService,
        private route: ActivatedRoute,
        private router: Router,
        private toastr: ToastsManager) { }

    advogados = (startsWith: string): Observable<any[]> => {
        var result = this.processoService.getAdvogadoSelect(startsWith);

        result.subscribe(data => {
            this.advogado = data;
        });
        return result;
    }

    vara = (startsWith: string): Observable<any[]> => {
        return this.processoService.getVaraSelect(startsWith);
    }

    indicacao = (startsWith: string): Observable<any[]> => {
        return this.processoService.getIndicacaoSelect(startsWith);
    }

    perito = (startsWith: string): Observable<any[]> => {
        return this.processoService.getPeritoSelect(startsWith);
    }

    autor = (startsWith: string): Observable<any[]> => {
        return this.processoService.getAutorSelect(startsWith);
    }

    reu = (startsWith: string): Observable<any[]> => {
        return this.processoService.getReuSelect(startsWith);
    }

    clearNumero() {
        this.model.numero = '';
    }

    ngOnInit() {
        this.processoService.getParteSelect()
            .subscribe((data: IKeyValuePair[]) => this.parte = data, error => this.toastr.error('Erro ao efetuar requisição!'));

        this.processoService.getLocalSelect()
            .subscribe((data: any[]) => this.local = data, error => this.toastr.error('Erro ao efetuar requisição!'));

        this.processoService.getFaseProcessoSelect()
            .subscribe((data: IKeyValuePair[]) => this.faseProcesso = data, error => this.toastr.error('Erro ao efetuar requisição!'));

        this.atividadeService.getTipoExecucao()
            .subscribe((data: IKeyValuePair[]) => this.tiposExecucao = data, error => this.toastr.error('Erro ao efetuar requisição!'));

        this.service.getStatus()
            .subscribe((data: IKeyValuePair[]) => this.status = data, error => this.toastr.error('Erro ao efetuar requisição!'));

        this.id = this.route.params.map(params => params['id']);

        this.id.subscribe(id => {
            if (id) {
                this.blockEdit = true;
                this.busy = this.processoService.getProcessoById(id)
                    .subscribe((data: Processo) => {
                        this.model = data;
                    });

                this.service.getServicosByProcessoId(id)
                    .subscribe((data: Servico[]) => {
                        this.servicos = data;
                    });
            }
        });
    }

    statusDescription(id: number): string {
        if (this.status) {
            var a = _.find(this.status, ['key', id]);
            return a ? a.value : null;
        }
        return null;
    }

    tipoExecucaoDescription(id: number): string {
        if (this.tiposExecucao) {
            var a = _.find(this.tiposExecucao, ['key', id]);
            return a ? a.value : null;
        }
        return null;
    }

    onCancel() {
        let link = ['calcular/servico/historico'];
        this.router.navigate(link);
    }

    refreshValueAdvogado(value: IKeyValuePair): void {
        this.model.advogado = _.find(this.advogado, (x) => x.id === value.key);
        this.model.advogadoId = value.key;
    }
}
