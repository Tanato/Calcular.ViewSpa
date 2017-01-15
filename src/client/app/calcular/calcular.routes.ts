import { Route } from '@angular/router';

import { HomeRoutes } from './home/index';
import { ClienteRoutes } from './cliente/index';
import { ProcessoRoutes } from './processo/index';
import { UsuarioRoutes } from './usuario/index';
import { HonorarioRoutes } from './honorario/index';
import { ServicoRoutes } from './servico/index';
import { EventoRoutes } from './evento/index';
import { AtividadeRoutes } from './atividade/index';
import { CobrancaRoutes } from './cobranca/index';
import { PropostaRoutes } from './proposta/index';
import { ComissaoRoutes } from './comissao/index';

import { CalcularComponent } from './index';

export const CalcularRoutes: Route[] = [
	{
		path: 'calcular',
		component: CalcularComponent,
		children: [
			...HomeRoutes,
			...ClienteRoutes,
			...ProcessoRoutes,
			...UsuarioRoutes,
			...HonorarioRoutes,
			...ServicoRoutes,
			...EventoRoutes,
			...AtividadeRoutes,
			...CobrancaRoutes,
			...PropostaRoutes,
			...ComissaoRoutes,
		]
	}
];
