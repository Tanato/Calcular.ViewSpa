import { Component, OnInit } from '@angular/core';
import { Usuario } from './usuario.model';
import { UsuarioService } from './usuario.service';
import { Observable } from 'rxjs/Observable';
import { Subscription } from 'rxjs';
import { ActivatedRoute, Router } from '@angular/router';

import * as _ from 'lodash';

import { ToastsManager } from 'ng2-toastr/ng2-toastr';
import { IUser, UserService } from '../../shared/user/user.service';

@Component({
    moduleId: module.id,
    selector: 'usuariodetail-cmp',
    templateUrl: './usuario.detail.component.html'
})
export class UsuarioDetailComponent implements OnInit {

    public modelName = 'Usuário';

    public model: Usuario = new Usuario;
    public roles: any[];

    public formType: string = 'new';
    public blockEdit: boolean = true;

    public id: Observable<string>;
	user: IUser = <IUser>{};

    private busy: Subscription;

    constructor(public service: UsuarioService,
        private route: ActivatedRoute,
        private router: Router,
        private toastr: ToastsManager,
        private userService: UserService) {
    }

    selectedOptions(): string[] {
        return this.roles
            .filter(opt => opt.checked)
            .map(opt => opt.id);
    }

    enableEdit() {
        this.blockEdit = false;
    }

    resetarSenha() {
        this.service.postResetarSenha(this.model)
            .subscribe(x => {
                this.toastr.success('Senha do usuário ' + this.model.name + ' resetada com sucesso');
            }, x => {
                this.toastr.error(x);
            });
    }

    ngOnInit() {
        this.userService.getUser().subscribe((data: IUser) => this.user = data);

        this.busy = this.service.getRolesSelect()
            .subscribe((data: any[]) => {
                data.forEach(element => {
                    element.checked = false;
                });
                this.roles = data;

                this.id = this.route.params.map(params => params['id']);

                this.id.subscribe(id => {
                    if (id) {
                        this.blockEdit = true;
                        this.formType = 'edit';
                        this.service.getUsuarioById(id)
                            .subscribe((user: Usuario) => {
                                user.birthDate = user.birthDate.slice(0, 10);
                                this.model = user;
                                _(this.roles).keyBy('id').at(user.roles).value()
                                    .map((x: any) => x.checked = true);
                            });
                    } else {
                        this.blockEdit = false;
                    }

                });
            });
    }

    onSubmit() {

        this.model.roles = this.selectedOptions();
        if (this.formType === 'new' && !this.model.id) {
            this.service.postUsuario(this.model)
                .subscribe(x => {
                    this.toastr.success(this.modelName + ' adicionado com sucesso!');
                    this.onCancel();
                }, x => {
                    this.toastr.error(x);
                });
        } else {
            this.service.putUsuario(this.model)
                .subscribe(x => {
                    this.toastr.success(this.modelName + ' atualizado com sucesso!');
                    this.onCancel();
                }, x => {
                    this.toastr.error(x);
                });
        }
    }

    onCancel() {
        let link = ['/calcular/usuario'];
        this.router.navigate(link);
    }

	isInRole(role: string) {
		return this.user
			&& this.user.roles
			&& this.user.roles.indexOf(role) !== -1;
	}
}
