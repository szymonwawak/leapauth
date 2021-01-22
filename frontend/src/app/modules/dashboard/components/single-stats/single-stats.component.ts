import {Component, Input, OnInit} from '@angular/core';
import {SingleStats} from '../../../../shared/models/SingleStats';

@Component({
  selector: 'app-single-stats',
  templateUrl: './single-stats.component.html',
  styleUrls: ['./single-stats.component.css']
})
export class SingleStatsComponent implements OnInit {

  @Input()
  singleStats: SingleStats;

  constructor() {
  }

  ngOnInit(): void {
  }

}
