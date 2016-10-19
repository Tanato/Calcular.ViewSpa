import { Route } from '@angular/router';

import { HomeRoutes } from './home/index';
import { ClienteRoutes } from './cliente/index';

import { CalcularComponent } from './index';

export const CalcularRoutes: Route[] = [
  	{
    	path: 'calcular',
    	component: CalcularComponent,
    	children: [
			...HomeRoutes,
			...ClienteRoutes
    	]
  	}
];
