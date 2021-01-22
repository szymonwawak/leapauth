import {Component, OnInit} from '@angular/core';
import {UtilsService} from '../../../../core/services/utils.service';
import {TranslateService} from '@ngx-translate/core';
import {AuthService} from '../../../../core/services/auth.service';
import {PasswordChangeModel} from '../../../../shared/models/PasswordChangeModel';
import {MatDialogRef} from '@angular/material/dialog';

@Component({
  selector: 'app-password-change',
  templateUrl: './password-change.component.html',
  styleUrls: ['./password-change.component.css']
})
export class PasswordChangeComponent implements OnInit {

  passwordChangeModel: PasswordChangeModel = {
    currentPassword: '',
    newPassword: ''
  };

  constructor(private translateService: TranslateService, private utilsService: UtilsService,
              private authService: AuthService, public dialogRef: MatDialogRef<PasswordChangeComponent>) {
  }

  ngOnInit(): void {
  }

  changePassword(): void {
    this.authService.changePassword(this.passwordChangeModel).subscribe(
      res => {
        this.utilsService.openSnackBar(this.translateService.instant('password.change.success'));
        this.closeDialog();
      },
      err => {
        this.utilsService.openSnackBar(this.translateService.instant('password.change.failed'));
      });
  }

  closeDialog(): void {
    this.dialogRef.close();
  }
}
