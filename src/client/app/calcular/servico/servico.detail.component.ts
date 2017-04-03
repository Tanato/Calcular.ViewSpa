import { Component, OnInit } from '@angular/core';
import { Processo } from '../processo/processo.model';
import { ProcessoService } from '../processo/processo.service';
import { AtividadeService } from '../atividade/atividade.service';
import { Atividade } from '../atividade/atividade.model';
import { Servico } from './servico.model';
import { ServicoService } from './servico.service';
import { UserService } from '../../shared/user/user.service';
import { Observable } from 'rxjs/Observable';
import { ActivatedRoute, Router } from '@angular/router';
import { IKeyValuePair } from '../../shared/interfaces';
import { Subscription } from 'rxjs';
import createNumberMask from 'text-mask-addons/dist/createNumberMask.js';

import { ToastsManager } from 'ng2-toastr/ng2-toastr';
import * as _ from 'lodash';

@Component({
    moduleId: module.id,
    selector: 'servicodetail-cmp',
    templateUrl: './servico.detail.component.html'
})
export class ServicoDetailComponent implements OnInit {

    public moneyMask: any = createNumberMask({ prefix: 'R$ ', includeThousandsSeparator: false, allowNegative: true, allowDecimal: true });
    public wtoInput: NodeJS.Timer;

    public advogado: Observable<IKeyValuePair[]>;
    public advogadoInit: IKeyValuePair[];

    private modelName = 'Serviço';

    private model: Servico = new Servico;
    private atividade: Atividade = new Atividade;

    private parte: IKeyValuePair[];
    private tipoAtividade: IKeyValuePair[];
    private responsavel: any[];
    private tipoServico: IKeyValuePair[];
    private tiposExecucao: IKeyValuePair[];
    private status: IKeyValuePair[];
    private tipoImpressao: IKeyValuePair[];

    private formType: string = 'new';
    private blockEdit: boolean = true;

    private id: Observable<string>;
    private busy: Subscription;
    private save: Subscription;
    private valorAux: string;
    private isCalculista: boolean = false;

    private current = new Date();

    isNaN = (value: number) => {
        return isNaN(value);
    }

    processos = (startsWith: string): Observable<any[]> => {
        var result = this.processoService.getProcessosSelect(startsWith);
        return result;
    }

    constructor(public service: ServicoService,
        private processoService: ProcessoService,
        private atividadeService: AtividadeService,
        private route: ActivatedRoute,
        private router: Router,
        private toastr: ToastsManager,
        private userService: UserService) { }

    ngOnInit() {
        this.userService
            .getUser()
            .subscribe(user => {
                this.isCalculista = this.userService.isInRole('Calculista')
                    && !this.userService.isInRole('Administrativo')
                    && !this.userService.isInRole('Gerencial');
            });

        this.atividadeService.getTipoImpressao()
            .subscribe((data: IKeyValuePair[]) => this.tipoImpressao = data, error => this.toastr.error('Erro ao efetuar requisição!'));

        this.processoService.getParteSelect()
            .subscribe((data: IKeyValuePair[]) => this.parte = data, error => this.toastr.error('Erro ao efetuar requisição!'));

        this.atividadeService.getTipoAtividadeSelect()
            .subscribe((data: IKeyValuePair[]) => this.tipoAtividade = data, error => this.toastr.error('Erro ao efetuar requisição!'));

        this.service.getTipoServicoSelect()
            .subscribe((data: IKeyValuePair[]) => this.tipoServico = data, error => this.toastr.error('Erro ao efetuar requisição!'));

        this.atividadeService.getResponsavel()
            .subscribe((data: any[]) => this.responsavel = data, error => this.toastr.error('Erro ao efetuar requisição!'));

        this.atividadeService.getTipoExecucao()
            .subscribe((data: IKeyValuePair[]) => this.tiposExecucao = data, error => this.toastr.error('Erro ao efetuar requisição!'));

        this.service.getStatus()
            .subscribe((data: IKeyValuePair[]) => this.status = data, error => this.toastr.error('Erro ao efetuar requisição!'));

        this.id = this.route.params.map(params => params['id']);

        this.id.subscribe(id => {
            if (id) {
                this.formType = 'edit';
                this.busy = this.service.getServicoById(id)
                    .subscribe((data: Servico) => {
                        this.model = data;
                        this.model.entrada = data.entrada.slice(0, 10);
                        this.model.prazo = data.prazo ? data.prazo.slice(0, 10) : null;
                        this.model.saida = data.saida ? data.saida.slice(0, 10) : null;
                    });
            } else {
                this.blockEdit = false;
            }
        });
    }

    onSubmit() {
        if (this.formType === 'new' && !this.model.id) {
            this.save = this.service.postServico(this.model)
                .subscribe(data => {
                    this.model = data;
                    this.model.entrada = data.entrada.slice(0, 10);
                    this.model.prazo = data.prazo ? data.prazo.slice(0, 10) : null;
                    this.model.saida = data.saida ? data.saida.slice(0, 10) : null;
                    this.blockEdit = data.status !== 0 ? true : false;
                    this.toastr.success(this.modelName + ' adicionado com sucesso!');
                }, error => this.toastr.error(error ? error : 'Erro ao efetuar requisição!'));
        } else {
            this.save = this.service.putServico(this.model)
                .subscribe(data => {
                    this.model = data;
                    this.model.entrada = data.entrada.slice(0, 10);
                    this.model.prazo = data.prazo ? data.prazo.slice(0, 10) : null;
                    this.model.saida = data.saida ? data.saida.slice(0, 10) : null;
                    this.blockEdit = data.status !== 0 ? true : false;
                    this.toastr.success(this.modelName + ' atualizado com sucesso!');
                }, error => this.toastr.error(error ? error : 'Erro ao efetuar requisição!'));
        }
    }

    tipoImpressaoDescription(id: number): string {
        if (this.tipoImpressao) {
            var a = _.find(this.tipoImpressao, ['key', id]);
            return a ? a.value : null;
        }
        return null;
    }

    getMinSaida() {
        if (this.model && this.model.entrada) {
            return new Date(2016, 1, 1);

            // var entrada = new Date(this.model.entrada + 'T03:00:00Z');

            // // Se data atual é até dia 3, permite inserir fechamento para o mês anterior, caso contrário apenas mês atual.
            // var fechamento = new Date(this.current.getFullYear(), this.current.getMonth() + (this.current.getDate() <= 3 ? - 1 : 0), 1);

            // return _.max([entrada, fechamento]);
        } else {
            return this.current;
        }
    }

    onChangeResponsavel(user: any) {
        this.atividade.responsavelId = user.id;
        this.atividade.responsavel = user;
    }

    onChangeProcesso(processo: Processo) {
        this.model.processo = processo;
        this.model.processoId = processo.id;
    }

    addAtividade() {
        this.atividade.servicoId = this.model.id;
        this.atividade.valor = this.valorAux ? parseFloat(this.valorAux.replace(/[^0-9\.-]/g, '')) : null;
        this.valorAux = null;

        this.atividadeService.postAtividade(this.atividade)
            .subscribe(x => {
                this.onRefresh();
                this.atividade = new Atividade();
                this.toastr.success('Atividade adicionada com sucesso!');
            }, error => this.toastr.error('Erro ao efetuar requisição!'));
    }

    onDelete(id: number) {
        this.atividadeService.deleteAtividade(id)
            .subscribe(x => {
                this.toastr.success('Atividade excluída com sucesso!');
                this.onRefresh();
            }, error => this.toastr.error('Erro ao efetuar requisição!'));
    }

    cancelServico(id: number) {
        this.service.cancelServico(id)
            .subscribe(x => {
                this.toastr.success('Serviço cancelado com sucesso!');
                this.onRefresh();
            }, error => this.toastr.error('Erro ao efetuar requisição!'));
    }

    onRefresh() {
        this.service.getServicoById(this.model.id.toString())
            .subscribe((data: Servico) => {
                this.model = data;
                this.model.entrada = data.entrada.slice(0, 10);
                this.model.prazo = data.prazo ? data.prazo.slice(0, 10) : null;
                this.model.saida = data.saida ? data.saida.slice(0, 10) : null;
            }, error => this.toastr.error('Erro ao efetuar requisição!'));
    }

    onCancel() {
        this.id.subscribe(id => {
            if (id) {
                let link = 'calcular/servico/cadastro';
                this.router.navigateByUrl(link);
            } else {
                let link = 'calcular/servico/cadastro';
                this.router.navigateByUrl(link);
            }
        }, error => this.toastr.error('Erro ao efetuar requisição!'));
    }

    tipoExecucaoDescription(id: number): string {
        if (this.tiposExecucao) {
            var a = _.find(this.tiposExecucao, ['key', id]);
            return a ? a.value : null;
        }
        return null;
    }

    statusDescription(id: number): string {
        if (this.status) {
            var a = _.find(this.status, ['key', id]);
            return a ? a.value : null;
        }
        return null;
    }

    atividadesPendentes(): boolean {
        return _.some(this.model.atividades, x => x.tipoExecucao !== 1 && x.tipoExecucao !== 2 && x.tipoExecucao !== 3);
    }

    dateIso(date: any): string {
        if (date)
            return date + 'T00:00:00-03:00';
        return null;
    }

    print(): Boolean {
        let printContents: any, popupWin: any;
        printContents = document.getElementById('print-section').innerHTML;
        popupWin = window.open('', '_blank', 'top=0,left=0,height=100%,width=auto');
        popupWin.document.open();
        popupWin.document.write(`
        <html>
            <head>
                <style type="text/css">
                    body {
                        -webkit-print-color-adjust: exact;
                        font-family: "Open Sans", "Helvetica Neue", Helvetica, Arial, sans-serif;
                        font-size: 12px;
                    }
                    img{
                        -webkit-print-color-adjust:exact;
                        display:visible;
                    }
                    td, tr {
                        padding-top: 3px;
                        padding-bottom: 3px;
                    }
                </style>
            </head>
            <body onload="PrintDiv()">${printContents}</body>
            <script>
            function PrintDiv() {
                setTimeout(function() {
                    window.print();
                    window.close();
                }, 60);
            }
            </script>
        </html>`);
        popupWin.document.close();
        return false;
    }

    getParteDescription(): string {
        if (this.parte && this.model.processo && this.model.processo.parte !== null) {
            var parte = _.find(this.parte, x => x.key === this.model.processo.parte) 
            return parte ? parte.value : null;
        }
        return null;
    }
}
