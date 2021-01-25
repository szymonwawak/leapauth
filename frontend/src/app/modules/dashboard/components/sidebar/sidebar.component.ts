import {Component, OnInit} from '@angular/core';
import {NavRoute} from '../../../../shared/models/NavRoute';
import {MatDialog} from '@angular/material/dialog';
import {PasswordChangeComponent} from '../../../auth/components/password-change/password-change.component';
import {TranslateService} from '@ngx-translate/core';
import {ChangeSystemPropertiesComponent} from '../change-system-properties/change-system-properties.component';
import {Router} from '@angular/router';
import {AuthService} from '../../../../core/services/auth.service';

@Component({
  selector: 'app-sidebar',
  templateUrl: './sidebar.component.html',
  styleUrls: ['./sidebar.component.css']
})
export class SidebarComponent implements OnInit {

  public ROUTES: NavRoute[] = [
    {
      path: 'create-gesture', title: 'create.gesture', icon: 'gesture', class: '', role: 'user'
    }, {
      path: 'show-gesture', title: 'gesture.show', icon: 'movie', class: '', role: 'user'
    }, {
      path: 'stats', title: 'stats', icon: 'show_chart', class: '', role: 'user'
    }, {
      path: 'user-list', title: 'users.list', icon: 'person_search', class: '', role: 'admin'
    }, {
      path: 'admin-dashboard', title: 'admin.dashboard', icon: 'admin_panel_settings', class: '', role: 'admin'
    }
  ];

  constructor(private dialog: MatDialog, private translateService: TranslateService,
              private router: Router, public authService: AuthService) {
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
    this.router.navigate(['/auth/leap']).then(() => window.location.reload());
  }
}
