import {Component, OnInit} from '@angular/core';
import {StatsPackVM} from '../../../../shared/models/StatsPackVM';
import {ApiService} from '../../../../core/services/api.service';
import {UtilsService} from '../../../../core/services/utils.service';

@Component({
  selector: 'app-stats',
  templateUrl: './stats.component.html',
  styleUrls: ['./stats.component.css']
})
export class StatsComponent implements OnInit {

  statsPackVM: StatsPackVM = new StatsPackVM();

  constructor(private apiService: ApiService, private utilsService: UtilsService) {
  }

  ngOnInit(): void {
    this.apiService.getUserStats(null).subscribe(
      res => {
        this.statsPackVM = res;
      }, error => {
        this.utilsService.openSnackBar(error.error.message);
      }
    );
  }

}
