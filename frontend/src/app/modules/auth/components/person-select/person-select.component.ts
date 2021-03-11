import {Component, EventEmitter, OnDestroy, OnInit, Output} from '@angular/core';
import {NavigableBase} from '../../../../core/classes/navigable-base';
import {NavigatorConfig} from '../../../../shared/models/NavigatorConfig';
import {User} from '../../../../shared/models/User';
import {ApiService} from '../../../../core/services/api.service';
import {TranslateService} from '@ngx-translate/core';
import {UtilsService} from '../../../../core/services/utils.service';


@Component({
  selector: 'app-person-select',
  templateUrl: './person-select.component.html',
  styleUrls: ['./person-select.component.css']
})
export class PersonSelectComponent extends NavigableBase implements OnInit, OnDestroy {
  public users: Array<User>;
  @Output() chosenUser = new EventEmitter<User>();
  userSelected = false;
  navConfig: NavigatorConfig;
  selectedUser: User;
  selectedUserId = -1;

  constructor(private apiService: ApiService, private translateService: TranslateService,
              private utilsService: UtilsService) {
    super();
  }

  ngOnInit(): void {
    this.loadTranslationsAndInitComponent();
  }

  private loadTranslationsAndInitComponent(): void {
    this.translateService.get('user.previous').subscribe(
      res => {
        this.navConfig = {
          top: this.translateService.instant('user.previous'),
          down: this.translateService.instant('user.next'),
          left: '',
          right: this.translateService.instant('authorize')
        };
        this.initNavigator(this.navConfig);
        this.loadUsers();
      }
    );
  }

  ngOnDestroy(): void {
    this.navigationService.setHidden(true);
  }

  private loadUsers(): void {
    this.apiService.getAllUsers().subscribe(
      (res) => {
        this.users = res;
      }, (error) => {
        this.utilsService.openSnackBar(error.error.message);
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
