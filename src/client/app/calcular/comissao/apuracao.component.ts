import { Component, OnInit, ElementRef, ViewChild } from '@angular/core';
import { ComissaoAtividade, ComissaoFuncionarioMes } from './comissao.model';
import { ComissaoService } from './comissao.service';
import { AtividadeService } from '../atividade/atividade.service';
import { ToastsManager } from 'ng2-toastr/ng2-toastr';
import { IKeyValuePair } from '../../shared/interfaces';
import { Subscription } from 'rxjs';
import { IUser, UserService } from '../../shared/user/user.service';
import { PaginationModule, ModalModule } from 'ng2-bootstrap/ng2-bootstrap';
import createNumberMask from 'text-mask-addons/dist/createNumberMask.js';
import * as _ from 'lodash';

@Component({
    moduleId: module.id,
    selector: 'apuracao-cmp',
    templateUrl: './apuracao.component.html',
})
export class ApuracaoComponent implements OnInit {

    public moneyMask: any = createNumberMask({ prefix: 'R$ ', includeThousandsSeparator: false, allowNegative: true, allowDecimal: true });

    @ViewChild('scrollMe') private myScrollContainer: ElementRef;
    private busy: Subscription;
    private modelName = 'Apuração de Comissão';

    private data: ComissaoAtividade[];
    private comissaoFuncionarioMes: ComissaoFuncionarioMes;
    private editId: number;
    private tipoAtividade: IKeyValuePair[];

    private mesFilter: number;
    private anoFilter: number;
    private responsavel: any;
    private responsavelList: any[];
    private isCalculista: boolean;
    private isAdminOrGerencial: boolean = false;
    private edit: boolean = false;
    private edited: boolean = false;
    private currentDate = new Date();

    constructor(private service: ComissaoService,
        private atividadeService: AtividadeService,
        private userService: UserService,
        private toastr: ToastsManager) { }

    ngOnInit() {
        this.busy = this.atividadeService.getResponsavel()
            .subscribe((data: any[]) => {
                this.responsavelList = data;
                this.userService
                    .getUser()
                    .subscribe(user => {
                        this.isCalculista = this.userService.isInRole('Calculista');
                        this.isAdminOrGerencial = this.userService.isInRole('Administrativo') || this.userService.isInRole('Gerencial');

                        if (this.isCalculista && !this.isAdminOrGerencial) {
                            this.responsavel = _.find(this.responsavelList, x => x.id === user.id);
                        }

                        this.filter();
                    });
            },
            error => this.toastr.error('Erro ao efetuar requisição!'));

        this.atividadeService.getTipoAtividadeSelect()
            .subscribe(data => this.tipoAtividade = data);
    }

    submit() {
        var comissoes = _.map(this.data, item => {
            // Transforma o valor digitado em numero.
            item.valorAdicional = item.valorAdicionalAux
                ? parseFloat(item.valorAdicionalAux.replace(/[^0-9\.-]/g, ''))
                : 0;
            return item;
        });

        let uniqId = _.uniqBy(_.map(_.filter(this.data, f => f.comissaoFuncionarioMesId), x => x.comissaoFuncionarioMes), x => x.id);

        if (uniqId.length > 1) {
            this.toastr.error('Não é possível salvar alterações para mais de um funcionário ao mesmo tempo');
            return;
        }

        let model = new ComissaoFuncionarioMes({
            id: (this.comissaoFuncionarioMes ? this.comissaoFuncionarioMes.id : 0),
            mes: this.mesFilter,
            ano: this.anoFilter,
            comissaoAtividades: comissoes,
        });

        if (!model.id) {
            this.service.postApuracaoComissao(model)
                .subscribe(success => {
                    this.toastr.success('Comissões salvas com sucesso!');
                    this.filter(true);
                }, error => this.toastr.error('Erro ao salvar comissões!'));
        } else {
            this.service.putApuracaoComissao(model)
                .subscribe(success => {
                    this.toastr.success('Comissões salvas com sucesso!');
                    this.filter(true);
                }, error => this.toastr.error('Erro ao salvar comissões!'));
        }
    }

    filter(toBottom: boolean = false) {
        this.busy = this.service.getApuracaoComissao(this.mesFilter, this.anoFilter, this.responsavel ? this.responsavel.id : '')
            .subscribe(response => {

                let uniqComissao =
                    _.uniqBy(_.map(_.filter(response, f => f.comissaoFuncionarioMesId), x => x.comissaoFuncionarioMes), x => x.id);

                if (uniqComissao.length === 1) {
                    this.comissaoFuncionarioMes = uniqComissao[0];
                } else {
                    this.comissaoFuncionarioMes = null;
                }

                // Indica se foi filtrado com todos os parâmetros
                this.edit = this.mesFilter
                    && this.anoFilter
                    && this.responsavel
                    && this.responsavel.id
                    && uniqComissao.length < 2
                    && (!this.comissaoFuncionarioMes || this.comissaoFuncionarioMes.status === 0);
                this.edited = false;

                this.data = _.map(response, item => {
                    item.valorFinal = item.valorFinal ? item.valorFinal : item.valorBase;
                    item.valorAdicionalAux = item.valorAdicional ? item.valorAdicional.toFixed(2) : '';
                    return item;
                });

                if (toBottom) {
                    this.scrollToBottom();
                }
            },
            error => {
                this.edit = false;
                this.edited = false;
                this.comissaoFuncionarioMes = null;
                alert(error);
                console.log(error);
                this.toastr.warning('Erro ao efetuar operação.');
            });
    }

    allowEdit() {
        return this.edit && this.isAdminOrGerencial;
    }

    getValorTotal() {
        return _.sumBy(this.data, x => x.valorFinal).toFixed(2);
    }

    onChangeResponsavel(user: any) {
        this.responsavel = user;
    }

    onCanculaValorFinal(item: ComissaoAtividade) {
        item.valorFinal = item.valorBase + (item.valorAdicionalAux ? parseFloat(item.valorAdicionalAux.replace(/[^0-9\.-]/g, '')) : 0);
        this.edited = true;
    }

    canClosePayment() {
        var dataFechamentoOk = false;
        // Se o mês filtrado é maior ou igual o atual, só permite fechar se estver após o d.
        if (this.mesFilter - 2 === this.currentDate.getMonth()) {
            dataFechamentoOk = this.currentDate.getDate() >= 3;
        } else if (this.mesFilter - 1 < this.currentDate.getMonth()) {
            dataFechamentoOk = true;
        }

        return this.isAdminOrGerencial
            && this.comissaoFuncionarioMes
            && this.comissaoFuncionarioMes.status === 0
            && true;//dataFechamentoOk;
    }

    closedPayment() {
        return this.comissaoFuncionarioMes && this.comissaoFuncionarioMes.status === 1;
    }

    closePayment() {
        if (this.comissaoFuncionarioMes) {
            this.service.postClosePayment(this.comissaoFuncionarioMes.id)
                .subscribe(success => {
                    this.toastr.success('Comissão fechada com sucesso!');
                    this.filter(true);
                }, error => this.toastr.error('Erro ao fechar comissões!'));
        } else {
            this.toastr.error('Não foi possível executar o fechamento de comissões!');
        }
    }

    scrollToBottom(): void {
        try {
            this.myScrollContainer.nativeElement.scrollTop = this.myScrollContainer.nativeElement.scrollHeight;
        } catch (err) {
            console.log('cannot navigate to bottom');
        }
    }
}
