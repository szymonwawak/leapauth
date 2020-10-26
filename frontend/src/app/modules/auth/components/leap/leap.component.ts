import {Component, OnInit} from '@angular/core';

@Component({
  selector: 'app-leap',
  templateUrl: './leap.component.html',
  styleUrls: ['./leap.component.css']
})
export class LeapComponent implements OnInit {
  isUserSelected = false;

  constructor() {
  }

  ngOnInit(): void {
  }

  onUserSelection(isSelected: boolean): void {
    this.isUserSelected = isSelected;
  }
}
