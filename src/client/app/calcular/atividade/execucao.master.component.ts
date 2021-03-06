import { Component, OnInit } from '@angular/core';
import { Atividade } from './atividade.model';
import { AtividadeService } from './atividade.service';

import { ToastsManager } from 'ng2-toastr/ng2-toastr';
import { Subscription } from 'rxjs';
import * as _ from 'lodash';

@Component({
    moduleId: module.id,
    selector: 'execucaodemaster-cmp',
    templateUrl: './execucao.master.component.html',
})
export class AtividadeExecucaoMasterComponent implements OnInit {

    private busy: Subscription;
    private modelName = 'Atividade';

    private data: Atividade[];
    private rows: Atividade[];

    private totalItems: number = 0;
    private currentPage: number = 1;
    private itemsPerPage: number = 50;

    private filterText: string = '';
    private editId: number;
    private all: boolean;

    constructor(private service: AtividadeService,
        private toastr: ToastsManager) {
    }

    ngOnInit() {
        this.filter();
    }

    isRevisor() {
        return this.data && _.some(this.data, x => x.etapaAtividade === 1);
    }

    filter() {
        this.busy = this.service.getAtividadesByUser(this.filterText, this.all)
            .subscribe(response => {
                this.data = response;
                this.totalItems = this.data.length;
                this.onPageChange({ page: this.currentPage, itemsPerPage: this.itemsPerPage });
            },
            error => {
                console.log(error);
                this.toastr.warning('Erro ao efetuar operação. Tente novamente');
            });
    }

    onPageChange(page: any, data: Array<any> = this.data) {
        let start = (page.page - 1) * page.itemsPerPage;
        let end = page.itemsPerPage > -1 ? (start + page.itemsPerPage) : data.length;
        this.rows = data.slice(start, end);
    }

    onDelete(id: number) {
        this.service.deleteAtividade(id)
            .subscribe(x => {
                this.toastr.success(this.modelName + ' excluído com sucesso!');
                this.filter();
            });
    }

    editClick(id: number) {
        this.editId = id;
    }
}
