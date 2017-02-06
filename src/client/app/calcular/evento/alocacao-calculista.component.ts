import { Component, OnInit } from '@angular/core';
import { EventoService } from './evento.service';
import { Subscription } from 'rxjs';

import * as _ from 'lodash';

@Component({
    moduleId: module.id,
    selector: 'alocacao-cmp',
    templateUrl: 'alocacao-calculista.html',
})
export class AlocacaoComponent implements OnInit {

    private busy: Subscription;

    constructor(private service: EventoService) { }

    ngOnInit() {
        this.busy = this.service.getAlocacao()
            .subscribe(response => {

                var alocacao: any = $('#alocacao');
                alocacao.highcharts({

                    colors: ['#2f7ed8', '#0d233a', '#8bbc21', '#910000', '#1aadce',
                        '#492970', '#f28f43', '#77a1e5', '#c42525', '#a6c96a'],

                    chart: {
                        type: 'bar',
                        height: response.length * 60 + 40,
                    },

                    title: {
                        text: ''
                    },

                    legend: {
                        enabled: false
                    },

                    xAxis: {
                        categories: _.map(response, x => x.responsavel),
                        labels: {
                            x: -10
                        }
                    },

                    yAxis: {
                        allowDecimals: false,
                        title: {
                            text: ''
                        }
                    },

                    series: [{
                        name: 'Atividades',
                        data: _.map(response, x => x.atividades),
                        pointWidth: 20
                    }, {
                        name: 'Refazer',
                        data: _.map(response, x => x.atividadesRefazer),
                        pointWidth: 14
                    }],

                    responsive: {
                        rules: [{
                            condition: {
                                maxWidth: 500
                            },
                            chartOptions: {
                                legend: {
                                    align: 'left',
                                    verticalAlign: 'bottom',
                                    layout: 'vertical'
                                },
                                yAxis: {
                                    labels: {
                                        align: 'left',
                                        x: 0,
                                        y: -5
                                    },
                                    title: {
                                        text: null
                                    }
                                },
                                subtitle: {
                                    text: null
                                },
                                credits: {
                                    enabled: false
                                }
                            }
                        }]
                    }
                });
            },
            error => {
                console.log(error);
            });
    }
}