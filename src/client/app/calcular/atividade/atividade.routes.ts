import { Route } from '@angular/router';

import {
	TipoAtividadeComponent,
	AtividadeExecucaoMasterComponent,
	AtividadeExecucaoDetailComponent,
	AtividadeResponsavelComponent
} from './index';

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
	{
		path: 'atividade/resposavel/status',
		component: AtividadeResponsavelComponent
	},
];



