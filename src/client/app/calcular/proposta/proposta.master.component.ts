import { Component, OnInit } from '@angular/core';
import { PropostaService } from './proposta.service';
import { Processo } from '../processo/processo.model';
import { ProcessoService } from '../processo/processo.service';
import { ToastsManager } from 'ng2-toastr/ng2-toastr';

@Component({
    moduleId: module.id,
    selector: 'propostamaster-cmp',
    templateUrl: './proposta.master.component.html',
})
export class PropostaMasterComponent implements OnInit {

    private data: Processo[];
    private rows: Processo[];

    private totalItems: number = 0;
    private currentPage: number = 1;
    private itemsPerPage: number = 50;

    private filterText: string = '';
    private editId: number;

    constructor(private service: PropostaService,
                private processoService: ProcessoService,
                private toastr: ToastsManager) { }

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

    editClick(id: number) {
        this.editId = id;
    }
}
