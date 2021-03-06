import { Component, OnInit } from '@angular/core';
import { Processo } from '../processo/processo.model';
import { ProcessoService } from '../processo/processo.service';
import { ClienteService } from '../cliente/cliente.service';
import { Cobranca, CobrancaDetail } from './cobranca.model';
import { CobrancaService } from './cobranca.service';
import { Observable } from 'rxjs/Observable';
import { ActivatedRoute, Router } from '@angular/router';
import { IKeyValuePair } from '../../shared/interfaces';

import { ToastsManager } from 'ng2-toastr/ng2-toastr';
import createNumberMask from 'text-mask-addons/dist/createNumberMask.js';
import { Subscription } from 'rxjs';

import * as _ from 'lodash';

@Component({
    moduleId: module.id,
    selector: 'cobrancadetail-cmp',
    templateUrl: './cobranca.detail.component.html'
})
export class CobrancaDetailComponent implements OnInit {

    private wtoInput: NodeJS.Timer;

    private modelName = 'Cobrança';

    private model: CobrancaDetail;
    private cobranca: Cobranca = new Cobranca;
    private parte: IKeyValuePair[];
    private perfil: IKeyValuePair[];

    private formType: string = 'new';
    private blockEdit: boolean = true;

    private isAddCobranca: boolean = false;

    private params: Observable<{ [key: string]: any }>;
    private moneyMask: any = createNumberMask({ prefix: 'R$ ', includeThousandsSeparator: false, allowNegative: true, allowDecimal: true });

    private busy: Subscription;

    contato = (startsWith: string): Observable<any[]> => {
        var result = this.service.getContatoSelect(startsWith);
        return result;
    }

    constructor(public service: CobrancaService,
        public clienteService: ClienteService,
        private processoService: ProcessoService,
        private route: ActivatedRoute,
        private router: Router,
        private toastr: ToastsManager) { }

    ngOnInit() {
        this.clienteService.getPerfilSelect()
            .subscribe((data: IKeyValuePair[]) => this.perfil = data);

        this.processoService.getParteSelect()
            .subscribe((data: IKeyValuePair[]) => this.parte = data);

        this.params = this.route.params;

        this.params.subscribe(x => {
            this.busy = this.service.getProcessoById(x['id'].toString(), x['status'])
                .subscribe((data: CobrancaDetail) => {
                    this.model = data;
                });
        });
    }

    addCobranca() {
        this.model.processos.forEach(x => {
            if (x.selected)
                x.ultimaCobranca = _.cloneDeep(this.cobranca);
            x.selected = false;
        });

        this.cobranca = new Cobranca();
        this.isAddCobranca = false;

        this.service.postCobranca(this.model)
            .subscribe(x => {
                this.onRefresh();
                this.cobranca = new Cobranca();
                this.toastr.success(this.modelName + ' registrada com sucesso!');
            });
    }

    anySelected() {
        if (this.model && this.model.processos)
            return !_.some(this.model.processos, x => x.selected) && this.cobranca.dataCobranca && this.cobranca.contato;
        else return false;
    }

    selectAll(value: boolean) {
        this.model.processos.forEach(x => x.selected = value);
    }

    onRefresh() {
        this.service.getProcessoById(this.model.advogado.id.toString(), this.model.statusHonorario.toString())
            .subscribe((data: CobrancaDetail) => {
                this.model = data;
            });
    }

    onCancel() {
        let link = 'calcular/honorario/cobranca';
        this.router.navigateByUrl(link);
    }

    showParte(value: number) {
        if (this.parte) {
            var d = this.parte.find(x => x.key === value);
            return d ? d.value : null;
        }
        return null;
    }

    print(): Boolean {
        let printContents: any, popupWin: any;
        printContents = document.getElementById('print-section').innerHTML;
        popupWin = window.open('', '_blank', 'top=0,left=0,height=100%,width=auto');
        popupWin.document.open();
        popupWin.document.write(`
        <html>
            <head>
                <style type="text/css">
                    body {
                        -webkit-print-color-adjust: exact;
                        font-family: "Open Sans", "Helvetica Neue", Helvetica, Arial, sans-serif;
                        font-size: small !important;
                    }
                    td {
                        max-width: 0;
                        overflow: hidden;
                        text-overflow: ellipsis;
                        white-space: nowrap;
                    }
                    img{
                        -webkit-print-color-adjust:exact;
                        display:visible;
                    }
                    td, tr {
                        padding-top: 3px;
                        padding-bottom: 3px;
                        border-bottom: 1px solid #CCC;
                        font-size: small !important;
                    }
                </style>
            </head>
            <body onload="PrintDiv()"><div style="padding-left: 0px; padding-right: 0px;">${printContents}</div></body>
            <script>
            function PrintDiv() {
                setTimeout(function() {
                    window.print();
                    window.close();
                }, 60);
            }
            </script>
        </html>`);
        popupWin.document.close();
        return false;
    }
}
