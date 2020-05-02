import {Injectable} from '@angular/core';
import {HttpClient} from '@angular/common/http';
import {LocalStorageService} from './local-storage.service';
import {environment} from '../../environments/environment';

@Injectable({
  providedIn: 'root'
})
export class ApiClientService {

  /**
   * Constructor.
   *
   * @param localStorageService LocalStorageService
   * @param http HttpClient
   */
  constructor(private localStorageService: LocalStorageService,
              private http: HttpClient) {
  }

  public async post(url, body, options): Promise<any> {
    return await this.http.post(url, body, options)
      .pipe()
      .toPromise()
      .then(result => {
        return result;
      })
      .catch(error => {
        if (error.status === 401) {
          this.localStorageService.clearCookie();
        }
        console.log('Failed to POST request.', error);
      });
  }

  public async get(url, options): Promise<any> {
    return await this.http.get(url, options)
      .pipe()
      .toPromise()
      .then(result => {
        return result;
      })
      .catch(error => {
        if (error.status === 401) {
          this.localStorageService.clearCookie();
        }
        console.log('Failed to GET request.', error);
      });
  }

  public delete() {

  }

  public put() {

  }
}
