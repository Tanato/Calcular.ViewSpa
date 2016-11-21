import { Component, OnInit } from '@angular/core';
import { Location } from '@angular/common';
import { Processo, ProcessoDetalhe } from './processo.model';
import { ProcessoService } from './processo.service';
import { Observable } from 'rxjs/Observable';
import { ActivatedRoute, Router } from '@angular/router';

import { ToastsManager } from 'ng2-toastr/ng2-toastr';
import { IKeyValuePair } from '../../shared/interfaces';

@Component({
    moduleId: module.id,
    selector: 'processonotes-cmp',
    templateUrl: './processo.notes.component.html'
})
export class ProcessoNotesComponent implements OnInit {

    public modelName = 'Observação do Processo';

    public model: Processo;
    public parte: IKeyValuePair[];

    public id: Observable<string>;

    processos = (startsWith: string): Observable<any[]> => {
        var result = this.service.getProcessosSelect(startsWith);
        return result;
    }

    constructor(public service: ProcessoService,
        private route: ActivatedRoute,
        private router: Router,
        private toastr: ToastsManager,
        private location: Location) { }

    ngOnInit() {
        this.service.getParteSelect()
            .subscribe((data: IKeyValuePair[]) => this.parte = data);

        this.id = this.route.params.map(params => params['id']);

        this.id.subscribe(id => {
            if (id) {
                this.service.getProcessoById(id)
                    .subscribe((data: Processo) => {
                        this.model = data;
                    });
            }
        });
    }

    changeProcesso(newVal: any) {
        this.model = newVal || new Processo;
    }

    addNote(note: string) {
        var detalhe = new ProcessoDetalhe();
        detalhe.descricao = note;
        detalhe.processoId = this.model.id;

        this.service.postProcessoDetalhes(detalhe)
            .subscribe(x => {
                this.service.getProcessoById(this.model.id.toString())
                    .subscribe((data: Processo) => {
                        this.model = data;
                    });
                this.toastr.success(this.modelName + ' adicionado com sucesso!');
            });
    }

    onCancel() {
        this.id.subscribe(id => {
            if (id) {
                this.location.back();
            } else {
                let link = '/calcular/processo';
                this.router.navigateByUrl(link);
            }
        });
    }
}
