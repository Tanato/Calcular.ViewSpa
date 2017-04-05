import { NgModule } from '@angular/core';
import { RouterModule } from '@angular/router';
import { CommonModule } from '@angular/common';

import { ClienteMasterComponent } from './cliente.master.component';
import { ClienteDetailComponent } from './cliente.detail.component';

import { ClienteService } from './cliente.service';

import { PaginationModule, ModalModule } from 'ng2-bootstrap/ng2-bootstrap';
import { TextMaskModule } from 'angular2-text-mask';
import { ToastModule } from 'ng2-toastr/ng2-toastr';

import { Ng2AutoCompleteModule } from 'ng2-auto-complete';
import { BusyModule } from 'angular2-busy';

@NgModule({
    imports: [CommonModule, PaginationModule, RouterModule, TextMaskModule, ModalModule, BusyModule, Ng2AutoCompleteModule],
    providers: [ClienteService],
    declarations: [ClienteMasterComponent, ClienteDetailComponent],
    exports: [ClienteMasterComponent, ClienteDetailComponent]
})
export class ClienteModule { }
