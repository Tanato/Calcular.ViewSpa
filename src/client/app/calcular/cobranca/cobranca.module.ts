import { NgModule } from '@angular/core';
import { RouterModule } from '@angular/router';
import { CommonModule } from '@angular/common';

import { CobrancaMasterComponent } from './cobranca.master.component';
import { CobrancaDetailComponent } from './cobranca.detail.component';

import { CobrancaService } from './cobranca.service';
import { ProcessoService } from '../processo/processo.service';

import { PaginationModule, ModalModule } from 'ng2-bootstrap/ng2-bootstrap';
import { TextMaskModule } from 'angular2-text-mask';
import { ToastModule } from 'ng2-toastr/ng2-toastr';

import { SelectModule } from 'ng2-select/ng2-select';
import { Ng2AutoCompleteModule } from 'ng2-auto-complete';

let options: any = {
    animate: 'flyRight',
    positionClass: 'toast-bottom-right',
};

@NgModule({
    imports: [CommonModule, PaginationModule, RouterModule, TextMaskModule,
        ModalModule, ToastModule.forRoot(options), SelectModule],
    providers: [CobrancaService, ProcessoService],
    declarations: [CobrancaMasterComponent],
    exports: [CobrancaMasterComponent]
})
export class CobrancaMasterModule { }

@NgModule({
    imports: [CommonModule, PaginationModule, RouterModule, TextMaskModule,
        ModalModule, ToastModule.forRoot(options), SelectModule, Ng2AutoCompleteModule],
    providers: [CobrancaService, ProcessoService],
    declarations: [CobrancaDetailComponent],
    exports: [CobrancaDetailComponent]
})
export class CobrancaDetailModule { }
