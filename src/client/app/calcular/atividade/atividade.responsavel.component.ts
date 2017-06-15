import { Component, OnInit } from '@angular/core';
import { Atividade, Colaborador } from './atividade.model';
import { AtividadeService } from './atividade.service';

import { ToastsManager } from 'ng2-toastr/ng2-toastr';
import { Subscription } from 'rxjs';
import * as _ from 'lodash';

@Component({
    moduleId: module.id,
    selector: 'atividaderesponsavel-cmp',
    templateUrl: './atividade.responsavel.component.html',
})
export class AtividadeResponsavelComponent implements OnInit {

    private busy: Subscription;
    private modelName = 'Atividade Responsavel';

    private data: Colaborador[];

    private filterText: string = '';
    private editId: number;

    constructor(private service: AtividadeService,
        private toastr: ToastsManager) {
    }

    ngOnInit() {
        this.filter();
    }

    filter() {
        this.busy = this.service.getAtividadesResponsavel()
            .subscribe(response => {
                this.data = response;
            },
            error => {
                console.log(error);
                this.toastr.warning('Erro ao efetuar operação. Tente novamente');
            });
    }

    editClick(id: number) {
        this.editId = id;
    }
}
