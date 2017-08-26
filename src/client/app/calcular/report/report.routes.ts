import { Route } from '@angular/router';
import { ReportCustoProcessoComponent,
	ReportProdutividadeColaboradorComponent,
	ReportHonorariosComponent,
	ReportTipoProcessoComponent,
	ReportTempoProdutividadeComponent
 } from './index';

export const ReportRoutes: Route[] = [
	{
		path: 'report/custocomissao',
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
	},
	{
		path: 'report/tempoprodutividade',
		component: ReportTempoProdutividadeComponent
	}
];
