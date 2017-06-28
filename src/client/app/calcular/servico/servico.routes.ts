import { Route } from '@angular/router';

import {
	ServicoMasterComponent,
	ServicoDetailComponent,
	TipoServicoComponent,
	ServicoHistoricoMasterComponent,
	ServicoHistoricoDetailComponent,
} from './index';

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
	{
		path: 'servico/historico',
		component: ServicoHistoricoMasterComponent
	},
	{
		path: 'servico/historico/detail',
		component: ServicoHistoricoDetailComponent
	},
];
