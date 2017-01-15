import { Component, OnInit } from '@angular/core';
import { Comissao } from './comissao.model';
import { ComissaoService } from './comissao.service';
import { AtividadeService } from '../atividade/atividade.service';
import { ToastsManager } from 'ng2-toastr/ng2-toastr';
import { IKeyValuePair } from '../../shared/interfaces';

@Component({
    moduleId: module.id,
    selector: 'comissao-cmp',
    templateUrl: './comissao.component.html',
})
export class ComissaoComponent implements OnInit {

    private modelName = 'Atividade';

    private data: Comissao[];
    private totalItems: number = 0;
    private currentPage: number = 1;
    private itemsPerPage: number = 50;
    private model: Comissao;
    private editId: number;
    private rows: Comissao[];
    private tipoAtividade: IKeyValuePair[];

    constructor(private service: ComissaoService, private atividadeService: AtividadeService, private toastr: ToastsManager) { }

    ngOnInit() {
        this.filter();
        this.model = new Comissao;

        this.atividadeService.getTipoAtividadeSelect()
            .subscribe(data => this.tipoAtividade = data);
    }

    submit() {
        this.service.postComissao(this.model)
            .subscribe(x => {
                this.toastr.success('Atividade adicionada com sucesso!');
                this.filter();
            });
    }

    filter() {
        this.service.getComissao()
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

    changeAtividade(tipo: number) {
        if (tipo !== null) {
            this.service.getComissao(tipo)
                .subscribe((data: Comissao[]) => this.data = data);
        }
    }

    onPageChange(page: any, data: Array<any> = this.data) {
        let start = (page.page - 1) * page.itemsPerPage;
        let end = page.itemsPerPage > -1 ? (start + page.itemsPerPage) : data.length;
        this.rows = data.slice(start, end);
    }

    onDelete(id: number) {
        this.service.deleteComissao(id)
            .subscribe(x => {
                this.toastr.success(this.modelName + ' inativado com sucesso!');
                this.filter();
            });
    }

    editClick(id: number) {
        this.editId = id;
    }
}
