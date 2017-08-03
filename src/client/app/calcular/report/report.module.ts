import { NgModule } from '@angular/core';
import { RouterModule } from '@angular/router';
import { CommonModule } from '@angular/common';
import { ReportService } from './report.service';
import { PaginationModule, ModalModule } from 'ng2-bootstrap/ng2-bootstrap';
import { TextMaskModule } from 'angular2-text-mask';
import { BusyModule } from 'angular2-busy';

import { SharedModule } from '../../shared/shared.module';

import {
    ReportCustoProcessoComponent,
    ReportProdutividadeColaboradorComponent,
    ReportHonorariosComponent
} from './report.component';

@NgModule({
    imports: [CommonModule,
        PaginationModule,
        RouterModule,
        TextMaskModule,
        ModalModule,
        BusyModule,
        SharedModule],
    providers: [ReportService],
    declarations: [ReportCustoProcessoComponent,
        ReportProdutividadeColaboradorComponent,
        ReportHonorariosComponent
    ],
    exports: [ReportCustoProcessoComponent,
        ReportProdutividadeColaboradorComponent,
        ReportHonorariosComponent
    ]
})
export class ReportModule { }
