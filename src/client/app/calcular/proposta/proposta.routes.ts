import { Route } from '@angular/router';

import { PropostaMasterComponent } from './index';
import { PropostaDetailComponent } from './index';

export const PropostaRoutes: Route[] = [
	{
		path: 'honorario/proposta',
		component: PropostaMasterComponent
	},
    {
		path: 'honorario/proposta/detail',
		component: PropostaDetailComponent
	},
];
