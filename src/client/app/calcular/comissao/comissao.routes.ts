import { Route } from '@angular/router';

import { ComissaoComponent, ApuracaoComponent } from './index';

export const ComissaoRoutes: Route[] = [
	{
		path: 'comissao/cadastro',
		component: ComissaoComponent
	},{
		path: 'comissao/apuracao',
		component: ApuracaoComponent
	},
];



