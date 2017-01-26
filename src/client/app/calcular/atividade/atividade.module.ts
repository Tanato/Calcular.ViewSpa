import { NgModule } from '@angular/core';
import { RouterModule } from '@angular/router';
import { CommonModule } from '@angular/common';

import { TipoAtividadeComponent } from './atividade.tipo.component';
import { AtividadeExecucaoMasterComponent } from './execucao.master.component';
import { AtividadeExecucaoDetailComponent } from './execucao.detail.component';

import { AtividadeService } from './atividade.service';

import { PaginationModule, ModalModule } from 'ng2-bootstrap/ng2-bootstrap';
import { TextMaskModule } from 'angular2-text-mask';
import { ToastModule } from 'ng2-toastr/ng2-toastr';

import { SelectModule } from 'ng2-select/ng2-select';
import { Ng2AutoCompleteModule } from 'ng2-auto-complete';
import { BusyModule } from 'angular2-busy';

let options: any = {
    animate: 'flyRight',
    positionClass: 'toast-bottom-right',
};

@NgModule({
    imports: [CommonModule, PaginationModule, RouterModule, TextMaskModule, ModalModule, ToastModule.forRoot(options), BusyModule],
    providers: [AtividadeService],
    declarations: [TipoAtividadeComponent],
    exports: [TipoAtividadeComponent]
})
export class TipoAtividadeModule { }

@NgModule({
    imports: [CommonModule, PaginationModule, RouterModule, TextMaskModule,
        ToastModule.forRoot(options), SelectModule, Ng2AutoCompleteModule, BusyModule],
    providers: [AtividadeService],
    declarations: [AtividadeExecucaoMasterComponent],
    exports: [AtividadeExecucaoMasterComponent]
})
export class AtividadeExecucaoMasterModule { }

@NgModule({
    imports: [CommonModule, PaginationModule, RouterModule, TextMaskModule,
        ToastModule.forRoot(options), SelectModule, Ng2AutoCompleteModule, BusyModule],
    providers: [AtividadeService],
    declarations: [AtividadeExecucaoDetailComponent],
    exports: [AtividadeExecucaoDetailComponent]
})
export class AtividadeExecucaoDetailModule { }