import { Component, OnInit, AfterViewInit, ElementRef } from '@angular/core';
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
    public local: Observable<IKeyValuePair[]>;

    public formType: string = 'new';
    public blockEdit: boolean = true;

    public id: Observable<string>;

    constructor(private service: ProcessoService,
        private route: ActivatedRoute,
        private router: Router,
        private toastr: ToastsManager,
        private elementRef: ElementRef) { }

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

        this.local = this.service.getLocalSelect();

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


    // local select
    private value: any = {};

    public selected(value: any): void {
        if (value) {
            //this.elementRef.nativeElement.querySelector('tanato').item(0).classList.add('ng-valid');
            //let tmp = document. .getElementsByClassName('tanato').item(0).classList.add('ng-valid');
            // tmp.style.color = 'orange';
            // $('.btn').css('border-left', '5px solid red !important'); //.addClass('ng-valid');
        }
        else {
            $('.ui-select-toggle').addClass('ng-invalid');
        }
    }

    public removed(value: any): void {
        console.log('Removed value is: ', value);
    }

    public typed(value: any): void {
    }

    public refreshValue(value: any): void {
        this.value = value;
    }
}
