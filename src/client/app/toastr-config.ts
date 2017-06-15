import {ToastOptions} from 'ng2-toastr/ng2-toastr';

export class CustomOption extends ToastOptions {
	animate = 'flyRight';
	positionClass = 'toast-bottom-right';
}
