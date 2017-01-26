import { Component, OnInit } from '@angular/core';
import { Processo } from '../processo/processo.model';
import { ProcessoService } from '../processo/processo.service';
import { Cobranca } from './cobranca.model';
import { CobrancaService } from './cobranca.service';
import { Observable } from 'rxjs/Observable';
import { ActivatedRoute, Router } from '@angular/router';
import { IKeyValuePair } from '../../shared/interfaces';

import { ToastsManager } from 'ng2-toastr/ng2-toastr';
import createNumberMask from 'text-mask-addons/dist/createNumberMask.js';
import { Subscription } from 'rxjs';

@Component({
    moduleId: module.id,
    selector: 'cobrancadetail-cmp',
    templateUrl: './cobranca.detail.component.html'
})
export class CobrancaDetailComponent implements OnInit {

    public wtoInput: NodeJS.Timer;

    public modelName = 'Cobrança';

    public model: Processo;
    public cobranca: Cobranca = new Cobranca;
    public parte: IKeyValuePair[];

    public formType: string = 'new';
    public blockEdit: boolean = true;

    public id: Observable<string>;
    public moneyMask: any = createNumberMask({prefix: 'R$ ', includeThousandsSeparator: false, allowNegative: true, allowDecimal: true});

    private busy: Subscription;

    contato = (startsWith: string): Observable<any[]> => {
        var result = this.service.getContatoSelect(startsWith);
        return result;
    }

    constructor(public service: CobrancaService,
        private processoService: ProcessoService,
        private route: ActivatedRoute,
        private router: Router,
        private toastr: ToastsManager) { }

    ngOnInit() {
        this.processoService.getParteSelect()
            .subscribe((data: IKeyValuePair[]) => this.parte = data);

        this.id = this.route.params.map(params => params['id']);

        this.id.subscribe(id => {
            if (id) {
                this.busy = this.service.getProcessoById(id)
                    .subscribe((data: Processo) => {
                        this.model = data;
                    });
            }
        });
    }

    addCobranca() {
        this.cobranca.processoId = this.model.id;

        this.service.postCobranca(this.cobranca)
            .subscribe(x => {
                this.onRefresh();
                this.cobranca = new Cobranca();
                this.toastr.success(this.modelName + ' registrada com sucesso!');
            });
    }

    onDelete(id: number) {
        this.service.deleteCobranca(id)
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
            let link = 'calcular/honorario/cobranca';
            this.router.navigateByUrl(link);
        });
    }
}
