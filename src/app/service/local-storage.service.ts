import {Injectable} from '@angular/core';
import {CookieService} from 'ngx-cookie-service';
import {environment} from '../../environments/environment';

@Injectable({
  providedIn: 'root'
})
export class LocalStorageService {
  static AUTH_COOKIE = 'grantnz_auth';
  static API_KEY = 'api_key';

  /**
   * Constructor.
   *
   * @param cookieService CookieService
   */
  constructor(private cookieService: CookieService) {
  }

  public clearCookie() {
    this.cookieService.deleteAll();
  }

  public setAuthCookie(token: string) {
    this.cookieService.set(LocalStorageService.AUTH_COOKIE, token, null, '/', environment.hostname, false, 'Strict');
  }

  public getAuthCookie(): string {
    return this.cookieService.get(LocalStorageService.AUTH_COOKIE);
  }

  public setApiKeyCookie(apiKey: string) {
    this.cookieService.set(LocalStorageService.API_KEY, apiKey, null, '/', environment.hostname, false, 'Strict');
  }

  public getApiKeyCookie(): string {
    return this.cookieService.get(LocalStorageService.API_KEY);
  }

  public getUsername(): string {
    const token = this.cookieService.get(LocalStorageService.AUTH_COOKIE);
    if (token === null || token === '') {
      return null;
    }

    const payload = token.split('.')[1];
    if (payload === null || payload === '') {
      this.clearCookie();
      return null;
    }

    const authUser = atob(payload);
    return JSON.parse(authUser).username;
  }
}
