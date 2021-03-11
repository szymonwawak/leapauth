import {Component, Injector, Input, OnInit} from '@angular/core';
import {StatsPackVM} from '../../../../shared/models/StatsPackVM';
import {ApiService} from '../../../../core/services/api.service';
import {UtilsService} from '../../../../core/services/utils.service';
import {MAT_DIALOG_DATA} from '@angular/material/dialog';

@Component({
  selector: 'app-stats',
  templateUrl: './stats.component.html',
  styleUrls: ['./stats.component.css']
})
export class StatsComponent implements OnInit {

  @Input()
  private isAdmin: boolean;
  private userId = 0;
  statsPackVM: StatsPackVM = new StatsPackVM();

  constructor(private apiService: ApiService, private utilsService: UtilsService,
              private injector: Injector) {
  }

  ngOnInit(): void {
    this.userId = this.injector.get(MAT_DIALOG_DATA, 0);
    if (this.isAdmin) {
      this.apiService.getTotalStats().subscribe(
        res => {
          this.statsPackVM = res;
        }, error => {
          this.utilsService.openSnackBar(error.error.message);
        }
      );
    } else {
      this.apiService.getUserStats(this.userId).subscribe(
        res => {
          this.statsPackVM = res;
        }, error => {
          this.utilsService.openSnackBar(error.error.message);
        }
      );
    }
  }

}
