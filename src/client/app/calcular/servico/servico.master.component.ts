import { Component, OnInit } from '@angular/core';
import { ServicoService } from './servico.service';
import { Servico } from './servico.model';
import { ProcessoService } from '../processo/processo.service';
import { AtividadeService } from '../atividade/atividade.service';

import { ToastsManager } from 'ng2-toastr/ng2-toastr';
import { Subscription } from 'rxjs';
import { IKeyValuePair } from '../../shared/interfaces';
import * as _ from 'lodash';

@Component({
    moduleId: module.id,
    selector: 'servicomaster-cmp',
    templateUrl: './servico.master.component.html',
})
export class ServicoMasterComponent implements OnInit {

    private busy: Subscription;
    private data: Servico[];
    private rows: Servico[];

    private totalItems: number = 0;
    private currentPage: number = 1;
    private itemsPerPage: number = 50;

    private filterText: string = '';
    private editId: number;
    private status: IKeyValuePair[];
    private tipoImpressao: IKeyValuePair[];
    private all: boolean;

    constructor(private service: ServicoService,
        private processoService: ProcessoService,
        private atividadeService: AtividadeService,
        private toastr: ToastsManager) { }

    ngOnInit() {
        this.atividadeService.getTipoImpressao()
            .subscribe((data: IKeyValuePair[]) => this.tipoImpressao = data);

        this.service.getStatus()
            .subscribe((data: IKeyValuePair[]) => this.status = data, error => this.toastr.error('Erro ao efetuar requisição!'));

        this.filter();
    }

    filter() {
        this.busy = this.service.getServicos(this.filterText, this.all)
            .subscribe(response => {
                this.data = response;
                this.totalItems = this.data.length;
                this.onPageChange({ page: this.currentPage, itemsPerPage: this.itemsPerPage });
            },
            error => {
                alert(error);
                console.log(error);
                this.toastr.warning('Erro ao efetuar operação. Tente novamente');
            });
    }

    statusDescription(id: number): string {
        if (this.status) {
            var a = _.find(this.status, ['key', id]);
            return a ? a.value : null;
        }
        return null;
    }

    tipoImpressaoDescription(id: number): string {
        if (this.tipoImpressao) {
            var a = _.find(this.tipoImpressao, ['key', id]);
            return a ? a.value : null;
        }
        return null;
    }

    onPageChange(page: any, data: Array<any> = this.data) {
        let start = (page.page - 1) * page.itemsPerPage;
        let end = page.itemsPerPage > -1 ? (start + page.itemsPerPage) : data.length;
        this.rows = data.slice(start, end);
    }

    editClick(id: number) {
        this.editId = id;
    }
}
