import {Component, OnInit} from '@angular/core';
import {User} from "../../../../shared/models/User";

@Component({
  selector: 'app-leap',
  templateUrl: './leap.component.html',
  styleUrls: ['./leap.component.css']
})
export class LeapComponent implements OnInit {
  user: User;

  constructor() {
  }

  ngOnInit(): void {
  }

  onUserSelection(selectedUser: User): void {
    this.user = selectedUser;
  }
}
