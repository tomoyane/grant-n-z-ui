import {Injectable} from '@angular/core';
import {environment} from '../../environments/environment';
import {Service} from '../model/service';
import {ApiClientService} from './api-client.service';
import {LocalStorageService} from './local-storage.service';

@Injectable({
  providedIn: 'root'
})
export class ServiceService {

  /**
   * Constructor.
   *
   * @param apiClientService ApiClientService
   * @param localStorageService LocalStorageService
   */
  constructor(private apiClientService: ApiClientService,
              private localStorageService: LocalStorageService) {
  }

  public async getAll(): Promise<any> {
    return await this.apiClientService.get(environment.api_base_url + '/api/v1/services', {})
      .then(result => {
        return result;
      })
      .catch(error => {
        console.log('Failed to get all services.', error);
      });
  }

  public async getOfUser(): Promise<any> {
    const options = ApiClientService.getGetAuthHeaders(
      this.localStorageService.getClientSecretCookie(),
      this.localStorageService.getAuthCookie());

    return await this.apiClientService.get(environment.api_base_url + '/api/v1/users/service', options)
      .then(result => {
        return result;
      })
      .catch(error => {
        console.log('Failed to get services of user.', error);
      });
  }

  public extractApiKey(services: Array<Service>, selectedName: string): string {
    let clientSecret = '';
    services.forEach(service => {
      if (service.name === selectedName) {
        clientSecret = service.secret;
      }
    });
    return clientSecret;
  }

  public getSecret(): string {
    return this.localStorageService.getClientSecretCookie();
  }
}
