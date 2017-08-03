import { Route } from '@angular/router';
import { ReportCustoProcessoComponent,
	ReportProdutividadeColaboradorComponent,
	ReportHonorariosComponent,
	ReportTipoProcessoComponent
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
	},
	{
		path: 'report/tipoprocesso',
		component: ReportTipoProcessoComponent
	}
];
