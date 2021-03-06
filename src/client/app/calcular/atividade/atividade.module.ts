import { NgModule } from '@angular/core';
import { RouterModule } from '@angular/router';
import { CommonModule } from '@angular/common';

import { TipoAtividadeComponent } from './atividade.tipo.component';
import { AtividadeExecucaoMasterComponent } from './execucao.master.component';
import { AtividadeExecucaoDetailComponent } from './execucao.detail.component';
import { AtividadeResponsavelComponent } from './atividade.responsavel.component';

import { AtividadeService } from './atividade.service';

import { PaginationModule, ModalModule } from 'ng2-bootstrap/ng2-bootstrap';
import { TextMaskModule } from 'angular2-text-mask';

import { SelectModule } from 'ng2-select/ng2-select';
import { Ng2AutoCompleteModule } from 'ng2-auto-complete';
import { BusyModule } from 'angular2-busy';

@NgModule({
    imports: [CommonModule, PaginationModule, RouterModule, TextMaskModule, ModalModule, BusyModule],
    providers: [AtividadeService],
    declarations: [TipoAtividadeComponent],
    exports: [TipoAtividadeComponent]
})
export class TipoAtividadeModule { }

@NgModule({
    imports: [CommonModule, PaginationModule, RouterModule, TextMaskModule,
        SelectModule, Ng2AutoCompleteModule, BusyModule],
    providers: [AtividadeService],
    declarations: [AtividadeExecucaoMasterComponent, AtividadeExecucaoDetailComponent],
    exports: [AtividadeExecucaoMasterComponent, AtividadeExecucaoDetailComponent]
})
export class AtividadeExecucaoModule { }

@NgModule({
    imports: [CommonModule, PaginationModule, RouterModule, TextMaskModule,
        SelectModule, Ng2AutoCompleteModule, BusyModule],
    providers: [AtividadeService],
    declarations: [AtividadeResponsavelComponent],
    exports: [AtividadeResponsavelComponent]
})
export class AtividadeResponsavelModule { }
