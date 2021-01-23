import {Component, OnInit} from '@angular/core';
import {NavRoute} from '../../../../shared/models/NavRoute';
import {MatDialog} from '@angular/material/dialog';
import {PasswordChangeComponent} from '../../../auth/components/password-change/password-change.component';
import {TranslateService} from '@ngx-translate/core';
import {ChangeSystemPropertiesComponent} from '../change-system-properties/change-system-properties.component';

@Component({
  selector: 'app-sidebar',
  templateUrl: './sidebar.component.html',
  styleUrls: ['./sidebar.component.css']
})
export class SidebarComponent implements OnInit {

  public ROUTES: NavRoute[] = [
    {
      path: 'createGesture', title: 'create.gesture', icon: 'gesture', class: ''
    }, {
      path: 'show-gesture', title: 'gesture.show', icon: 'movie', class: ''
    }, {
      path: 'stats', title: 'stats', icon: 'show_chart', class: ''
    }, {
      path: 'userList', title: 'users.list', icon: 'person_search', class: ''
    }, {
      path: 'adminDashboard', title: 'admin.dashboard', icon: 'admin_panel_settings', class: ''
    }
  ];

  constructor(private dialog: MatDialog, private translateService: TranslateService) {
  }

  ngOnInit(): void {
  }

  showChangePasswordDialog(): void {
    this.dialog.open(PasswordChangeComponent, {
      disableClose: true,
      autoFocus: true,
      width: '300px'
    });
  }

  showChangeSystemPropertiesDialog(): void {
    this.dialog.open(ChangeSystemPropertiesComponent, {
      disableClose: true,
      autoFocus: true,
      width: '350px'
    });
  }

  logout(): void {
    localStorage.removeItem('token');
  }
}
