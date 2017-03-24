import { NgModule } from '@angular/core';
import { RouterModule } from '@angular/router';
import { CommonModule } from '@angular/common';
import { EventoMasterComponent } from './evento.master.component';
import { EventoService } from './evento.service';
import { PaginationModule, ModalModule } from 'ng2-bootstrap/ng2-bootstrap';
import { TextMaskModule } from 'angular2-text-mask';
import { BusyModule } from 'angular2-busy';

import {
    BirthDayComponent,
    AtividadeComponent,
    DistribuirServicoComponent,
    EnviarServicoComponent,
    AtividadeRefazerComponent,
    AtividadeRevisarComponent,
    PrazoServicoComponent,
} from './evento.master.component';

import { AlocacaoComponent } from './alocacao-calculista.component';

@NgModule({
    imports: [CommonModule,
        PaginationModule,
        RouterModule,
        TextMaskModule,
        ModalModule,
        BusyModule],
    providers: [EventoService],
    declarations: [EventoMasterComponent,
        BirthDayComponent,
        AtividadeComponent,
        DistribuirServicoComponent,
        EnviarServicoComponent,
        AtividadeRefazerComponent,
        AtividadeRevisarComponent,
        PrazoServicoComponent,
        AlocacaoComponent,
    ],
    exports: [EventoMasterComponent,
        BirthDayComponent,
        AtividadeComponent,
        DistribuirServicoComponent,
        EnviarServicoComponent,
        AtividadeRefazerComponent,
        AtividadeRevisarComponent,
        PrazoServicoComponent,
        AlocacaoComponent,
    ]
})
export class EventoMasterModule { }
