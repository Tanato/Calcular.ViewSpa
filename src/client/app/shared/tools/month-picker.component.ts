import { Component, OnInit, Input, Output, EventEmitter } from '@angular/core';

@Component({
    selector: 'month-picker',
    template: `   
            <select class="form-control" [(ngModel)]="model" (ngModelChange)="updateData($event)"> 
                <option *ngFor="let p of months" [ngValue]="p.val">{{p.name}}</option>    
            </select>`
})
export class MonthPickerComponent implements OnInit {

    @Input() model: number;
    @Output() modelChange: any = new EventEmitter();

    private months = [
        { val: 1, name: 'Janeiro' },
        { val: 2, name: 'Fevereiro' },
        { val: 3, name: 'Março' },
        { val: 4, name: 'Abril' },
        { val: 5, name: 'Maio' },
        { val: 6, name: 'Junho' },
        { val: 7, name: 'Julho' },
        { val: 8, name: 'Agosto' },
        { val: 9, name: 'Setembro' },
        { val: 10, name: 'Outubro' },
        { val: 11, name: 'Novembro' },
        { val: 12, name: 'Dezembro' }
    ];

    private mm: number;

    updateData(event: any) {
        this.model = event;
        this.modelChange.emit(event);
    }

    ngOnInit() {
        this.getMonth();

        if (!this.model) {
            this.updateData(this.mm);
        }
    }

    getMonth() {
        var today = new Date();
        this.mm = today.getMonth() + 1;
    }
}
