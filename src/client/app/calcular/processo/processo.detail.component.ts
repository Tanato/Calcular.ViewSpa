import { Component, OnInit } from '@angular/core';
import { Processo } from './processo.model';
import { ProcessoService } from './processo.service';
import { Observable } from 'rxjs/Observable';
import { ActivatedRoute, Router } from '@angular/router';
import { IKeyValuePair } from '../../shared/interfaces';
import { ToastsManager } from 'ng2-toastr/ng2-toastr';
import { Subscription } from 'rxjs';
import * as _ from 'lodash';

@Component({
    moduleId: module.id,
    selector: 'processodetail-cmp',
    templateUrl: './processo.detail.component.html'
})
export class ProcessoDetailComponent implements OnInit {

    private wtoInput: NodeJS.Timer;

    private modelName = 'Processo';

    private model: Processo = new Processo;
    private parte: IKeyValuePair[];
    private faseProcesso: IKeyValuePair[];
    private local: any[];

    private advogado: any[];
    private advogadoInit: IKeyValuePair[];

    private formType: string = 'new';
    private blockEdit: boolean = true;

    private id: Observable<string>;
    private busy: Subscription;

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

    advogados = (startsWith: string): Observable<any[]> => {
        var result = this.service.getAdvogadoSelect(startsWith);

        result.subscribe(data => {
            this.advogado = data;
        });
        return result;
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

    autor = (startsWith: string): Observable<any[]> => {
        return this.service.getAutorSelect(startsWith);
    }

    reu = (startsWith: string): Observable<any[]> => {
        return this.service.getReuSelect(startsWith);
    }

    clearNumero() {
        this.model.numero = '';
    }

    ngOnInit() {
        this.service.getParteSelect()
            .subscribe((data: IKeyValuePair[]) => this.parte = data);

        this.service.getLocalSelect()
            .subscribe((data: any[]) => this.local = data);

        this.service.getFaseProcessoSelect()
            .subscribe((data: IKeyValuePair[]) => this.faseProcesso = data, error => this.toastr.error('Erro ao efetuar requisição!'));

        this.id = this.route.params.map(params => params['id']);

        this.id.subscribe(id => {
            if (id) {
                this.blockEdit = true;
                this.formType = 'edit';
                this.busy = this.service.getProcessoById(id)
                    .subscribe((data: Processo) => {
                        this.model = data;
                    });
            } else {
                this.blockEdit = false;
            }
        });
    }

    onSubmit() {
        if (this.formType === 'new' && !this.model.id) {
            this.service.postProcesso(this.model)
                .subscribe(data => {
                    this.model = data;
                    this.toastr.success(this.modelName + ' adicionado com sucesso!');
                }, error => {
                    this.toastr.error(error);
                });
        } else {
            this.service.putProcesso(this.model)
                .subscribe(data => {
                    this.toastr.success(this.modelName + ' atualizado com sucesso!');
                }, error => {
                    this.toastr.error(error);
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

    refreshValueAdvogado(value: IKeyValuePair): void {
        this.model.advogado = _.find(this.advogado, (x) => x.id === value.key);
        this.model.advogadoId = value.key;
    }
}
