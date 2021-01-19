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
    }, {
      path: 'showGesture', title: 'gesture.show', icon: 'movie', class: ''
    },  {
      path: 'stats', title: 'stats', icon: 'show_chart', class: ''
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
