import { Component, OnInit } from '@angular/core';
import { Evento } from './evento.model';
import { EventoService } from './evento.service';
import { AtividadeService } from '../atividade/atividade.service';
import { Atividade } from '../atividade/atividade.model';
import { ProcessoService } from '../processo/processo.service';
import { Processo } from '../processo/processo.model';
import { ServicoService } from '../servico/servico.service';
import { Servico } from '../servico/servico.model';
import { ToastsManager } from 'ng2-toastr/ng2-toastr';
import { Subscription } from 'rxjs';
import { UserService } from '../../shared/user/user.service';

import * as _ from 'lodash';

@Component({
    moduleId: module.id,
    selector: 'eventomaster-cmp',
    templateUrl: './evento.master.component.html',
})
export class EventoMasterComponent implements OnInit {

    private isCalculista: boolean = false;
    private isRevisor: boolean = false;
    private isExterno: boolean = false;
    private isAdministrativo: boolean = false;
    private isGerencial: boolean = false;

    constructor(private service: EventoService,
        private toastr: ToastsManager,
        private userService: UserService) { }

    ngOnInit() {
        this.userService
            .getUser()
            .subscribe(user => {
                this.isCalculista = this.userService.isInRole('Calculista');
                this.isRevisor = this.userService.isInRole('Revisor');
                this.isExterno = this.userService.isInRole('Externo');
                this.isAdministrativo = this.userService.isInRole('Administrativo');
                this.isGerencial = this.userService.isInRole('Gerencial');
            });
    }
}

@Component({
    moduleId: module.id,
    selector: 'birthday-cmp',
    templateUrl: 'birthday.html',
})
export class BirthDayComponent implements OnInit {

    private busy: Subscription;
    private data: any[];

    constructor(private service: EventoService) { }

    ngOnInit() {
        this.busy = this.service.getAniversarios()
            .subscribe(response => {
                this.data = response;
            },
            error => {
                console.log(error);
            });
    }
}

@Component({
    moduleId: module.id,
    selector: 'atividade-cmp',
    templateUrl: 'atividade.html'
})
export class AtividadeComponent implements OnInit {

    private busy: Subscription;
    private data: Atividade[];

    constructor(private service: AtividadeService) { }

    ngOnInit() {
        this.busy = this.service.getAtividadesByUser('original', false)
            .subscribe(response => {
                this.data = response;
                _.each(this.data, x => x.servico.prazo = x.servico.prazo ? x.servico.prazo.slice(0, 10) : null);
            },
            error => {
                console.log(error);
            });
    }
}

@Component({
    moduleId: module.id,
    selector: 'atividade-refazer-cmp',
    templateUrl: 'atividade-refazer.html'
})
export class AtividadeRefazerComponent implements OnInit {
    private busy: Subscription;
    private data: Atividade[];

    constructor(private service: AtividadeService) { }

    ngOnInit() {
        this.busy = this.service.getAtividadesByUser('refazer', false)
            .subscribe(response => {
                this.data = response;
                _.each(this.data, x => x.servico.prazo = x.servico.prazo ? x.servico.prazo.slice(0, 10) : null);
            },
            error => {
                console.log(error);
            });
    }
}

@Component({
    moduleId: module.id,
    selector: 'atividade-revisar-cmp',
    templateUrl: 'atividade-revisar.html'
})
export class AtividadeRevisarComponent implements OnInit {
    private busy: Subscription;
    private data: Atividade[];

    constructor(private service: AtividadeService) { }

    ngOnInit() {
        this.busy = this.service.getAtividadesByUser('revisar', false)
            .subscribe(response => {
                this.data = response;
                _.each(this.data, x => x.servico.prazo = x.servico.prazo ? x.servico.prazo.slice(0, 10) : null);
            },
            error => {
                console.log(error);
            });
    }
}

@Component({
    moduleId: module.id,
    selector: 'distribuir-servico-cmp',
    templateUrl: 'distribuir-servico.html'
})
export class DistribuirServicoComponent implements OnInit {
    private busy: Subscription;
    private data: Servico[];

    constructor(private service: ServicoService) { }

    ngOnInit() {
        this.busy = this.service.getServicosDistribuir()
            .subscribe(response => {
                this.data = response;
                _.each(this.data, x => x.prazo = x.prazo ? x.prazo.slice(0, 10) : null);
            },
            error => {
                console.log(error);
            });
    }
}

@Component({
    moduleId: module.id,
    selector: 'enviar-servico-cmp',
    templateUrl: 'enviar-servico.html'
})
export class EnviarServicoComponent implements OnInit {
    private busy: Subscription;
    private data: Servico[];

    constructor(private service: ServicoService) { }

    ngOnInit() {
        this.busy = this.service.getServicosEnviar()
            .subscribe(response => {
                this.data = response;
                _.each(this.data, x => x.prazo = x.prazo ? x.prazo.slice(0, 10) : null);
            },
            error => {
                console.log(error);
            });
    }
}

@Component({
    moduleId: module.id,
    selector: 'prazo-servico-cmp',
    templateUrl: 'prazo-servico.html'
})
export class PrazoServicoComponent implements OnInit {
    private busy: Subscription;
    private data: Servico[];

    constructor(private service: ServicoService) { }

    ngOnInit() {
        this.busy = this.service.getServicosPrazo()
            .subscribe(response => {
                this.data = response;
                _.each(this.data, x => x.prazo = x.prazo ? x.prazo.slice(0, 10) : null);
            },
            error => {
                console.log(error);
            });
    }
}

