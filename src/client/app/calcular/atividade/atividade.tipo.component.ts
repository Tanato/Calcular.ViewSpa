import { Component, OnInit } from '@angular/core';
import { TipoAtividade } from './atividade.model';
import { AtividadeService } from './atividade.service';
import { ToastsManager } from 'ng2-toastr/ng2-toastr';
import { Subscription } from 'rxjs';

@Component({
    moduleId: module.id,
    selector: 'tipoatividade-cmp',
    templateUrl: './atividade.tipo.component.html',
})
export class TipoAtividadeComponent implements OnInit {

    private busy: Subscription;
    private modelName = 'Atividade';

    private data: TipoAtividade[];
    private totalItems: number = 0;
    private currentPage: number = 1;
    private itemsPerPage: number = 50;
    private model: string;
    private editId: number;
    private rows: TipoAtividade[];

    constructor(private service: AtividadeService, private toastr: ToastsManager) { }

    ngOnInit() {
        this.filter();
    }

    submit() {
        this.service.postTipoAtividade(this.model)
            .subscribe(x => {
                this.toastr.success('Atividade adicionada com sucesso!');
                this.model = null;
                this.filter();
            }, error => {
                this.toastr.error(error);
                this.model = null;
            });
    }

    filter() {
        this.busy = this.service.getTipoAtividade()
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
        this.service.deleteTipoAtividade(id)
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
