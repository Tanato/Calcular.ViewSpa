import { Route } from '@angular/router';
import { ReportCustoProcessoComponent,
	ReportProdutividadeColaboradorComponent,
	ReportHonorariosComponent
 } from './index';

export const ReportRoutes: Route[] = [
	{
		path: 'report/custoprocesso',
		component: ReportCustoProcessoComponent
	},
	{
		path: 'report/produtividadecolaborador',
		component: ReportProdutividadeColaboradorComponent
	},
	{
		path: 'report/honorarios',
		component: ReportHonorariosComponent
	}
];
