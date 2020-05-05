import {Injectable} from '@angular/core';
import {HttpHeaders} from '@angular/common/http';
import {environment} from '../../environments/environment';
import {LoginRequest} from '../model/login-request';
import {LocalStorageService} from './local-storage.service';
import {ApiClientService} from './api-client.service';

@Injectable({
  providedIn: 'root'
})
export class UserService {
  /**
   * Constructor.
   *
   * @param localStorageService LocalStorageService
   * @param apiClientService ApiClientService
   */
  constructor(private localStorageService: LocalStorageService,
              private apiClientService: ApiClientService) {
  }

  public async login(loginRequest: LoginRequest, clientSecret: string): Promise<any> {
    const options = {
      headers: new HttpHeaders({
        'Content-Type': 'application/json',
        'Client-Secret': clientSecret,
      })
    };

    return this.apiClientService.post(environment.api_base_url + '/api/v1/token', loginRequest, options)
      .then(result => {
        this.localStorageService.setAuthCookie(JSON.parse(JSON.stringify(result)).token);
        this.localStorageService.setClientSecretCookie(clientSecret);
      });
  }

  public getAuthCookie(): string {
    return this.localStorageService.getAuthCookie();
  }

  public getApiKeyCookie(): string {
    return this.localStorageService.getClientSecretCookie();
  }

  public getUserName(): string {
    return this.localStorageService.getUsername();
  }

  public logout() {
    this.localStorageService.clearCookie();
  }
}
