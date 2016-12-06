import { Component, OnInit } from '@angular/core';
import { Evento } from './evento.model';
import { EventoService } from './evento.service';
import { ToastsManager } from 'ng2-toastr/ng2-toastr';

@Component({
    moduleId: module.id,
    selector: 'eventomaster-cmp',
    templateUrl: './evento.master.component.html',
})
export class EventoMasterComponent implements OnInit {

    private data: Evento[];

    private totalItems: number = 0;
    private currentPage: number = 1;
    private itemsPerPage: number = 50;
    private filterText: string = '';
    private editId: number;
    private rows: Evento[];

    constructor(private service: EventoService, private toastr: ToastsManager) {
    }

    ngOnInit() {
        this.filter();
    }

    filter() {
        this.service.getEventos(this.filterText)
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

    editClick(id: number) {
        this.editId = id;
    }
}
