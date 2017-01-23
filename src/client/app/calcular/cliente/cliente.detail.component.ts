import { Component, OnInit } from '@angular/core';
import { Cliente } from './cliente.model';
import { ClienteService } from './cliente.service';
import { Observable } from 'rxjs/Observable';
import { ActivatedRoute, Router } from '@angular/router';
import { IKeyValuePair } from '../../shared/interfaces';
import createNumberMask from 'text-mask-addons/dist/createNumberMask.js';

import { ToastsManager } from 'ng2-toastr/ng2-toastr';

@Component({
    moduleId: module.id,
    selector: 'clientedetail-cmp',
    templateUrl: './cliente.detail.component.html'
})
export class ClienteDetailComponent implements OnInit {

    public modelName = 'Cliente';

    public maskTelefone = ['(', /\d/, /\d/, ')', ' ', /\d/, /\d/, /\d/, /\d/, '-', /\d/, /\d/, /\d/, /\d/];
    public maskCelular = ['(', /\d/, /\d/, ')', ' ', /\d/, /\d/, /\d/, /\d/, /\d/, '-', /\d/, /\d/, /\d/, /\d/];
    public moneyMask: any = createNumberMask({ prefix: 'R$ ', includeThousandsSeparator: false, allowNegative: true, allowDecimal: true });

    public model: Cliente = new Cliente;
    public perfil: IKeyValuePair[];
    public comoChegou: IKeyValuePair[];

    public formType: string = 'new';
    public blockEdit: boolean = true;
    public honorariosAux: string;

    public id: Observable<string>;

    constructor(public service: ClienteService,
        private route: ActivatedRoute,
        private router: Router,
        private toastr: ToastsManager) { }

    empresa = (startsWith: string): Observable<any[]> => {
        var result = this.service.getEmpresaSelect(startsWith);
        return result;
    }

    enableEdit() {
        this.blockEdit = false;
    }

    ngOnInit() {

        this.service.getPerfilSelect()
            .subscribe((data: IKeyValuePair[]) => this.perfil = data);

        this.service.getComoChegouSelect()
            .subscribe((data: IKeyValuePair[]) => this.comoChegou = data);

        this.id = this.route.params.map(params => params['id']);

        this.id.subscribe(id => {
            if (id) {
                this.blockEdit = true;
                this.formType = 'edit';
                this.service.getClienteById(id)
                    .subscribe((data: Cliente) => {
                        data.nascimento = data.nascimento ? data.nascimento.slice(0, 10) : null;
                        this.honorariosAux = data.honorarios !== null ? data.honorarios.toString() : null;
                        this.model = data;
                    });
            } else {
                this.blockEdit = false;
            }
        });
    }

    onSubmit() {

        this.model.honorarios = parseFloat(this.honorariosAux.replace(/[^0-9\.]/g, ''));

        if (this.formType === 'new' && !this.model.id) {
            this.service.postCliente(this.model)
                .subscribe(x => {
                    this.toastr.success(this.modelName + ' adicionado com sucesso!');
                    this.onCancel();
                });
        } else {
            this.service.putCliente(this.model)
                .subscribe(x => {
                    this.toastr.success(this.modelName + ' atualizado com sucesso!');
                    this.onCancel();
                });
        }
    }

    onCancel() {
        let link = ['calcular/cliente'];
        this.router.navigate(link);
    }
}
