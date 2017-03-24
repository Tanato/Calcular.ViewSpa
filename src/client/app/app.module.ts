import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { FormsModule } from '@angular/forms';
import { APP_BASE_HREF } from '@angular/common';
import { RouterModule, Router } from '@angular/router';
import { HttpModule, XHRBackend, RequestOptions, Http } from '@angular/http';
import { AppComponent } from './app.component';
import { routes } from './app.routes';
import { AuthHttp } from './auth.http';

import { LoginModule } from './login/login.module';
import { SignupModule } from './signup/signup.module';
import { CalcularModule } from './calcular/calcular.module';
import { SharedModule } from './shared/shared.module';
import { BusyModule, BusyConfig } from 'angular2-busy';
import { ToastModule, ToastOptions } from 'ng2-toastr/ng2-toastr';
import { ComponentsHelper } from 'ng2-bootstrap/ng2-bootstrap';
import { CustomOption } from './toastr-config';

import { UserService } from './shared/user/user.service';

export function httpFactory(backend: XHRBackend, defaultOptions: RequestOptions, router: Router) {
	return new AuthHttp(backend, defaultOptions, router);
}

var busyConfig = new BusyConfig({
	message: 'Carregando...',
});

@NgModule({
	imports: [
		BrowserModule,
		FormsModule,
		HttpModule,
		RouterModule.forRoot(routes),
		ToastModule.forRoot(),
		LoginModule,
		SignupModule,
		CalcularModule,
		SharedModule.forRoot(),
		BusyModule.forRoot(busyConfig),
	],
	declarations: [AppComponent],
	providers: [{
		provide: APP_BASE_HREF,
		useValue: '<%= APP_BASE %>',
	}, {
		provide: Http,
		useFactory: httpFactory,
		deps: [XHRBackend, RequestOptions, Router]
	}, {
		provide: ComponentsHelper,
		useClass: ComponentsHelper
	}, {
		provide: ToastOptions, useClass: CustomOption
	},
		UserService,
	],
	bootstrap: [AppComponent]
})
export class AppModule { }
