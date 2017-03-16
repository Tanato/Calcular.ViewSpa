import { Component, OnInit } from '@angular/core';
import { HonorarioService } from './honorario.service';
import { Processo } from '../processo/processo.model';
import { ProcessoService } from '../processo/processo.service';
import { ToastsManager } from 'ng2-toastr/ng2-toastr';
import { Subscription } from 'rxjs';

@Component({
    moduleId: module.id,
    selector: 'honorariomaster-cmp',
    templateUrl: './honorario.master.component.html',
})
export class HonorarioMasterComponent implements OnInit {

    private busy: Subscription;
    private data: Processo[];
    private rows: Processo[];

    private totalItems: number = 0;
    private currentPage: number = 1;
    private itemsPerPage: number = 50;

    private filterText: string = '';
    private editId: number;

    constructor(private service: HonorarioService,
                private processoService: ProcessoService,
                private toastr: ToastsManager) { }

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
                alert(error);
                console.log(error);
                this.toastr.warning('Erro ao efetuar operação. Tente novamente');
            });
    }

    onPageChange(page: any, data: Array<any> = this.data) {
        this.filter(page.page);
    }

    editClick(id: number) {
        this.editId = id;
    }
}
