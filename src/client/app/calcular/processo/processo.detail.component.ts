import { Component, OnInit } from '@angular/core';
import { Processo } from './processo.model';
import { ProcessoService } from './processo.service';
import { Observable } from 'rxjs/Observable';
import { ActivatedRoute, Router } from '@angular/router';
import { IKeyValuePair } from '../../shared/interfaces';
import { ToastsManager } from 'ng2-toastr/ng2-toastr';
import * as _ from 'lodash';

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

    public advogado: any[];
    public advogadoInit: IKeyValuePair[];

    public formType: string = 'new';
    public blockEdit: boolean = true;

    public id: Observable<string>;

    constructor(public service: ProcessoService,
        private route: ActivatedRoute,
        private router: Router,
        private toastr: ToastsManager) { }

    public maskNumeroProcesso = (value: any[]) => {
        if (this.local && this.model && this.model.local !== null && this.local[this.model.local].mask) {
            return this.local[this.model.local].mask;
        } else {
            let mask: any[] = [];
            for (let i = 0; i < value.length; i++) {
                mask.push(/.*/);
            }
            return mask;
        };
    }

    vara = (startsWith: string): Observable<any[]> => {
        return this.service.getVaraSelect(startsWith);
    }

    indicacao = (startsWith: string): Observable<any[]> => {
        return this.service.getIndicacaoSelect(startsWith);
    }

    perito = (startsWith: string): Observable<any[]> => {
        return this.service.getPeritoSelect(startsWith);
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
                                .subscribe((x: any) => {
                                    this.advogadoInit = [x];
                                });
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
                this.service.getAdvogadoSelect(value).subscribe(data => {
                    this.advogado = data;
                });
            }, 500);
        }
    }

    refreshValueAdvogado(value: IKeyValuePair): void {
        this.model.advogado = _.find(this.advogado, (x) => x.id === value.key);
        this.model.advogadoId = value.key;
    }
}
