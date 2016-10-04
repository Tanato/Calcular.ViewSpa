import { Component } from '@angular/core';
import { Router, RouterLink } from '@angular/router';
import { LoginService } from './login.service';
import { ILogin } from '../shared/interfaces';
import { Cookie } from 'ng2-cookies/ng2-cookies';

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

	constructor(public router: Router, private loginService: LoginService) { }

	onSubmit() {
		this.login.password = this.password;
		this.login.username = this.username;
		this.loginService.userLogin(this.login)
			.subscribe(response => {
				this.router.navigateByUrl('dashboard/home');
			},
			error => {
				alert(error);
				console.log(error);
			});
	}
}
