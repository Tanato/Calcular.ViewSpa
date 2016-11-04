import { Route } from '@angular/router';

import { ProcessoMasterComponent } from './index';
import { ProcessoDetailComponent } from './index';

export const ProcessoRoutes: Route[] = [
	{
		path: 'processo',
		component: ProcessoMasterComponent
	},
    {
		path: 'processo/detail',
		component: ProcessoDetailComponent
	},
];
