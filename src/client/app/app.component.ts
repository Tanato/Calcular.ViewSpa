import { Component, ViewContainerRef } from '@angular/core';
import { Config } from './shared/index';
import { ToastsManager } from 'ng2-toastr/ng2-toastr';

import { UserService } from './shared/user/user.service';
import { ComponentsHelper } from 'ng2-bootstrap/ng2-bootstrap';

ComponentsHelper.prototype.getRootViewContainerRef = function () {
	// https://github.com/angular/angular/issues/9293
	if (this.root) {
		return this.root;
	}
	var comps = this.applicationRef.components;
	if (!comps.length) {
		throw new Error('ApplicationRef instance not found');
	}
	try {
		/* one more ugly hack, read issue above for details */
		var rootComponent = this.applicationRef._rootComponents[0];
		//this.root = rootComponent._hostElement.vcRef;
		this.root = rootComponent._component.viewContainerRef;
		return this.root;
	} catch (e) {
		throw new Error('ApplicationRef instance not found');
	}
};

/**
 * This class represents the main application component. Within the @Routes annotation is the configuration of the
 * applications routes, configuring the paths for the lazy loaded components (HomeComponent, AboutComponent).
 */
@Component({
	moduleId: module.id,
	selector: 'sd-app',
	templateUrl: 'app.component.html',
})
export class AppComponent {
	private viewContainerRef: ViewContainerRef;
	public constructor(private toastr: ToastsManager,
		componentsHelper: ComponentsHelper,
		viewContainerRef: ViewContainerRef,
		private userService: UserService) {
		// You need this small hack in order to catch application root view container ref

		this.toastr.setRootViewContainerRef(viewContainerRef);
		this.viewContainerRef = viewContainerRef;
		console.log('Environment config', Config);

		userService.getUser();
	}
}
