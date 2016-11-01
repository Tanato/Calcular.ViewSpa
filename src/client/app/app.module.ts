import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { FormsModule } from '@angular/forms';
import { APP_BASE_HREF } from '@angular/common';
import { RouterModule, Router } from '@angular/router';
import { HttpModule, XHRBackend, RequestOptions, Http } from '@angular/http';
import { AppComponent } from './app.component';
import { routes } from './app.routes';
import { AuthHttp } from './auth.http';
import { TopnavService } from './shared/topnav/topnav.service';
import * as _ from 'lodash';

import { LoginModule } from './login/login.module';
import { SignupModule } from './signup/signup.module';
import { DashboardModule } from './dashboard/dashboard.module';
import { CalcularModule } from './calcular/calcular.module';
import { SharedModule } from './shared/shared.module';

export function httpFactory(backend: XHRBackend, defaultOptions: RequestOptions, router: Router) {
	return new AuthHttp(backend, defaultOptions, router);
}

@NgModule({
	imports: [
		BrowserModule,
		FormsModule,
		HttpModule,
		RouterModule.forRoot(routes),
		LoginModule,
		SignupModule,
		//DashboardModule,
		CalcularModule,
		SharedModule.forRoot()
	],
	declarations: [AppComponent],
	providers: [{
		provide: APP_BASE_HREF,
		useValue: '<%= APP_BASE %>',
	}, {
		provide: Http,
		useFactory: httpFactory,
		deps: [XHRBackend, RequestOptions, Router]
	},
		TopnavService,
	],
	bootstrap: [AppComponent]
})
export class AppModule { }