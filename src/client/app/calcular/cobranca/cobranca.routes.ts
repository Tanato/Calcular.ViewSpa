import { Route } from '@angular/router';

import { CobrancaMasterComponent } from './index';
import { CobrancaDetailComponent } from './index';

export const CobrancaRoutes: Route[] = [
	{
		path: 'honorario/cobranca',
		component: CobrancaMasterComponent
	},
    {
		path: 'honorario/cobranca/detail',
		component: CobrancaDetailComponent
	},
];
