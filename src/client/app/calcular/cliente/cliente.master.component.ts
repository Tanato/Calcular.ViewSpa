import { Component } from '@angular/core';
import { Cliente } from './cliente.model';
import { ClienteService } from './cliente.service';

@Component({
    moduleId: module.id,
    selector: 'clientemaster-cmp',
    templateUrl: './cliente.master.component.html',
})
export class ClienteMasterComponent {

    public data: Cliente[];
    private rows: Cliente[];

    public totalItems: number = 0;
    public currentPage: number = 1;
    public maxSize: number = 6;
    public itemsPerPage: number = 10;

    public filterText: string = '';

    constructor(private service: ClienteService) {
        this.filter();
    }

    public filter() {
        this.service.getClientes(this.filterText)
            .subscribe(response => {
                this.data = response;
                this.totalItems = this.data.length;
                this.onPageChange({ page: this.currentPage, itemsPerPage: this.itemsPerPage })
            },
            error => {
                alert(error);
                console.log(error);
            });
    }

    public onPageChange(page: any, data: Array<any> = this.data) {
        let start = (page.page - 1) * page.itemsPerPage;
        let end = page.itemsPerPage > -1 ? (start + page.itemsPerPage) : data.length;
        this.rows = data.slice(start, end);
    }
}
