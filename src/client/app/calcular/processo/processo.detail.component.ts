import { Component, OnInit } from '@angular/core';
import { Processo } from './processo.model';
import { ProcessoService } from './processo.service';
import { Observable } from 'rxjs/Observable';
import { ActivatedRoute, Router } from '@angular/router';
import { IKeyValuePair } from '../../shared/interfaces';

import { ToastsManager } from 'ng2-toastr/ng2-toastr';

@Component({
    moduleId: module.id,
    selector: 'processodetail-cmp',
    templateUrl: './processo.detail.component.html'
})
export class ProcessoDetailComponent implements OnInit {

    public wtoInput: NodeJS.Timer;

    public modelName = 'Processo';

    public maskNumero = ['(', /\d/, /\d/, ')', ' ', /\d/, /\d/, /\d/, /\d/, '-', /\d/, /\d/, /\d/, /\d/];

    public model: Processo = new Processo;
    public parte: IKeyValuePair[];
    public local: IKeyValuePair[];

    public advogado: Observable<IKeyValuePair[]>;
    public indicacao: Observable<IKeyValuePair[]>;

    public advogadoInit: IKeyValuePair[];
    public indicacaoInit: IKeyValuePair[];

    public formType: string = 'new';
    public blockEdit: boolean = true;

    public id: Observable<string>;

    constructor(public service: ProcessoService,
        private route: ActivatedRoute,
        private router: Router,
        private toastr: ToastsManager) { }

    ngOnInit() {
        this.service.getParteSelect()
            .subscribe((data: IKeyValuePair[]) => this.parte = data);

        this.service.getLocalSelect()
            .subscribe((data: IKeyValuePair[]) => this.local = data);

        this.id = this.route.params.map(params => params['id']);

        this.id.subscribe(id => {
            if (id) {
                this.blockEdit = true;
                this.formType = 'edit';
                this.service.getProcessoById(id)
                    .subscribe((data: Processo) => {
                        this.model = data;
                        if (this.model.advogadoId) {
                            this.service.getAdvogadoSelectById(this.model.advogadoId)
                                .subscribe((x: IKeyValuePair) => { this.advogadoInit = [x]; });
                        }
                        if (this.model.indicacaoId) {
                            this.service.getIndicacaoSelectById(this.model.indicacaoId)
                                .subscribe((x: IKeyValuePair) => { this.indicacaoInit = [x]; });
                        }
                    });
            } else {
                this.blockEdit = false;
            }
        });
    }

    onSubmit() {
        if (this.formType === 'new') {
            this.service.postProcesso(this.model)
                .subscribe(x => {
                    this.toastr.success(this.modelName + ' adicionado com sucesso!');
                    this.onCancel();
                });
        } else {
            this.service.putProcesso(this.model)
                .subscribe(x => {
                    this.toastr.success(this.modelName + ' atualizado com sucesso!');
                    this.onCancel();
                });
        }
    }

    onCancel() {
        let link = ['/calcular/processo'];
        this.router.navigate(link);
    }

    enableEdit() {
        this.blockEdit = false;
    }

    // Advogado select    
    public typedAdvogado(value: string): void {
        if (value && value.length > 2) {
            clearTimeout(this.wtoInput);
            this.wtoInput = setTimeout(() => {
                this.advogado = this.service.getAdvogadoSelect(value);
            }, 500);
        }
    }

    refreshValueAdvogado(value: IKeyValuePair): void {
        this.model.advogadoId = value.key;
    }

    // Indicacao select    
    public typedIndicacao(value: string): void {
        if (value && value.length > 2) {
            clearTimeout(this.wtoInput);
            this.wtoInput = setTimeout(() => {
                this.indicacao = this.service.getIndicacaoSelect(value);
            }, 500);
        }
    }

    refreshValueIndicacao(value: IKeyValuePair): void {
        this.model.indicacaoId = value.key;
    }
}
