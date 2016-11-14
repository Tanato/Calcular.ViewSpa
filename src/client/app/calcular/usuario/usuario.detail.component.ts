import { Component, OnInit } from '@angular/core';
import { Usuario } from './usuario.model';
import { UsuarioService } from './usuario.service';
import { Observable } from 'rxjs/Observable';
import { ActivatedRoute, Router } from '@angular/router';
import { IKeyValuePair } from '../../shared/interfaces';

import { ToastsManager } from 'ng2-toastr/ng2-toastr';

@Component({
    moduleId: module.id,
    selector: 'usuariodetail-cmp',
    templateUrl: './usuario.detail.component.html'
})
export class UsuarioDetailComponent implements OnInit {

    public modelName = 'Usuário';

    public model: Usuario = new Usuario;
    public perfil: IKeyValuePair[];

    public formType: string = 'new';
    public blockEdit: boolean = true;

    public id: Observable<string>;

    constructor(public service: UsuarioService,
        private route: ActivatedRoute,
        private router: Router,
        private toastr: ToastsManager) { 
        }

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

        // this.service.getPerfilSelect()
        //     .subscribe((data: IKeyValuePair[]) => this.perfil = data);

        this.id = this.route.params.map(params => params['id']);

        this.id.subscribe(id => {
            if (id) {
                this.blockEdit = true;
                this.formType = 'edit';
                this.service.getUsuarioById(id)
                    .subscribe((data: Usuario) => {
                        data.birthDate = data.birthDate.slice(0, 10);
                        this.model = data;
                    });
            } else {
                this.blockEdit = false;
            }
        });
    }

    onSubmit() {
        if (this.formType === 'new') {
            this.service.postUsuario(this.model)
                .subscribe(x => {
                    this.toastr.success(this.modelName + ' adicionado com sucesso!');
                    this.onCancel();
                });
        } else {
            this.service.putUsuario(this.model)
                .subscribe(x => {
                    this.toastr.success(this.modelName + ' atualizado com sucesso!');
                    this.onCancel();
                });
        }
    }

    onCancel() {
        let link = ['/calcular/usuario'];
        this.router.navigate(link);
    }
}
