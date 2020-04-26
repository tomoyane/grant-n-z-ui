import {Component, OnInit} from '@angular/core';
import {OperatorLoginService} from '../../service/operator-login.service';
import {LoginRequest} from '../../model/login-request';
import {Overlay} from '@angular/cdk/overlay';
import {ComponentPortal} from '@angular/cdk/portal';
import {MatSpinner} from '@angular/material/progress-spinner';
import {ToastrService} from 'ngx-toastr';
import {Router} from '@angular/router';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {
  public loginRequest: LoginRequest = new LoginRequest();
  public loginError: string;
  public progress = this.overlay.create({
    hasBackdrop: true,
    positionStrategy: this.overlay.position().global().centerHorizontally().centerVertically()
  });

  /**
   * Constructor.
   *
   * @param operatorLoginService OperatorLoginService
   * @param router Router
   * @param overlay Overlay
   * @param toastrService ToastrService
   */
  constructor(private operatorLoginService: OperatorLoginService,
              private router: Router,
              private overlay: Overlay,
              private toastrService: ToastrService) {
  }

  ngOnInit(): void {
  }

  onSubmit() {
    this.loginError = '';
    this.showProgress();
    this.operatorLoginService.login(this.loginRequest)
      .finally(() => {
        this.hideProgress();
        const token = this.operatorLoginService.getAuthCookie();
        if (token == null || token === '') {
          this.loginError = 'Email or Password is invalid';
        } else {
          this.toastrService.success('Success login');
          this.router.navigate(['/']);
        }
      });
  }

  private showProgress(): void {
    this.progress.attach(new ComponentPortal(MatSpinner));
  }

  private hideProgress(): void {
    this.progress.detach();
  }
}
