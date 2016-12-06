import { Route } from '@angular/router';

import { TipoAtividadeComponent } from './index';
import { AtividadeExecucaoMasterComponent } from './index';
import { AtividadeExecucaoDetailComponent } from './index';

export const AtividadeRoutes: Route[] = [
	{
		path: 'atividade/tipo',
		component: TipoAtividadeComponent
	},
	{
		path: 'atividade/execucao',
		component: AtividadeExecucaoMasterComponent
	},
	{
		path: 'atividade/execucao/detail',
		component: AtividadeExecucaoDetailComponent
	},
];



