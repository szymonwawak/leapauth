import {Component, OnInit} from '@angular/core';
import {NavRoute} from '../../../../shared/models/NavRoute';
import {MatDialog} from '@angular/material/dialog';
import {PasswordChangeComponent} from '../../../auth/components/password-change/password-change.component';
import {TranslateService} from "@ngx-translate/core";

@Component({
  selector: 'app-sidebar',
  templateUrl: './sidebar.component.html',
  styleUrls: ['./sidebar.component.css']
})
export class SidebarComponent implements OnInit {

  public ROUTES: NavRoute[] = [
    {
      path: 'createGesture', title: 'CreateGesture', icon: 'gesture', class: ''
    }, {
      path: 'showGesture', title: 'gesture.show', icon: 'movie', class: ''
    }, {
      path: 'stats', title: 'stats', icon: 'show_chart', class: ''
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

  logout(): void {
    localStorage.removeItem('token');
  }
}
