import { NgModule } from '@angular/core';
import { RouterModule } from '@angular/router';
import { CommonModule } from '@angular/common';

import { TipoAtividadeComponent } from './atividade.tipo.component';

import { AtividadeService } from './atividade.service';

import { PaginationModule, ModalModule } from 'ng2-bootstrap/ng2-bootstrap';
import { TextMaskModule } from 'angular2-text-mask';
import { ToastModule } from 'ng2-toastr/ng2-toastr';

let options: any = {
    animate: 'flyRight',
    positionClass: 'toast-bottom-right',
};

@NgModule({
    imports: [CommonModule, PaginationModule, RouterModule, TextMaskModule, ModalModule, ToastModule.forRoot(options)],
    providers: [AtividadeService],
    declarations: [TipoAtividadeComponent],
    exports: [TipoAtividadeComponent]
})
export class TipoAtividadeModule { }
