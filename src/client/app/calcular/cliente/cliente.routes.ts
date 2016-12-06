import { Route } from '@angular/router';

import { ClienteMasterComponent } from './index';
import { ClienteDetailComponent } from './index';

export const ClienteRoutes: Route[] = [
	{
		path: 'cliente',
		component: ClienteMasterComponent
	},
    {
		path: 'cliente/detail',
		component: ClienteDetailComponent
	},
];
