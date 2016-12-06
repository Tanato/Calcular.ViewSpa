import { Route } from '@angular/router';

import { ServicoMasterComponent } from './index';
import { ServicoDetailComponent } from './index';

export const ServicoRoutes: Route[] = [
	{
		path: 'servico/cadastro',
		component: ServicoMasterComponent
	},
    {
		path: 'servico/detail',
		component: ServicoDetailComponent
	},
];
