import { Component, OnInit } from '@angular/core';
import { Processo } from '../processo/processo.model';
import { ProcessoService } from '../processo/processo.service';
import { Proposta } from './proposta.model';
import { PropostaService } from './proposta.service';
import { Observable } from 'rxjs/Observable';
import { ActivatedRoute, Router } from '@angular/router';
import { IKeyValuePair } from '../../shared/interfaces';

import { ToastsManager } from 'ng2-toastr/ng2-toastr';

@Component({
    moduleId: module.id,
    selector: 'propostadetail-cmp',
    templateUrl: './proposta.detail.component.html'
})
export class PropostaDetailComponent implements OnInit {

    public wtoInput: NodeJS.Timer;

    public modelName = 'Cobrança';

    public model: Processo;
    public proposta: Proposta = new Proposta;
    public parte: IKeyValuePair[];

    public formType: string = 'new';
    public blockEdit: boolean = true;

    public id: Observable<string>;

    contato = (startsWith: string): Observable<any[]> => {
        var result = this.service.getContatoSelect(startsWith);
        return result;
    }

    constructor(public service: PropostaService,
        private processoService: ProcessoService,
        private route: ActivatedRoute,
        private router: Router,
        private toastr: ToastsManager) { }

    ngOnInit() {
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

    addProposta() {
        this.processoService.getParteSelect()
            .subscribe((data: IKeyValuePair[]) => this.parte = data);

        this.proposta.processoId = this.model.id;

        this.service.postProposta(this.proposta)
            .subscribe(x => {
                this.onRefresh();
                this.proposta = new Proposta();
                this.toastr.success(this.modelName + ' registrada com sucesso!');
            });
    }

    onDelete(id: number) {
        this.service.deleteProposta(id)
            .subscribe(x => {
                this.toastr.success(this.modelName + ' excluída com sucesso!');
                this.onRefresh();
            });
    }

    onRefresh() {
        this.service.getProcessoById(this.model.id.toString())
            .subscribe((data: Processo) => {
                this.model = data;
            });
    }

    onCancel() {
        this.id.subscribe(id => {
            let link = 'calcular/honorario/proposta';
            this.router.navigateByUrl(link);
        });
    }
}
