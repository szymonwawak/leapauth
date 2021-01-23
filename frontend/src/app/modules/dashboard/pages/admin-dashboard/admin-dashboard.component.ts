import {Component, OnInit} from '@angular/core';
import {LeapLoginAttempt} from '../../../../shared/models/LeapLoginAttempt';
import {ApiService} from '../../../../core/services/api.service';
import {UtilsService} from '../../../../core/services/utils.service';

@Component({
  selector: 'app-admin-dashboard',
  templateUrl: './admin-dashboard.component.html',
  styleUrls: ['./admin-dashboard.component.css']
})
export class AdminDashboardComponent implements OnInit {

  leapLoginAttempts: Array<LeapLoginAttempt>;

  constructor(private apiService: ApiService, private utilsService: UtilsService) {
  }

  ngOnInit(): void {
    this.loadData();
  }

  loadData(): void {
    this.apiService.getLeapAttempts().subscribe(
      res => {
        this.leapLoginAttempts = res;
      },
      err => {
        this.utilsService.openSnackBar(err.error.message);
      }
    );
  }

}
