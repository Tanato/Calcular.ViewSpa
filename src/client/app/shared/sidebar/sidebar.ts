import { Component, OnInit } from '@angular/core';
import { IUser } from '../topnav/topnav.service';
import { UserService } from '../user/user.service';

@Component({
	moduleId: module.id,
	selector: 'sidebar-cmp',
	templateUrl: 'sidebar.html'
})
export class SidebarComponent implements OnInit {
	isActive = false;
	showMenu: string = '';

	user: IUser = <IUser>{};

	constructor(private userService: UserService) { }

	ngOnInit() {
		this.userService.getUser().subscribe((data: IUser) => this.user = data);
	}

	eventCalled() {
		this.isActive = !this.isActive;
	}

	isInRole(role: string) {
		return this.user
			&& this.user.roles
			&& this.user.roles.indexOf(role) !== -1;
	}

	addExpandClass(element: any) {
		if (element === this.showMenu) {
			this.showMenu = '0';
		} else {
			this.showMenu = element;
		}
	}
}
