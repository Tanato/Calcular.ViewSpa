import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { LoginService } from './login.service';
import { ILogin } from '../shared/interfaces';

import { ToastsManager } from 'ng2-toastr/ng2-toastr';

/**
*	This class represents the lazy loaded LoginComponent.
*/

@Component({
	moduleId: module.id,
	selector: 'login-cmp',
	templateUrl: 'login.component.html'
})
export class LoginComponent {

	username: string;
	password: string;
	login: ILogin = {} as ILogin;

	constructor(public router: Router,
		private loginService: LoginService,
		private toastr: ToastsManager) { }

	onSubmit() {
		this.login.password = this.password;
		this.login.username = this.username;
		this.loginService.userLogin(this.login)
			.subscribe(response => {
				this.router.navigateByUrl('calcular/home');
			},
			error => {
				this.toastr.error(error);
				console.log(error);
			});
	}
}
