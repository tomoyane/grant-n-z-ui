import {Injectable} from '@angular/core';
import {HttpClient, HttpHeaders} from '@angular/common/http';
import {environment} from '../../environments/environment';
import {LoginRequest} from '../model/login-request';
import {LocalStorageService} from './local-storage.service';

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
   * @param localStorageService LocalStorageService
   * @param http HttpClient
   */
  constructor(private localStorageService: LocalStorageService,
              private http: HttpClient) {
  }

  public async login(loginRequest: LoginRequest): Promise<any> {
    return await this.http.post(environment.base_url + '/api/v1/token?type=operator', loginRequest, this.options)
      .pipe()
      .toPromise()
      .then(result => {
        this.localStorageService.setAuthCookie(JSON.parse(JSON.stringify(result)).token);
      })
      .catch(error => {
        console.log('Failed to operator login.', error);
      });
  }

  public getAuthCookie(): string {
    return this.localStorageService.getAuthCookie();
  }
}
