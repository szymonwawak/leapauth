import {Component, EventEmitter, OnInit, Output} from '@angular/core';
import {NavigableBase} from '../../../../core/classes/navigable-base';
import {NavigatorConfig} from '../../../../shared/models/navigator-config';
import {User} from '../../../../shared/models/User';
import {ApiService} from '../../../../core/services/api.service';


@Component({
  selector: 'app-person-select',
  templateUrl: './person-select.component.html',
  styleUrls: ['./person-select.component.css']
})
export class PersonSelectComponent extends NavigableBase implements OnInit {
  public users: Array<User>;
  @Output() chosenUser = new EventEmitter<User>();
  userSelected = false;
  navConfig: NavigatorConfig = {top: 'top', down: 'down', left: 'left', right: 'right'};
  selectedUser: User;
  selectedUserId = -1;

  constructor(private apiService: ApiService) {
    super();
  }

  ngOnInit(): void {
    this.initNavigator(this.navConfig);
    this.loadUsers();
  }

  private loadUsers(): void {
    this.apiService.getAllUsers().subscribe(
      (res) => {
        this.users = res;
      }, (error) => {
        console.log('An error occured: ' + error.message);
      });
  }

  down(): void {
    this.setId(this.selectedUserId + 1);
  }

  left(): void {
  }

  right(): void {
    if (this.selectedUserId !== -1) {
      this.setUser();
      this.unsubscribeNavService();
      this.setNavHidden(true);
      this.startAuthenticationProcess();

    }
  }

  setUser(): void {
    this.chosenUser.emit(this.selectedUser);
    this.userSelected = true;
  }

  startAuthenticationProcess(): void {
  }

  top(): void {
    this.setId(this.selectedUserId - 1);
  }

  setId(id: number): void {
    const usersLength = this.users.length;
    if (id < 0) {
      this.selectedUserId = usersLength - 1;
    } else if (id >= usersLength) {
      this.selectedUserId = 0;
    } else {
      this.selectedUserId = id;
    }
    this.selectedUser = this.users[this.selectedUserId];
  }
}
