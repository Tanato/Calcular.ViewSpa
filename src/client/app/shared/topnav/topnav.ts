import { Component, OnInit } from '@angular/core';
import { TopnavService, IUser } from './topnav.service';
import { UserService } from '../user/user.service';

@Component({
	moduleId: module.id,
	selector: 'top-nav',
	templateUrl: 'topnav.html',
})
export class TopNavComponent implements OnInit {

	username: IUser = <IUser>{};

	constructor(private topnavService: TopnavService, private userService: UserService) { }

	ngOnInit() {
		this.userService.getUser().subscribe(x => this.username = x);
	}

	changeTheme(color: string): void {
		var link: any = $('<link>');
		link
			.appendTo('head')
			.attr({ type: 'text/css', rel: 'stylesheet' })
			.attr('href', 'themes/app-' + color + '.css');
	}

	rtl(): void {
		var body: any = $('body');
		body.toggleClass('rtl');
	}

	logout(): void {
		this.userService.logoutUser();
		this.topnavService.logout()
			.subscribe();
	}

	sidebarToggler(): void {
		var sidebar: any = $('#sidebar');
		var mainContainer: any = $('.main-container');
		sidebar.toggleClass('sidebar-left-zero');
		mainContainer.toggleClass('main-container-ml-zero');
	}
}
