import { NgModule } from '@angular/core';
import { RouterModule } from '@angular/router';
import { CommonModule } from '@angular/common';

import { ComissaoComponent } from './comissao.component';
import { ApuracaoComponent } from './apuracao.component';

import { ComissaoService } from './comissao.service';

import { PaginationModule, ModalModule, TooltipModule } from 'ng2-bootstrap/ng2-bootstrap';
import { TextMaskModule } from 'angular2-text-mask';

import { SharedModule } from '../../shared/shared.module';

import { BusyModule } from 'angular2-busy';

@NgModule({
    imports: [CommonModule, PaginationModule, RouterModule, TextMaskModule, ModalModule, BusyModule,
        TooltipModule, SharedModule],
    providers: [ComissaoService],
    declarations: [ComissaoComponent, ApuracaoComponent],
    exports: [ComissaoComponent, ApuracaoComponent]
})
export class ComissaoModule { }
