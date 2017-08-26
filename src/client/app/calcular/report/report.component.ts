import { Component, OnInit } from '@angular/core';
import { ReportService } from './report.service';
import { AtividadeService } from '../atividade/atividade.service';
import { Atividade } from '../atividade/atividade.model';
import { ServicoService } from '../servico/servico.service';
import { Servico } from '../servico/servico.model';
import { ToastsManager } from 'ng2-toastr/ng2-toastr';
import { Subscription } from 'rxjs';
import { UserService } from '../../shared/user/user.service';
import { CustoProcesso, ProdutividadeColaborador } from './report.model';
import * as Highcharts from 'highcharts';
import * as _ from 'lodash';

@Component({
    moduleId: module.id,
    templateUrl: './report.custo-processo.component.html',
})
export class ReportCustoProcessoComponent implements OnInit {

    private busy: Subscription;
    private data: CustoProcesso[];

    constructor(private service: ReportService) { }

    ngOnInit() {
        this.busy = this.service.getCUstoProcesso()
            .subscribe(response => { this.data = response; });
    }
}

@Component({
    moduleId: module.id,
    templateUrl: './report.honorarios.html',
})
export class ReportHonorariosComponent implements OnInit {

    private busy: Subscription;
    private data: any = null;
    private mesFilter: number;
    private anoFilter: number;
    private quantidadeMesesFilter: number = 4;

    constructor(private service: ReportService) { }

    ngOnInit() {
        this.filter();
    }

    filter() {
        var date: Date = new Date();
        if (this.anoFilter && this.mesFilter) {
            date = new Date(this.anoFilter, this.mesFilter - 1);
        } else {
            date = new Date(date.getFullYear(), date.getMonth());
        }
        this.busy = this.service.getHonorarios(date, this.quantidadeMesesFilter)
            .subscribe(response => {
                this.data = response;
            });
    }
}

@Component({
    moduleId: module.id,
    templateUrl: 'report.produtividade-colaborador.html',
})
export class ReportProdutividadeColaboradorComponent implements OnInit {

    private busy: Subscription;
    private mesFilter: number;
    private anoFilter: number;
    private quantidadeMesesFilter: number = 4;

    constructor(private service: ReportService) { }

    ngOnInit() {
        this.filter();
    }

    filter() {
        var date: Date = new Date(Date.now());
        if (this.anoFilter && this.mesFilter) {
            date = new Date(this.anoFilter, this.mesFilter);
        }
        this.busy = this.service.getProdutividadeColaborador(date, this.quantidadeMesesFilter)
            .subscribe(response => {
                var produtividadecolaborador: any = $('#produtividadecolaborador');
                produtividadecolaborador.highcharts({

                    colors: ['#2f7ed8', '#0d233a', '#8bbc21', '#910000', '#1aadce',
                        '#492970', '#f28f43', '#77a1e5', '#c42525', '#a6c96a'],

                    chart: { type: 'column' },

                    title: { text: '' },

                    xAxis: { categories: response.meses, crosshair: true },

                    yAxis: { title: { text: 'Atividades' } },

                    series: response.report,
                });
            },
            error => { console.log(error); });
    }
}

@Component({
    moduleId: module.id,
    templateUrl: './report.tipo-processo.html',
})
export class ReportTipoProcessoComponent implements OnInit {

    private busy: Subscription;
    private data: any = {};
    private mesFilter: number;
    private anoFilter: number;
    private quantidadeMesesFilter: number = 12;

    constructor(private service: ReportService) { }

    ngOnInit() {
        this.filter();
    }

    filter() {
        var date: Date = new Date();
        if (this.anoFilter && this.mesFilter) {
            date = new Date(this.anoFilter, this.mesFilter - 1);
        } else {
            date = new Date(date.getFullYear(), date.getMonth());
        }
        this.busy = this.service.getTipoProcesso(date, this.quantidadeMesesFilter)
            .subscribe(response => {
                this.data = response;
                var produtividadecolaborador: any = $('#tipoProcessoChart');
                produtividadecolaborador.highcharts({

                    colors: ['#7cb5ec', '#f7a35c', '#8bbc21'],

                    title: { text: '' },

                    xAxis: { categories: response.meses, crosshair: true },

                    yAxis: { title: { text: 'Quantidade' } },

                    series: [{
                        name: 'Oficial',
                        type: 'column',
                        data: response.quantidadeOficial
                    }, {
                        name: 'Assistência',
                        type: 'column',
                        data: response.quantidadeAssistencia
                    }, {
                        name: 'Novo',
                        type: 'spline',
                        data: response.quantidadeNovos
                    }]
                });
            });
    }
}

@Component({
    moduleId: module.id,
    templateUrl: './report.tempo-produtividade.html',
})
export class ReportTempoProdutividadeComponent implements OnInit {

    private busy: Subscription;
    private data: any = {};
    private tipoAtividades: any[];
    private mesFilter: number;
    private anoFilter: number;

    constructor(private service: ReportService) { }

    ngOnInit() {
        this.anoFilter = new Date().getFullYear();
        this.filter();
    }

    filter() {
        var date: Date = new Date();
        if (this.anoFilter && this.mesFilter) {
            date = new Date(this.anoFilter, this.mesFilter - 1);
        } else {
            date = new Date(date.getFullYear(), date.getMonth());
        }
        this.busy = this.service.getTempoProdutividade(date)
            .subscribe(response => {
                this.data = response;
                this.tipoAtividades = response.tipoAtividade;

                this.createGraph(this.data.reportCalculo, this.data.calculos,
                    '#tempoProdutividadeCalculo', 'Atividades de Cálculo - Tempo médio mensal');
                this.createGraph(this.data.reportCalculoAnual, this.data.calculosAnual,
                    '#tempoProdutividadeCalculoAnual', 'Atividades de Cálculo - Tempo médio anual');
                this.createGraph(this.data.reportLevantamento, this.data.levantamentos,
                    '#tempoProdutividadeLevantamento', 'Atividades de Levantamento - Tempo médio mensal');
                this.createGraph(this.data.reportDemais, this.data.demais,
                    '#tempoProdutividadeDemais', 'Atividades Diversas - Tempo médio mensal');
            });
    }

    createGraph(data: any, categories: any[], element: string, title: string) {
        var produtividadecolaborador: any = $(element);
        produtividadecolaborador.highcharts({
            colors: ['#2f7ed8', '#0d233a', '#8bbc21', '#910000', '#1aadce',
                '#492970', '#f28f43', '#77a1e5', '#c42525'],

            title: { text: title },

            xAxis: { categories: categories },

            tooltip: {
                formatter: function () {
                    return '<b>' + this.series.name + '</b><br/>Média: ' +
                        Math.floor(this.y / 3600000) +
                        Highcharts.dateFormat(':%M:%S', this.y);
                }
            },

            plotOptions: {
                areaspline: {
                    fillOpacity: 0.25
                }
            },

            yAxis: {
                title: { text: 'Tempo' },
                type: 'datetime',
                dateTimeLabelFormats: { //force all formats to be hour:minute:second
                    second: '%H:%M:%S',
                    minute: '%H:%M:%S',
                    hour: '%H:%M:%S',
                    day: '%H:%M:%S',
                    week: '%H:%M:%S',
                    month: '%H:%M:%S',
                    year: '%H:%M:%S'
                }
            },

            series: data
        });
    }
}
