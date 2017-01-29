import { Route } from '@angular/router';

import { ServicoMasterComponent } from './index';
import { ServicoDetailComponent } from './index';
import { TipoServicoComponent } from './index';

export const ServicoRoutes: Route[] = [
	{
		path: 'servico/tipo',
		component: TipoServicoComponent
	},
	{
		path: 'servico/cadastro',
		component: ServicoMasterComponent
	},
	{
		path: 'servico/detail',
		component: ServicoDetailComponent
	},
];
