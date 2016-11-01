import { Component, OnInit } from '@angular/core';
import { Cliente } from './cliente.model';
import { ClienteService } from './cliente.service';

import { ToastsManager } from 'ng2-toastr/ng2-toastr';

@Component({
    moduleId: module.id,
    selector: 'clientemaster-cmp',
    templateUrl: './cliente.master.component.html',
})
export class ClienteMasterComponent implements OnInit {

    private modelName = 'Cliente';

    private data: Cliente[];

    private totalItems: number = 0;
    private currentPage: number = 1;
    private maxSize: number = 6;
    private itemsPerPage: number = 10;

    private filterText: string = '';

    private editId: number;

    private rows: Cliente[];

    constructor(private service: ClienteService, private toastr: ToastsManager) {
    }

    ngOnInit() {
        this.filter();
    }

    filter() {
        this.service.getClientes(this.filterText)
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
        this.service.deleteCliente(id)
            .subscribe(x => {
                this.toastr.success(this.modelName + ' excluído com sucesso!');
                this.filter();
            });
    }

    editClick(id: number) {
        this.editId = id;
    }
}
