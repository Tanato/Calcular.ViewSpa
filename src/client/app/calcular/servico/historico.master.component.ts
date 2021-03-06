import { Component, OnInit } from '@angular/core';
import { Processo } from '../processo/processo.model';
import { ProcessoService } from '../processo/processo.service';

import { ToastsManager } from 'ng2-toastr/ng2-toastr';
import { Subscription } from 'rxjs';

@Component({
    moduleId: module.id,
    selector: 'historicoServicoMaster-cmp',
    templateUrl: './historico.master.component.html',
})
export class ServicoHistoricoMasterComponent implements OnInit {

    private busy: Subscription;
    private modelName = 'Processo';

    private data: any;
    private totalItems: number = 0;
    private currentPage: number = 1;
    private itemsPerPage: number = 50;
    private filterText: string = '';
    private editId: number;
    private rows: Processo[];

    constructor(private service: ProcessoService, private toastr: ToastsManager) {
    }

    ngOnInit() {
        this.filter();
    }

    filter(page: number = null) {
        this.busy = this.service.getProcessosPaged(this.filterText, page ? page : this.currentPage, this.itemsPerPage)
            .subscribe(response => {
                this.data = response.data;
                this.totalItems = response.totalItems;
                this.rows = this.data;
            },
            error => {
                console.log(error);
                this.toastr.warning('Erro ao efetuar operação. Tente novamente');
            });
    }

    onPageChange(page: any, data: Array<any> = this.data) {
        this.filter(page.page);
    }

    onDelete(id: number) {
        this.service.deleteProcesso(id)
            .subscribe(x => {
                this.toastr.success(this.modelName + ' excluído com sucesso!');
                this.filter();
            },
            error => {
                this.toastr.error(error);
            });
    }

    editClick(id: number) {
        this.editId = id;
    }
}
