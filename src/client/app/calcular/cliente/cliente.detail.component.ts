import { Component, OnInit } from '@angular/core';
import { Cliente } from './cliente.model';
import { ClienteService } from './cliente.service';
import { Observable } from 'rxjs/Observable';
import { ActivatedRoute, Router } from '@angular/router';
import { IKeyValuePair } from '../../shared/interfaces';

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

    public model: Cliente = new Cliente;
    public perfil: IKeyValuePair[];
    public comoChegou: IKeyValuePair[];

    public formType: string = 'new';
    public blockEdit: boolean = true;

    public id: Observable<string>;

    public mySource: string = "https://maps.googleapis.com/maps/api/geocode/json?address=:keyword";
    
    constructor(private service: ClienteService,
        private route: ActivatedRoute,
        private router: Router,
        private toastr: ToastsManager) { }

    dateMask(data: any) {
        if (data.value && data.pristine) {
            return 'yyyy-MM-dd';
        }
        return null;
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
                        data.nascimento = data.nascimento.slice(0, 10);
                        this.model = data;
                    });
            } else {
                this.blockEdit = false;
            }
        });
    }

    onSubmit() {
        if (this.formType === 'new') {
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
        let link = ['/calcular/cliente'];
        this.router.navigate(link);
    }
}
