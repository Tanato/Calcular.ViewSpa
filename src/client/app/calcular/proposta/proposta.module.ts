import { NgModule } from '@angular/core';
import { RouterModule } from '@angular/router';
import { CommonModule } from '@angular/common';

import { PropostaMasterComponent } from './proposta.master.component';
import { PropostaDetailComponent } from './proposta.detail.component';

import { PropostaService } from './proposta.service';
import { ProcessoService } from '../processo/processo.service';

import { PaginationModule, ModalModule } from 'ng2-bootstrap/ng2-bootstrap';
import { TextMaskModule } from 'angular2-text-mask';

import { SelectModule } from 'ng2-select/ng2-select';
import { Ng2AutoCompleteModule } from 'ng2-auto-complete';
import { BusyModule } from 'angular2-busy';

@NgModule({
    imports: [CommonModule, PaginationModule, RouterModule, TextMaskModule,
        ModalModule, SelectModule, BusyModule],
    providers: [PropostaService, ProcessoService],
    declarations: [PropostaMasterComponent],
    exports: [PropostaMasterComponent]
})
export class PropostaMasterModule { }

@NgModule({
    imports: [CommonModule, PaginationModule, RouterModule, TextMaskModule,
        ModalModule, SelectModule, Ng2AutoCompleteModule, BusyModule],
    providers: [PropostaService, ProcessoService],
    declarations: [PropostaDetailComponent],
    exports: [PropostaDetailComponent]
})
export class PropostaDetailModule { }
