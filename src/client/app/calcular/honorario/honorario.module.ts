import { NgModule } from '@angular/core';
import { RouterModule } from '@angular/router';
import { CommonModule } from '@angular/common';

import { HonorarioMasterComponent } from './honorario.master.component';
import { HonorarioDetailComponent } from './honorario.detail.component';

import { HonorarioService } from './honorario.service';
import { ProcessoService } from '../processo/processo.service';

import { PaginationModule, ModalModule } from 'ng2-bootstrap/ng2-bootstrap';
import { TextMaskModule } from 'angular2-text-mask';

import { SelectModule } from 'ng2-select/ng2-select';
import { Ng2AutoCompleteModule } from 'ng2-auto-complete';
import { BusyModule } from 'angular2-busy';

@NgModule({
    imports: [CommonModule, PaginationModule, RouterModule, TextMaskModule,
        ModalModule, SelectModule, BusyModule],
    providers: [HonorarioService, ProcessoService],
    declarations: [HonorarioMasterComponent],
    exports: [HonorarioMasterComponent]
})
export class HonorarioMasterModule { }

@NgModule({
    imports: [CommonModule, PaginationModule, RouterModule, TextMaskModule,
        ModalModule, SelectModule, Ng2AutoCompleteModule, BusyModule],
    providers: [HonorarioService, ProcessoService],
    declarations: [HonorarioDetailComponent],
    exports: [HonorarioDetailComponent]
})
export class HonorarioDetailModule { }
