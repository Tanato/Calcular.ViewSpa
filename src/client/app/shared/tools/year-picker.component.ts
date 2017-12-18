import { Component, OnInit, Input, Output, EventEmitter } from '@angular/core';

@Component({
    selector: 'year-picker',
    template: `   
            <select class="form-control" [(ngModel)]="model" (ngModelChange)="updateData($event)">
                <option *ngFor="let year of years">{{year}}</option>    
            </select>`
})
export class YearPickerComponent implements OnInit {

    @Input()
    public yearBase: string;

    @Input()
    public nextMonthYear: boolean = false;

    @Input() model: number;
    @Output() modelChange: any = new EventEmitter();

    private years: number[] = [];
    private yy: number;

    ngOnInit() {
        this.getYear();

        if (!this.model) {
            this.updateData(this.yy);
        }
    }

    updateData(event: any) {
        this.model = event;
        this.modelChange.emit(event);
    }

    getYear() {
        var today = new Date();

        if(this.nextMonthYear) {
            today = new Date(today.getFullYear(), today.getMonth() + 1, 1);
        }

        this.yy = today.getFullYear();
        var diff = this.yy - (this.yearBase ? parseInt(this.yearBase) : 2017);
        for (var i = (this.yy - diff); i <= this.yy; i++) {
            this.years.push(i);
        }
    }
}
