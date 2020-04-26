import {Component, OnInit} from '@angular/core';
import {OperatorLoginService} from '../../service/operator-login.service';
import {LoginRequest} from '../../model/login-request';
import {Overlay} from '@angular/cdk/overlay';
import {ComponentPortal} from '@angular/cdk/portal';
import {MatSpinner} from '@angular/material/progress-spinner';
import {Logger} from '../../common/logger';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {
  public loginRequest: LoginRequest = new LoginRequest();
  public progress = this.overlay.create({
    hasBackdrop: true,
    positionStrategy: this.overlay
      .position().global().centerHorizontally().centerVertically()
  });

  /**
   * Constructor.
   *
   * @param operatorLoginService OperatorLoginService
   * @param overlay Overlay
   */
  constructor(private operatorLoginService: OperatorLoginService,
              private overlay: Overlay) {
  }

  ngOnInit(): void {
  }

  onSubmit() {
    this.showProgress();
    this.operatorLoginService.login(this.loginRequest).finally(() => console.log('end'));
    this.hideProgress();
  }

  private showProgress(): void {
    this.progress.attach(new ComponentPortal(MatSpinner));
  }

  private hideProgress(): void {
    this.progress.detach();
  }
}
