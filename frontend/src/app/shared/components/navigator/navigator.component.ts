import {Component, Input, OnInit} from '@angular/core';
import {NavigatorConfig} from '../../models/navigator-config';

@Component({
  selector: 'app-navigator',
  templateUrl: './navigator.component.html',
  styleUrls: ['./navigator.component.css']
})
export class NavigatorComponent implements OnInit {

  @Input()
  public config: NavigatorConfig;

  constructor() {
  }

  ngOnInit(): void {

  }

}
