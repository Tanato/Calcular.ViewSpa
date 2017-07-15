import { NgModule } from '@angular/core';
import { RouterModule } from '@angular/router';
import { CommonModule } from '@angular/common';

import { UsuarioMasterComponent } from './usuario.master.component';
import { UsuarioDetailComponent } from './usuario.detail.component';

import { UsuarioAlterarSenhaComponent } from './usuario.alterar-senha.component';

import { UsuarioService } from './usuario.service';

import { PaginationModule, ModalModule } from 'ng2-bootstrap/ng2-bootstrap';
import { TextMaskModule } from 'angular2-text-mask';

import { EqualValidatorDirective } from '../../shared/tools/equal.validator';

import { Ng2AutoCompleteModule } from 'ng2-auto-complete';
import { BusyModule } from 'angular2-busy';

@NgModule({
    imports: [CommonModule, PaginationModule, RouterModule, TextMaskModule, ModalModule, BusyModule],
    providers: [UsuarioService],
    declarations: [UsuarioMasterComponent],
    exports: [UsuarioMasterComponent]
})
export class UsuarioMasterModule { }

@NgModule({
    imports: [CommonModule, PaginationModule, RouterModule, ModalModule, TextMaskModule,
        Ng2AutoCompleteModule, BusyModule],
    providers: [UsuarioService],
    declarations: [UsuarioDetailComponent],
    exports: [UsuarioDetailComponent]
})
export class UsuarioDetailModule { }

@NgModule({
    imports: [CommonModule, PaginationModule, RouterModule, TextMaskModule, BusyModule],
    providers: [UsuarioService],
    declarations: [UsuarioAlterarSenhaComponent, EqualValidatorDirective],
    exports: [UsuarioAlterarSenhaComponent]
})
export class UsuarioAlterarSenhaModule { }
