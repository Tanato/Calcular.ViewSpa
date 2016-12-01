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

    public model: Processo = new Processo;
    public parte: IKeyValuePair[];
    public local: any[];

    public advogado: Observable<IKeyValuePair[]>;
    public indicacao: Observable<IKeyValuePair[]>;
    public perito: Observable<IKeyValuePair[]>;

    public advogadoInit: IKeyValuePair[];
    public indicacaoInit: IKeyValuePair[];
    public peritoInit: IKeyValuePair[];

    public formType: string = 'new';
    public blockEdit: boolean = true;

    public id: Observable<string>;

    constructor(public service: ProcessoService,
        private route: ActivatedRoute,
        private router: Router,
        private toastr: ToastsManager) { }

    public maskNumeroProcesso = () => {
        if (this.local && this.model && this.model.local !== null) {
            return <string[]>this.local[this.model.local].mask;
        } else {
            return [''];
        }
    }

    vara = (startsWith: string): Observable<any[]> => {
        var result = this.service.getVaraSelect(startsWith);
        return result;
    }

    clearNumero() {
        this.model.numero = '';
    }

    ngOnInit() {
        this.service.getParteSelect()
            .subscribe((data: IKeyValuePair[]) => this.parte = data);

        this.service.getLocalSelect()
            .subscribe((data: any[]) => this.local = data);

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
                            this.service.getUserSelectById(this.model.indicacaoId)
                                .subscribe((x: IKeyValuePair) => { this.indicacaoInit = [x]; });
                        }
                        if (this.model.peritoId) {
                            this.service.getUserSelectById(this.model.peritoId)
                                .subscribe((x: IKeyValuePair) => { this.peritoInit = [x]; });
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
                .subscribe(data => {
                    this.model = data;
                    this.toastr.success(this.modelName + ' adicionado com sucesso!');
                });
        } else {
            this.service.putProcesso(this.model)
                .subscribe(data => {
                    this.toastr.success(this.modelName + ' atualizado com sucesso!');
                });
        }
    }

    onCancel() {
        let link = ['calcular/processo/cadastro'];
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
                this.indicacao = this.service.getUserSelect(value);
            }, 500);
        }
    }

    refreshValueIndicacao(value: any): void {
        this.model.indicacaoId = value.key;
    }

    // Perito select    
    public typedPerito(value: string): void {
        if (value && value.length > 2) {
            clearTimeout(this.wtoInput);
            this.wtoInput = setTimeout(() => {
                this.perito = this.service.getUserSelect(value);
            }, 500);
        }
    }

    refreshValuePerito(value: any): void {
        this.model.peritoId = value.key;
    }
}
