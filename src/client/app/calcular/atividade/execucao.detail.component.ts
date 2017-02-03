import { Component, OnInit } from '@angular/core';
import { Processo } from '../processo/processo.model';
import { ProcessoService } from '../processo/processo.service';
import { AtividadeService } from '../atividade/atividade.service';
import { ServicoService } from '../servico/servico.service';
import { Atividade } from './atividade.model';
import { Observable } from 'rxjs/Observable';
import { ActivatedRoute, Router } from '@angular/router';
import { IKeyValuePair } from '../../shared/interfaces';
import { TopnavService, IUser } from '../../shared/topnav/topnav.service';

import { ToastsManager } from 'ng2-toastr/ng2-toastr';
import { Subscription } from 'rxjs';

@Component({
    moduleId: module.id,
    selector: 'execucaodetail-cmp',
    templateUrl: './execucao.detail.component.html'
})
export class AtividadeExecucaoDetailComponent implements OnInit {

    public maskTimespan = [/\d/, /\d/, ':', /\d/, /\d/];

    public wtoInput: NodeJS.Timer;
    public modelName = 'Serviço';
    public model: Atividade = new Atividade;
    public parte: IKeyValuePair[];
    public tipoAtividade: IKeyValuePair[];
    public tipoImpressao: IKeyValuePair[];
    public advogado: Observable<IKeyValuePair[]>;
    public responsavel: IKeyValuePair[];

    public advogadoInit: IKeyValuePair[];
    public blockEdit: boolean = true;
    public id: Observable<string>;
    private busy: Subscription;
	private user: IUser = <IUser>{};

    isNaN = (value: number) => {
        return isNaN(value);
    }

    processos = (startsWith: string): Observable<any[]> => {
        var result = this.processoService.getProcessosSelect(startsWith);
        return result;
    }

    constructor(public servicoService: ServicoService,
        private processoService: ProcessoService,
        private service: AtividadeService,
        private topnavService: TopnavService,
        private route: ActivatedRoute,
        private router: Router,
        private toastr: ToastsManager) { }

    ngOnInit() {
        this.topnavService.getLoggedUser()
			.subscribe((data: IUser) => this.user = data);

        this.processoService.getParteSelect()
            .subscribe((data: IKeyValuePair[]) => this.parte = data);

        this.service.getTipoAtividadeSelect()
            .subscribe((data: IKeyValuePair[]) => this.tipoAtividade = data);

        this.service.getTipoImpressao()
            .subscribe((data: IKeyValuePair[]) => this.tipoImpressao = data);

        this.id = this.route.params.map(params => params['id']);

        this.id.subscribe(id => {
            if (id) {
                this.busy = this.service.getAtividadeById(id)
                    .subscribe((data: Atividade) => {
                        this.model = data;
                        this.model.tipoExecucaoNew = data.tipoExecucao !== 0 ? data.tipoExecucao : null;

                        this.model.entrega = data.entrega ? data.entrega.slice(0, 10) : null;
                        this.model.servico.prazo = data.servico.prazo ? data.servico.prazo.slice(0, 10) : null;

                        if (data.atividadeOrigem) {
                            this.model.atividadeOrigem.entrega = data.atividadeOrigem.entrega
                                ? data.atividadeOrigem.entrega.slice(0, 10)
                                : null;
                        }
                    });
            }
        });
    }

    onSubmit() {
        this.model.tipoExecucao = this.model.tipoExecucaoNew;

        this.service.executeAtividade(this.model)
            .subscribe(data => {
                this.onCancel();
                this.toastr.success('Atividade finalizada com sucesso!');
            });
    }

    loadServico(processo: Processo) {
        this.model.servico.processo = processo;
        this.model.servico.processoId = processo.id;
    }

    onCancel() {
        let link = 'calcular/atividade/execucao';
        this.router.navigateByUrl(link);
    };

	isInRole(role: string){
		return this.user
				&& this.user.roles
				&& this.user.roles.indexOf(role) !== -1;
	}
}
