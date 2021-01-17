import {Component, OnInit} from '@angular/core';
import {NavRoute} from '../../../../shared/models/NavRoute';

@Component({
  selector: 'app-sidebar',
  templateUrl: './sidebar.component.html',
  styleUrls: ['./sidebar.component.css']
})
export class SidebarComponent implements OnInit {

  public ROUTES: NavRoute[] = [
    {
      path: 'createGesture', title: 'CreateGesture', icon: 'gesture', class: ''
    }
  ];

  constructor() {
  }

  ngOnInit(): void {
  }

  logout(): void {
    localStorage.removeItem('token');
  }
}
