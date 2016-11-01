import { NgModule } from '@angular/core';
import { RouterModule } from '@angular/router';
import { CommonModule } from '@angular/common';

import { ClienteMasterComponent } from './cliente.master.component';
import { ClienteDetailComponent } from './cliente.detail.component';

import { ClienteService } from './cliente.service';

import { PaginationModule, ModalModule } from 'ng2-bootstrap/ng2-bootstrap';
import { TextMaskModule } from 'angular2-text-mask';
import {ToastModule, ToastOptions} from 'ng2-toastr/ng2-toastr';

let options: any = {
  animate: 'flyRight',
  positionClass: 'toast-bottom-right',
};

@NgModule({
    imports: [CommonModule, PaginationModule, RouterModule, TextMaskModule, ModalModule, ToastModule.forRoot(options)],
    providers: [ClienteService],
    declarations: [ClienteMasterComponent],
    exports: [ClienteMasterComponent]
})
export class ClienteMasterModule { }

@NgModule({
    imports: [CommonModule, PaginationModule, RouterModule, TextMaskModule, ToastModule.forRoot(options)],
    providers: [ClienteService],
    declarations: [ClienteDetailComponent],
    exports: [ClienteDetailComponent]
})
export class ClienteDetailModule { }
