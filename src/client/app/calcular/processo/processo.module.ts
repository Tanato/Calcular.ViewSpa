import { NgModule } from '@angular/core';
import { RouterModule } from '@angular/router';
import { CommonModule } from '@angular/common';

import { ProcessoMasterComponent } from './processo.master.component';
import { ProcessoDetailComponent } from './processo.detail.component';

import { ProcessoService } from './processo.service';

import { PaginationModule, ModalModule } from 'ng2-bootstrap/ng2-bootstrap';
import { TextMaskModule } from 'angular2-text-mask';
import { ToastModule } from 'ng2-toastr/ng2-toastr';

let options: any = {
    animate: 'flyRight',
    positionClass: 'toast-bottom-right',
};

@NgModule({
    imports: [CommonModule, PaginationModule, RouterModule, TextMaskModule, ModalModule, ToastModule.forRoot(options)],
    providers: [ProcessoService],
    declarations: [ProcessoMasterComponent],
    exports: [ProcessoMasterComponent]
})
export class ProcessoMasterModule { }

@NgModule({
    imports: [CommonModule, PaginationModule, RouterModule, TextMaskModule, ToastModule.forRoot(options)],
    providers: [ProcessoService],
    declarations: [ProcessoDetailComponent],
    exports: [ProcessoDetailComponent]
})
export class ProcessoDetailModule { }
