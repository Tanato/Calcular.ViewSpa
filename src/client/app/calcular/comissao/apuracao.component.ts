import { Component, OnInit } from '@angular/core';
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

    private busy: Subscription;
    private modelName = 'Apuração de Comissão';

    private data: ComissaoAtividade[];
    private editId: number;
    private tipoAtividade: IKeyValuePair[];

    private mesFilter: number;
    private anoFilter: number;
    private responsavel: any;
    private responsavelList: any[];
    private isCalculista: boolean;
    private isAdminOrGerencial: boolean = false;
    private edit: boolean = false;

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

        let model = new ComissaoFuncionarioMes({
            mes: this.mesFilter,
            ano: this.anoFilter,
            comissaoAtividades: comissoes,
        });

        this.service.postApuracaoComissao(model)
            .subscribe(x => {
                this.toastr.success('Atividade adicionada com sucesso!');
                this.filter();
            });
    }

    filter() {
        this.busy = this.service.getApuracaoComissao(this.mesFilter, this.anoFilter, this.responsavel ? this.responsavel.id : '')
            .subscribe(response => {
                this.data = _.map(response, item => {
                    item.valorFinal = item.valorFinal ? item.valorFinal : item.valorBase;
                    item.valorAdicionalAux = item.valorAdicional ? item.valorAdicional.toFixed(2) : '';
                    return item;
                });
            },
            error => {
                alert(error);
                console.log(error);
                this.toastr.warning('Erro ao efetuar operação.');
            });
    }

    getValorTotal(){
        return _.sumBy(this.data, x => x.valorFinal).toFixed(2);
    }

    onChangeResponsavel(user: any) {
        this.responsavel = user;
    }

    onCanculaValorFinal(item: ComissaoAtividade) {
        item.valorFinal = item.valorBase + (item.valorAdicionalAux ? parseFloat(item.valorAdicionalAux.replace(/[^0-9\.-]/g, '')) : 0);
    }

    // onPageChange(page: any, data: Array<any> = this.data) {
    //     let start = (page.page - 1) * page.itemsPerPage;
    //     let end = page.itemsPerPage > -1 ? (start + page.itemsPerPage) : data.length;
    //     this.rows = data.slice(start, end);
    // }
}
