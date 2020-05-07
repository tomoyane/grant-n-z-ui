import {Component} from '@angular/core';
import {environment} from '../environments/environment';
import {Router} from '@angular/router';
import {MatDialog} from '@angular/material/dialog';
import {DialogListComponent} from './component/dialog/dialog-list.component';
import {UserService} from './service/user.service';
import {ServiceService} from './service/service.service';
import {ToastrService} from 'ngx-toastr';
import {Overlay} from '@angular/cdk/overlay';
import {ComponentPortal} from '@angular/cdk/portal';
import {MatSpinner} from '@angular/material/progress-spinner';
import {RefreshTokenRequest} from './model/refresh-token-request';
import {LocalStorageService} from './service/local-storage.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
  public consoleName = environment.name;
  public username: string;
  public progress = this.overlay.create({
    hasBackdrop: true,
    positionStrategy: this.overlay.position().global().centerHorizontally().centerVertically()
  });

  /**
   * Constructor.
   *
   * @param userService UserService
   * @param service ServiceService
   * @param localStorageService LocalStorageService
   * @param toastrService ToastrService
   * @param router Router
   * @param overlay Overlay
   * @param dialog MatDialog
   */
  constructor(private userService: UserService,
              private service: ServiceService,
              private localStorageService: LocalStorageService,
              private toastrService: ToastrService,
              private router: Router,
              private overlay: Overlay,
              public dialog: MatDialog) {

    this.reloadUsername();
  }

  openServiceDialog(): void {
    this.service.getOfUser()
      .then(result => {
        const dialogRef = this.dialog.open(DialogListComponent, {
          width: '600px',
          data: {
            title: 'Select a service (project)',
            displayedColumns: ['current', 'name', 'selection'],
            clientSecret: this.service.getSecret(),
            data: result,
          },
          panelClass: 'dialog-list'
        });
        dialogRef.afterClosed().subscribe(next => {
          this.changeSelectedService(next);
        });
      }).catch(_ => {
    });
  }

  onLogout() {
    this.userService.logout();
    this.toastrService.success('Success logout');
    this.router.navigate(['/']);
  }

  public reloadUsername() {
    this.username = this.userService.getUserName();
    if (this.username === null) {
      this.router.navigate(['/']);
    }
  }

  public changeSelectedService(clientSecret: string) {
    this.showProgress();
    const request = new RefreshTokenRequest();
    request.grant_type = 'refresh_token';
    request.refresh_token = this.localStorageService.getAuthRCookie();
    this.userService.auth(request, clientSecret)
      .then(_ => {
        this.router.navigate(['/users']);
        this.toastrService.success('Update service');
        this.hideProgress();
      })
      .catch(_ => {
        this.toastrService.error('Failed to update service');
        this.hideProgress();
    });
  }

  private showProgress(): void {
    this.progress.attach(new ComponentPortal(MatSpinner));
  }

  private hideProgress(): void {
    this.progress.detach();
  }
}
