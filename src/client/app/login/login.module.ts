import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';
import { LoginComponent } from './login.component';
import { FormsModule } from '@angular/forms';
import { LoginService } from './login.service';
import { ToastModule } from 'ng2-toastr/ng2-toastr';

let options: any = {
    animate: 'flyRight',
    positionClass: 'toast-bottom-right',
};

@NgModule({
    imports: [CommonModule, RouterModule, FormsModule, ToastModule.forRoot(options)],
    providers: [LoginService],
    declarations: [LoginComponent],
    exports: [LoginComponent]
})
export class LoginModule { }
