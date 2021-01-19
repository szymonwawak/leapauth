import {Injectable} from '@angular/core';
import {MatSnackBar} from "@angular/material/snack-bar";

@Injectable({
  providedIn: 'root'
})
export class UtilsService {

  constructor(private snackBar: MatSnackBar) {
  }

  public openSnackBar(message: string) {
    this.snackBar.open(message, null, {
      duration: 3000,
    });
  }
}
