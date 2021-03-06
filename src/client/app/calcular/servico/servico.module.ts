import { NgModule } from '@angular/core';
import { RouterModule } from '@angular/router';
import { CommonModule } from '@angular/common';

import { ServicoMasterComponent } from './servico.master.component';
import { ServicoDetailComponent } from './servico.detail.component';
import { ServicoHistoricoMasterComponent } from './historico.master.component';
import { ServicoHistoricoDetailComponent } from './historico.detail.component';
import { TipoServicoComponent } from './servico.tipo.component';
import { FilterEtapaAtividadePipe } from './servico.filter.pipes';

import { ServicoService } from './servico.service';
import { ProcessoService } from '../processo/processo.service';
import { AtividadeService } from '../atividade/atividade.service';

import { PaginationModule, ModalModule } from 'ng2-bootstrap/ng2-bootstrap';
import { TextMaskModule } from 'angular2-text-mask';

import { SelectModule } from 'ng2-select/ng2-select';
import { Ng2AutoCompleteModule } from 'ng2-auto-complete';
import { BusyModule } from 'angular2-busy';

@NgModule({
    imports: [CommonModule, PaginationModule, RouterModule, TextMaskModule, ModalModule, BusyModule],
    providers: [ServicoService],
    declarations: [TipoServicoComponent],
    exports: [TipoServicoComponent]
})
export class TipoServicoModule { }

@NgModule({
    imports: [CommonModule, PaginationModule, RouterModule, TextMaskModule,
        ModalModule, SelectModule, Ng2AutoCompleteModule, BusyModule],
    providers: [ServicoService, ProcessoService, AtividadeService],
    declarations: [ServicoHistoricoMasterComponent, ServicoHistoricoDetailComponent],
    exports: [ServicoHistoricoMasterComponent, ServicoHistoricoDetailComponent]
})
export class HistoricoServicoModule { }

@NgModule({
    imports: [CommonModule, PaginationModule, RouterModule, TextMaskModule,
        ModalModule, SelectModule, Ng2AutoCompleteModule, BusyModule],
    providers: [ServicoService, ProcessoService, AtividadeService],
    declarations: [ServicoMasterComponent, ServicoDetailComponent, FilterEtapaAtividadePipe],
    exports: [ServicoMasterComponent, ServicoDetailComponent]
})
export class ServicoModule { }
