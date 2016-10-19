import { NgModule } from '@angular/core';
import { RouterModule } from '@angular/router';
import { CommonModule } from '@angular/common';

import { ClienteMasterComponent } from './cliente.master.component';
import { ClienteDetailComponent } from './cliente.detail.component';

import { ClienteService } from './cliente.service';

import { PaginationModule } from 'ng2-bootstrap/ng2-bootstrap';

@NgModule({
    imports: [CommonModule, PaginationModule, RouterModule],
    providers: [ClienteService],
    declarations: [ClienteMasterComponent],
    exports: [ClienteMasterComponent]
})
export class ClienteMasterModule { }

@NgModule({
    imports: [CommonModule, PaginationModule, RouterModule],
    providers: [ClienteService],
    declarations: [ClienteDetailComponent],
    exports: [ClienteDetailComponent]
})
export class ClienteDetailModule { }
