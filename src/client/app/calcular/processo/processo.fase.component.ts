import { Component, OnInit } from '@angular/core';
import { FaseProcesso } from './processo.model';
import { ProcessoService } from './processo.service';
import { ToastsManager } from 'ng2-toastr/ng2-toastr';
import { Subscription } from 'rxjs';

@Component({
    moduleId: module.id,
    selector: 'faseprocesso-cmp',
    templateUrl: './processo.fase.component.html',
})
export class FaseProcessoComponent implements OnInit {

    private busy: Subscription;
    private modelName = 'Fase Processual';

    private data: FaseProcesso[];
    private totalItems: number = 0;
    private currentPage: number = 1;
    private itemsPerPage: number = 50;
    private model: string;
    private editId: number;
    private rows: FaseProcesso[];

    constructor(private service: ProcessoService, private toastr: ToastsManager) { }

    ngOnInit() {
        this.filter();
    }

    submit() {
        this.service.postFaseProcesso(this.model)
            .subscribe(x => {
                this.toastr.success('Fase Processual adicionada com sucesso!');
                this.model = null;
                this.filter();
            }, error => {
                this.toastr.error(error);
                this.model = null;
            });
    }

    filter() {
        this.busy = this.service.getFaseProcesso()
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
        this.service.deleteFaseProcesso(id)
            .subscribe(x => {
                this.toastr.success(this.modelName + ' excluído com sucesso!');
                this.filter();
            }, error => {
                this.toastr.error(error);
            });
    }

    editClick(id: number) {
        this.editId = id;
    }
}
