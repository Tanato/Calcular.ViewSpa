import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';
import { DropdownModule } from 'ng2-bootstrap/ng2-bootstrap';
import { ModalModule } from 'ng2-bootstrap/ng2-bootstrap';

import { ClienteModule } from './cliente/cliente.module';
import { ProcessoModule } from './processo/processo.module';
import { UsuarioMasterModule, UsuarioDetailModule, UsuarioAlterarSenhaModule } from './usuario/usuario.module';
import { HonorarioMasterModule, HonorarioDetailModule } from './honorario/honorario.module';
import { ServicoModule, HistoricoServicoModule, TipoServicoModule } from './servico/servico.module';
import { EventoMasterModule } from './evento/evento.module';
import { TipoAtividadeModule, AtividadeExecucaoModule, AtividadeResponsavelModule } from './atividade/atividade.module';
import { CobrancaModule } from './cobranca/cobranca.module';
import { PropostaMasterModule, PropostaDetailModule } from './proposta/proposta.module';
import { ComissaoModule } from './comissao/comissao.module';
import { SharedModule } from '../shared/shared.module';

import { CalcularComponent } from './calcular.component';

import { HomeModule } from './home/home.module';

import { } from '../shared';

import { TopNavComponent } from '../shared/index';
import { SidebarComponent } from '../shared/index';

@NgModule({
    imports: [
        CommonModule,
        RouterModule,
        DropdownModule,
        ModalModule,
        HomeModule,
        ClienteModule,
        ProcessoModule,
        UsuarioMasterModule,
        UsuarioDetailModule,
        UsuarioAlterarSenhaModule,
        HonorarioMasterModule,
        HonorarioDetailModule,
        HistoricoServicoModule,
        ServicoModule,
        TipoServicoModule,
        EventoMasterModule,
        TipoAtividadeModule,
        AtividadeExecucaoModule,
        AtividadeResponsavelModule,
        CobrancaModule,
        PropostaMasterModule,
        PropostaDetailModule,
        ComissaoModule,
        SharedModule.forRoot(),
    ],
    declarations: [CalcularComponent, TopNavComponent, SidebarComponent],
    exports: [CalcularComponent, TopNavComponent, SidebarComponent]
})
export class CalcularModule { }
