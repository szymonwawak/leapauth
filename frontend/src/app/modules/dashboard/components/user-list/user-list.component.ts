import {Component, OnInit} from '@angular/core';
import {UserAdminVM} from '../../../../shared/models/UserAdminVM';
import {ApiService} from '../../../../core/services/api.service';
import {UtilsService} from '../../../../core/services/utils.service';
import {MatDialog} from '@angular/material/dialog';
import {StatsComponent} from '../stats/stats.component';
import {TranslateService} from '@ngx-translate/core';
import {GestureVisualizationComponent} from "../../pages/gesture-visualization/gesture-visualization.component";

@Component({
  selector: 'app-user-list',
  templateUrl: './user-list.component.html',
  styleUrls: ['./user-list.component.css']
})
export class UserListComponent implements OnInit {

  users: Array<UserAdminVM> = new Array<UserAdminVM>();

  constructor(private apiService: ApiService, private utilsService: UtilsService, private dialog: MatDialog,
              private translateService: TranslateService) {
  }

  ngOnInit(): void {
    this.loadUsers();
  }

  loadUsers(): void {
    this.apiService.getUsersForAdmin().subscribe(
      res => this.users = res,
      error => {
        this.utilsService.openSnackBar(error.error.message);
      }
    );
  }

  showVisualization(id: number) {
    this.dialog.open(GestureVisualizationComponent, {
      disableClose: false,
      data: id,
      autoFocus: true,
      width: '900px'
    });
  }

  showStats(id: number) {
    this.dialog.open(StatsComponent, {
      disableClose: false,
      data: id,
      autoFocus: true,
      width: '900px'
    });
  }

  addAdminAuthority(user: UserAdminVM) {
    this.apiService.addAdminAuthority(user.id).subscribe(
      res => {
        this.utilsService.openSnackBar(this.translateService.instant('admin.granted'));
        user.isAdmin = true;
      },
      error => this.utilsService.openSnackBar(error.error.message)
    )
    ;
  }
}
