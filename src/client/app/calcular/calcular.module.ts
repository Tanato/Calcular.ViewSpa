import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';
import { DropdownModule } from 'ng2-bootstrap/ng2-bootstrap';
import { ModalModule } from 'ng2-bootstrap/ng2-bootstrap';

import { ClienteMasterModule, ClienteDetailModule } from './cliente/cliente.module';
import { ProcessoMasterModule, ProcessoDetailModule, ProcessoNotesModule } from './processo/processo.module';
import { UsuarioMasterModule, UsuarioDetailModule, UsuarioAlterarSenhaModule } from './usuario/usuario.module';
import { HonorarioMasterModule, HonorarioDetailModule } from './honorario/honorario.module';
import { ServicoMasterModule, ServicoDetailModule } from './servico/servico.module';
import { EventoMasterModule } from './evento/evento.module';

import { CalcularComponent } from './calcular.component';

import { HomeModule } from './home/home.module';

import { TopNavComponent } from '../shared/index';
import { SidebarComponent } from '../shared/index';

@NgModule({
    imports: [
        CommonModule,
        RouterModule,
        DropdownModule,
        ModalModule,
        HomeModule,
        ClienteMasterModule,
        ClienteDetailModule,
        ProcessoMasterModule,
        ProcessoDetailModule,
        ProcessoNotesModule,
        UsuarioMasterModule,
        UsuarioDetailModule,
        UsuarioAlterarSenhaModule,
        HonorarioMasterModule,
        HonorarioDetailModule,
        ServicoMasterModule,
        ServicoDetailModule,
        EventoMasterModule,
    ],
    declarations: [CalcularComponent, TopNavComponent, SidebarComponent],
    exports: [CalcularComponent, TopNavComponent, SidebarComponent]
})
export class CalcularModule { }
