import { Component, OnInit, AfterViewInit } from '@angular/core';
import { Processo } from './processo.model';
import { ProcessoService } from './processo.service';
import { Observable } from 'rxjs/Observable';
import { ActivatedRoute, Router } from '@angular/router';
import { IKeyValuePair } from '../../shared/interfaces';

import { ToastsManager } from 'ng2-toastr/ng2-toastr';

@Component({
    moduleId: module.id,
    selector: 'processodetail-cmp',
    templateUrl: './processo.detail.component.html'
})
export class ProcessoDetailComponent implements OnInit, AfterViewInit {

    public modelName = 'Processo';

    public maskNumero = ['(', /\d/, /\d/, ')', ' ', /\d/, /\d/, /\d/, /\d/, '-', /\d/, /\d/, /\d/, /\d/];

    public model: Processo = new Processo;
    public parte: IKeyValuePair[];
    public local: IKeyValuePair[];

    public formType: string = 'new';
    public blockEdit: boolean = true;

    public id: Observable<string>;

    constructor(private service: ProcessoService,
        private route: ActivatedRoute,
        private router: Router,
        private toastr: ToastsManager) { }

    dateMask(data: any) {
        if (data.value && data.pristine) {
            return 'yyyy-MM-dd';
        }
        return null;
    }

    ngAfterViewInit() {
        // var a = $('.select2').select2({
        //     multiple: false,
        // });
    }

    ngOnInit() {

        this.service.getParteSelect()
            .subscribe((data: IKeyValuePair[]) => this.parte = data);

        this.service.getLocalSelect()
            .subscribe((data: IKeyValuePair[]) => this.local = data);

        this.id = this.route.params.map(params => params['id']);

        this.id.subscribe(id => {
            if (id) {
                this.blockEdit = true;
                this.formType = 'edit';
                this.service.getProcessoById(id)
                    .subscribe((data: Processo) => {
                        this.model = data;
                    });
            } else {
                this.blockEdit = false;
            }
        });
    }

    onSubmit() {
        if (this.formType === 'new') {
            this.service.postProcesso(this.model)
                .subscribe(x => {
                    this.toastr.success(this.modelName + ' adicionado com sucesso!');
                    this.onCancel();
                });
        } else {
            this.service.putProcesso(this.model)
                .subscribe(x => {
                    this.toastr.success(this.modelName + ' atualizado com sucesso!');
                    this.onCancel();
                });
        }
    }

    onCancel() {
        let link = ['/calcular/processo'];
        this.router.navigate(link);
    }

    enableEdit() {
        this.blockEdit = false;
    }
}
