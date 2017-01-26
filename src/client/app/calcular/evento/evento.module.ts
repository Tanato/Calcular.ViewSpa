import { NgModule } from '@angular/core';
import { RouterModule } from '@angular/router';
import { CommonModule } from '@angular/common';
import { EventoMasterComponent } from './evento.master.component';
import { EventoService } from './evento.service';
import { PaginationModule, ModalModule } from 'ng2-bootstrap/ng2-bootstrap';
import { TextMaskModule } from 'angular2-text-mask';
import { ToastModule } from 'ng2-toastr/ng2-toastr';
import { BusyModule } from 'angular2-busy';

let options: any = {
    animate: 'flyRight',
    positionClass: 'toast-bottom-right',
};

@NgModule({
    imports: [CommonModule,
        PaginationModule,
        RouterModule,
        TextMaskModule,
        ModalModule,
        ToastModule.forRoot(options),
        BusyModule],
    providers: [EventoService],
    declarations: [EventoMasterComponent],
    exports: [EventoMasterComponent]
})
export class EventoMasterModule { }
