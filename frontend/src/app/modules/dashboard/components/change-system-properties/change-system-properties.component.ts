import {Component, OnInit} from '@angular/core';
import {TranslateService} from '@ngx-translate/core';
import {UtilsService} from '../../../../core/services/utils.service';
import {MatDialogRef} from '@angular/material/dialog';
import {SystemProperties} from '../../../../shared/models/SystemProperties';
import {ApiService} from '../../../../core/services/api.service';

@Component({
  selector: 'app-change-system-properties',
  templateUrl: './change-system-properties.component.html',
  styleUrls: ['./change-system-properties.component.css']
})
export class ChangeSystemPropertiesComponent implements OnInit {

  systemProperties: SystemProperties = new SystemProperties();

  constructor(private translateService: TranslateService, private utilsService: UtilsService,
              private apiService: ApiService, public dialogRef: MatDialogRef<ChangeSystemPropertiesComponent>) {
  }

  ngOnInit(): void {
    this.loadProperties();
  }

  setProperties(): void {
    this.apiService.setSystemProperties(this.systemProperties).subscribe(
      res => {
        this.utilsService.openSnackBar(this.translateService.instant('system.change.properties.success'));
        this.closeDialog();
      },
      err => {
        this.utilsService.openSnackBar(err.error);
      });
  }

  loadProperties(): void {
    this.apiService.getSystemProperties().subscribe(
      res => {
        if (res) {
          this.systemProperties = res;
        }
      }
    );
  }

  closeDialog(): void {
    this.dialogRef.close();
  }
}
