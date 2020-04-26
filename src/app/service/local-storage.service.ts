import {Injectable} from '@angular/core';
import {CookieService} from 'ngx-cookie-service';

@Injectable({
  providedIn: 'root'
})
export class LocalStorageService {
  static AUTH_COOKIE = 'grantnz_auth';

  /**
   * Constructor.
   *
   * @param cookieService CookieService
   */
  constructor(private cookieService: CookieService) {
  }

  public setAuthCookie(token: string) {
    this.cookieService.set(LocalStorageService.AUTH_COOKIE, token);
  }

  public getAuthCookie(): string {
    return this.cookieService.get(LocalStorageService.AUTH_COOKIE);
  }
}
