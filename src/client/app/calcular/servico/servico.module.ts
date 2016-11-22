import { NgModule } from '@angular/core';
import { RouterModule } from '@angular/router';
import { CommonModule } from '@angular/common';

import { ServicoMasterComponent } from './servico.master.component';
import { ServicoDetailComponent } from './servico.detail.component';

import { ServicoService } from './servico.service';
import { ProcessoService } from '../processo/processo.service';
import { AtividadeService } from '../atividade/atividade.service';

import { PaginationModule, ModalModule } from 'ng2-bootstrap/ng2-bootstrap';
import { TextMaskModule } from 'angular2-text-mask';
import { ToastModule } from 'ng2-toastr/ng2-toastr';
import * as $ from 'jquery';

import { SelectModule } from 'ng2-select/ng2-select';
import { Ng2AutoCompleteModule } from 'ng2-auto-complete';

let options: any = {
    animate: 'flyRight',
    positionClass: 'toast-bottom-right',
};

@NgModule({
    imports: [CommonModule, PaginationModule, RouterModule, TextMaskModule,
        ModalModule, ToastModule.forRoot(options), SelectModule],
    providers: [ServicoService, ProcessoService, AtividadeService],
    declarations: [ServicoMasterComponent],
    exports: [ServicoMasterComponent]
})
export class ServicoMasterModule { }

@NgModule({
    imports: [CommonModule, PaginationModule, RouterModule, TextMaskModule,
        ModalModule, ToastModule.forRoot(options), SelectModule, Ng2AutoCompleteModule],
    providers: [ServicoService, ProcessoService, AtividadeService],
    declarations: [ServicoDetailComponent],
    exports: [ServicoDetailComponent]
})
export class ServicoDetailModule { }