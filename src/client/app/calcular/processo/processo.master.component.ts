import { Component, OnInit } from '@angular/core';
import { Processo } from './processo.model';
import { ProcessoService } from './processo.service';

import { ToastsManager } from 'ng2-toastr/ng2-toastr';

@Component({
    moduleId: module.id,
    selector: 'processomaster-cmp',
    templateUrl: './processo.master.component.html',
})
export class ProcessoMasterComponent implements OnInit {

    private modelName = 'Processo';

    private data: Processo[];
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

    filter() {
        this.service.getProcessos(this.filterText)
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

    onPageChange(page: any, data: Array<any> = this.data) {
        let start = (page.page - 1) * page.itemsPerPage;
        let end = page.itemsPerPage > -1 ? (start + page.itemsPerPage) : data.length;
        this.rows = data.slice(start, end);
    }

    onDelete(id: number) {
        this.service.deleteProcesso(id)
            .subscribe(x => {
                this.toastr.success(this.modelName + ' excluído com sucesso!');
                this.filter();
            });
    }

    editClick(id: number) {
        this.editId = id;
    }
}
