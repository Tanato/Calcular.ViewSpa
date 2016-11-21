import { Route } from '@angular/router';

import { ProcessoMasterComponent } from './index';
import { ProcessoDetailComponent } from './index';
import { ProcessoNotesComponent } from './index';

export const ProcessoRoutes: Route[] = [
	{
		path: 'processo/cadastro',
		component: ProcessoMasterComponent
	},
    {
		path: 'processo/detail',
		component: ProcessoDetailComponent
	},
	{
		path: 'processo/notes',
		component: ProcessoNotesComponent
	},
];
