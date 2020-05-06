import {Injectable} from '@angular/core';
import {HttpClient, HttpHeaders} from '@angular/common/http';
import {LocalStorageService} from './local-storage.service';
import {Router} from '@angular/router';
import {environment} from '../../environments/environment';
import {RefreshTokenRequest} from '../model/refresh-token-request';

@Injectable({
  providedIn: 'root'
})
export class ApiClientService {
  private retryCnt = 3;

  /**
   * Constructor.
   *
   * @param localStorageService LocalStorageService
   * @param http HttpClient
   * @param router Router
   */
  constructor(private localStorageService: LocalStorageService,
              private http: HttpClient,
              private router: Router) {
  }

  public async post(url, body, options): Promise<any> {
    let response: any;

    for (let i = 0; i < this.retryCnt; i++) {
      response = await this.http.post(url, body, options)
        .pipe()
        .toPromise()
        .then(result => {
          return result;
        })
        .catch(error => {
          console.log('Failed to POST request.', error);
          return this.errorHandling(error).then(headers => {
            options = headers;
            return 'retry';
          });
        });

      if (response === 'retry') {
        continue;
      }
      break;
    }

    return response;
  }

  public async get(url, options): Promise<any> {
    let response: any;

    for (let i = 0; i < this.retryCnt; i++) {
      response = await this.http.get(url, options)
        .pipe()
        .toPromise()
        .then(result => {
          return result;
        })
        .catch(error => {
          console.log('Failed to GET request.', error);
          return this.errorHandling(error).then(headers => {
            options = headers;
            return 'retry';
          });
        });

      if (response === 'retry') {
        continue;
      }
      break;
    }

    return response;
  }

  public delete() {
  }

  public put() {
  }

  private async errorHandling(error): Promise<any> {
    if (error.status === 401) {
      if (JSON.parse(JSON.stringify(error.error)).detail.includes('expired')) {
        return await this.refreshToken().then(headers => {
          console.log('Token refresh.');
          return headers;
        });
      }

      this.localStorageService.clearCookie();
      await this.router.navigate(['/']);
    }
  }

  private async refreshToken(): Promise<any> {
    const options = {
      headers: new HttpHeaders({
        'Content-Type': 'application/json',
        'Client-Secret': this.localStorageService.getClientSecretCookie(),
      })
    };

    const refreshTokenRequest = new RefreshTokenRequest();
    refreshTokenRequest.grant_type = 'refresh_token';
    refreshTokenRequest.refresh_token = this.localStorageService.getAuthRCookie();
    return await this.post(environment.api_base_url + '/api/v1/token', refreshTokenRequest, options)
      .then(result => {
        const response = JSON.parse(JSON.stringify(result));
        this.localStorageService.setAuthCookie(response.token);
        this.localStorageService.setAuthRCookie(response.refresh_token);
        return {
          headers: new HttpHeaders({
            'Client-Secret': this.localStorageService.getClientSecretCookie(),
            Authorization: 'Bearer ' + response.token,
          })
        };
      });
  }
}
