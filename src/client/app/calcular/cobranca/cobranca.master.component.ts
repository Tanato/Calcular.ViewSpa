import { Component, OnInit } from '@angular/core';
import { CobrancaService } from './cobranca.service';
import { CobrancaDetail } from './cobranca.model';
import { Processo } from '../processo/processo.model';
import { ProcessoService } from '../processo/processo.service';
import { ToastsManager } from 'ng2-toastr/ng2-toastr';
import { Subscription } from 'rxjs';
import * as _ from 'lodash';

@Component({
    moduleId: module.id,
    selector: 'cobrancamaster-cmp',
    templateUrl: './cobranca.master.component.html',
})
export class CobrancaMasterComponent implements OnInit {

    private busy: Subscription;
    private data: CobrancaDetail[];
    private rows: CobrancaDetail[];

    private totalItems: number = 0;
    private currentPage: number = 1;
    private itemsPerPage: number = 50;

    private filterText: string = '';
    private editId: number;
    private all: boolean;

    constructor(private service: CobrancaService,
        private processoService: ProcessoService,
        private toastr: ToastsManager) { }

    ngOnInit() {
        this.filter();
    }

    filter() {
        this.busy = this.service.getProcessos(this.filterText, this.all)
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

    quantidade() {
        if(this.data)
            return _.sumBy(this.data, x => x.totalProcessosPendentes);
        else
            return null;
    }

    total() {
        if(this.data)
            return 'R$ ' + _.sumBy(this.data, x => x.totalHonorarios);
        else
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
