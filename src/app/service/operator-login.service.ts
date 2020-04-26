import {Injectable} from '@angular/core';
import {HttpClient, HttpHeaders} from '@angular/common/http';
import {CookieService} from 'ngx-cookie-service';
import {environment} from '../../environments/environment';
import {LoginRequest} from '../model/login-request';
import {Logger} from '../common/logger';

@Injectable({
  providedIn: 'root'
})
export class OperatorLoginService {
  options = {
    headers: new HttpHeaders({
      'Content-Type': 'application/json',
    })
  };

  /**
   * Constructor.
   *
   * @param cookieService CookieService
   * @param http HttpClient
   */
  constructor(private cookieService: CookieService,
              private http: HttpClient) {
  }

  public async login(loginRequest: LoginRequest) {
    return await this.http.post(environment.base_url + '/api/v1/token', loginRequest, this.options)
      .toPromise()
      .then(result => {
        Logger.debug('Then response.', result);
        // this.cookieService.set(Const.AUTH_COOKIE, result['token']);
      })
      .catch(error => {
        Logger.debug('Failed to operator login.', error);
      });
  }
}
