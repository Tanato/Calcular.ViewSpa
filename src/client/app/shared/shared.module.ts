import { NgModule, ModuleWithProviders } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { RouterModule } from '@angular/router';
import { TopnavService } from './topnav/topnav.service';
import { MonthPickerComponent, YearPickerComponent } from './tools/index';

import { NameListService } from './name-list/index';

/**
* Do not specify providers for modules that might be imported by a lazy loaded module.
*/

@NgModule({
    imports: [CommonModule, RouterModule, FormsModule],
    declarations: [MonthPickerComponent, YearPickerComponent],
    exports: [CommonModule, FormsModule, RouterModule, MonthPickerComponent, YearPickerComponent]
})
export class SharedModule {
    static forRoot(): ModuleWithProviders {
        return {
            ngModule: SharedModule,
            providers: [NameListService, TopnavService, MonthPickerComponent, YearPickerComponent]
        };
    }
}
