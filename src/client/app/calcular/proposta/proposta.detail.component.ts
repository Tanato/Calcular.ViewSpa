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

    public maskTelefone = ['(', /\d/, /\d/, ')', ' ', /\d/, /\d/, /\d/, /\d/, '-', /\d/, /\d/, /\d/, /\d/];
    public maskCelular = ['(', /\d/, /\d/, ')', ' ', /\d/, /\d/, /\d/, /\d/, /\d/, '-', /\d/, /\d/, /\d/, /\d/];

    public model: Proposta = new Proposta;
    public parte: IKeyValuePair[];
    public comoChegou: IKeyValuePair[];
    public motivo: IKeyValuePair[];
    public local: any[];

    public formType: string = 'new';
    public blockEdit: boolean = true;

    public id: Observable<string>;

    public maskNumeroProcesso = () => {
        if (this.local && this.model && this.model.local !== null) {
            return <string[]>this.local[this.model.local].mask;
        } else {
            return [''];
        }
    }

    contatos = (startsWith: string): Observable<any[]> => {
        var result = this.service.getContatoSelect(startsWith);
        return result;
    }

    constructor(public service: PropostaService,
        private processoService: ProcessoService,
        private route: ActivatedRoute,
        private router: Router,
        private toastr: ToastsManager) { }

    ngOnInit() {
        this.processoService.getParteSelect()
            .subscribe((data: IKeyValuePair[]) => this.parte = data);
        this.service.getComoChegouSelect()
            .subscribe((data: IKeyValuePair[]) => this.comoChegou = data);
        this.service.getMotivoSelect()
            .subscribe((data: IKeyValuePair[]) => this.motivo = data);
        this.processoService.getLocalSelect()
            .subscribe((data: any[]) => this.local = data);

        this.id = this.route.params.map(params => params['id']);

        this.id.subscribe(id => {
            if (id) {
                this.service.getPropostaById(id)
                    .subscribe((data: Proposta) => {
                        this.model = data;
                    });
            }
        });
    }

    clearNumero() {
        this.model.numero = '';
    }

    contatoChange(value: any) {
        if (value.nome) {
            this.model.contato = value.nome;
            this.model.contatoId = value.id;
            this.model.email = value.email;
            this.model.telefone = value.telefone;
            this.model.celular = value.celular;
        } else {
            this.model.contato = value;
        }
    }

    addProposta() {
        this.service.postProposta(this.model)
            .subscribe(x => {
                this.onRefresh();
                this.model = new Proposta();
                this.toastr.success(this.modelName + ' registrada com sucesso!');
            });
    }

    onRefresh() {
        this.service.getPropostaById(this.model.id.toString())
            .subscribe((data: Proposta) => {
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
