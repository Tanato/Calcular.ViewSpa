import { Component, OnInit } from '@angular/core';
import { Processo } from '../processo/processo.model';
import { ProcessoService } from '../processo/processo.service';
import { Honorario } from './honorario.model';
import { HonorarioService } from './honorario.service';
import { Observable } from 'rxjs/Observable';
import { ActivatedRoute, Router } from '@angular/router';
import { IKeyValuePair } from '../../shared/interfaces';

import { ToastsManager } from 'ng2-toastr/ng2-toastr';

@Component({
    moduleId: module.id,
    selector: 'honorariodetail-cmp',
    templateUrl: './honorario.detail.component.html'
})
export class HonorarioDetailComponent implements OnInit {

    public wtoInput: NodeJS.Timer;

    public modelName = 'Honorário';

    public model: Processo;
    public honorario: Honorario = new Honorario;

    public parte: IKeyValuePair[];
    public registro: IKeyValuePair[];
    public tipoPagamento: IKeyValuePair[];

    public advogado: Observable<IKeyValuePair[]>;
    public indicacao: Observable<IKeyValuePair[]>;

    public advogadoInit: IKeyValuePair[];
    public indicacaoInit: IKeyValuePair[];

    public formType: string = 'new';
    public blockEdit: boolean = true;

    public id: Observable<string>;

    processos = (startsWith: string): Observable<any[]> => {
        var result = this.processoService.getProcessosSelect(startsWith);
        return result;
    }

    constructor(public service: HonorarioService,
        private processoService: ProcessoService,
        private route: ActivatedRoute,
        private router: Router,
        private toastr: ToastsManager) { }

    ngOnInit() {
        this.processoService.getParteSelect()
            .subscribe((data: IKeyValuePair[]) => this.parte = data);

        this.service.getRegistroSelect()
            .subscribe((data: IKeyValuePair[]) => this.registro = data);

        this.id = this.route.params.map(params => params['id']);

        this.id.subscribe(id => {
            if (id) {
                this.processoService.getProcessoById(id)
                    .subscribe((data: Processo) => {
                        this.model = data;
                    });
            }
        });
    }

    changeRegistro(registro: number) {
        if (registro !== null)
        {
            this.honorario.tipoPagamento = null;
            this.service.getTipoPagamentoSelect(registro)
                .subscribe((data: IKeyValuePair[]) => this.tipoPagamento = data);
        }
    }

    addHonorario() {
        this.honorario.processoId = this.model.id;

        this.service.postHonorario(this.honorario)
            .subscribe(x => {
                this.processoService.getProcessoById(this.model.id.toString())
                    .subscribe((data: Processo) => {
                        this.model = data;
                    });
                this.honorario = new Honorario();
                this.toastr.success(this.modelName + ' adicionado com sucesso!');
            });
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
