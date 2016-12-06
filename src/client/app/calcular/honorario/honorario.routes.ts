import { Route } from '@angular/router';

import { HonorarioMasterComponent } from './index';
import { HonorarioDetailComponent } from './index';
//import { HonorarioCobrancaComponent } from './index';
//import { HonorarioPropostaComponent } from './index';

export const HonorarioRoutes: Route[] = [
	{
		path: 'honorario/cadastro',
		component: HonorarioMasterComponent
	},
    {
		path: 'honorario/detail',
		component: HonorarioDetailComponent
	},
	// {
	// 	path: 'honorario/cobranca',
	// 	component: HonorarioCobrancaComponent
	// },
	// {
	// 	path: 'honorario/proposta',
	// 	component: HonorarioPropostaComponent
	// },
];
