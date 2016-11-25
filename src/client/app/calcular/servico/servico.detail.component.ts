import { Component, OnInit } from '@angular/core';
import { Processo } from '../processo/processo.model';
import { ProcessoService } from '../processo/processo.service';
import { AtividadeService } from '../atividade/atividade.service';
import { Atividade } from '../atividade/atividade.model';
import { Servico } from './servico.model';
import { ServicoService } from './servico.service';
import { Observable } from 'rxjs/Observable';
import { ActivatedRoute, Router } from '@angular/router';
import { IKeyValuePair } from '../../shared/interfaces';

import { ToastsManager } from 'ng2-toastr/ng2-toastr';

@Component({
    moduleId: module.id,
    selector: 'servicodetail-cmp',
    templateUrl: './servico.detail.component.html'
})
export class ServicoDetailComponent implements OnInit {

    public wtoInput: NodeJS.Timer;

    public modelName = 'Serviço';

    public model: Servico = new Servico;
    public atividade: Atividade = new Atividade;

    public parte: IKeyValuePair[];
    public tipoAtividade: IKeyValuePair[];

    public advogado: Observable<IKeyValuePair[]>;
    public responsavel: IKeyValuePair[];

    public advogadoInit: IKeyValuePair[];

    public formType: string = 'new';
    public blockEdit: boolean = true;

    public id: Observable<string>;

    isNaN = (value: number) => {
        return isNaN(value);
    }

    processos = (startsWith: string): Observable<any[]> => {
        var result = this.processoService.getProcessosSelect(startsWith);
        return result;
    }

    constructor(public service: ServicoService,
        private processoService: ProcessoService,
        private atividadeService: AtividadeService,
        private route: ActivatedRoute,
        private router: Router,
        private toastr: ToastsManager) { }

    ngOnInit() {
        this.processoService.getParteSelect()
            .subscribe((data: IKeyValuePair[]) => this.parte = data);

        this.atividadeService.getTipoAtividadeSelect()
            .subscribe((data: IKeyValuePair[]) => this.tipoAtividade = data);

        this.id = this.route.params.map(params => params['id']);

        this.id.subscribe(id => {
            if (id) {
                this.formType = 'edit';
                this.service.getServicoById(id)
                    .subscribe((data: Servico) => {
                        this.model = data;
                        this.model.entrada = data.entrada.slice(0, 10);
                        this.model.prazo = data.prazo ? data.prazo.slice(0, 10) : null;
                        this.model.saida = data.saida ? data.saida.slice(0, 10) : null;
                    });
            }
        });
    }

    onSubmit() {
        if (this.formType === 'new') {
            this.service.postServico(this.model)
                .subscribe(data => {
                    this.model = data;
                    this.model.entrada = data.entrada.slice(0, 10);
                    this.model.prazo = data.prazo ? data.prazo.slice(0, 10) : null;
                    this.model.saida = data.saida ? data.saida.slice(0, 10) : null;
                    this.toastr.success(this.modelName + ' adicionado com sucesso!');
                });
        } else {
            this.service.putServico(this.model)
                .subscribe(data => {
                    this.model = data;
                    this.model.entrada = data.entrada.slice(0, 10);
                    this.model.prazo = data.prazo ? data.prazo.slice(0, 10) : null;
                    this.model.saida = data.saida ? data.saida.slice(0, 10) : null;
                    this.toastr.success(this.modelName + ' atualizado com sucesso!');
                });
        }
    }

    loadServico(processo: Processo) {
        this.model.processo = processo;
        this.model.processoId = processo.id;
    }

    addAtividade() {
        this.atividade.servicoId = this.model.id;

        this.atividadeService.postAtividade(this.atividade)
            .subscribe(x => {
                this.onRefresh();
                this.atividade = new Atividade();
                this.toastr.success('Atividade adicionada com sucesso!');
            });
    }

    onDelete(id: number) {
        this.atividadeService.deleteAtividade(id)
            .subscribe(x => {
                this.toastr.success('Atividade excluída com sucesso!');
                this.onRefresh();
            });
    }

    onRefresh() {
        this.service.getServicoById(this.model.id.toString())
            .subscribe((data: Servico) => {
                this.model = data;
            });
    }

    changeAtividade(tipo: number) {
        if (tipo !== null) {
            this.atividade.responsavel = null;
            this.atividade.responsavelId = 0;
            this.atividadeService.getResponsavel(tipo)
                .subscribe((data: IKeyValuePair[]) => this.responsavel = data);
        }
    }

    onCancel() {
        this.id.subscribe(id => {
            if (id) {
                let link = 'calcular/honorario/cadastro';
                this.router.navigateByUrl(link);
            } else {
                let link = 'calcular/honorario/cadastro';
                this.router.navigateByUrl(link);
            }
        });
    }
}
