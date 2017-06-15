import { NgModule } from '@angular/core';
import { RouterModule } from '@angular/router';
import { CommonModule } from '@angular/common';

import { CobrancaMasterComponent } from './cobranca.master.component';
import { CobrancaDetailComponent } from './cobranca.detail.component';

import { CobrancaService } from './cobranca.service';
import { ProcessoService } from '../processo/processo.service';

import { PaginationModule, ModalModule, TooltipModule } from 'ng2-bootstrap/ng2-bootstrap';
import { TextMaskModule } from 'angular2-text-mask';

import { SelectModule } from 'ng2-select/ng2-select';
import { Ng2AutoCompleteModule } from 'ng2-auto-complete';
import { BusyModule } from 'angular2-busy';

@NgModule({
    imports: [CommonModule, PaginationModule, RouterModule, TextMaskModule,
        ModalModule, SelectModule, Ng2AutoCompleteModule, BusyModule, TooltipModule],
    providers: [CobrancaService, ProcessoService],
    declarations: [CobrancaDetailComponent, CobrancaMasterComponent],
    exports: [CobrancaDetailComponent, CobrancaMasterComponent]
})
export class CobrancaModule { }
