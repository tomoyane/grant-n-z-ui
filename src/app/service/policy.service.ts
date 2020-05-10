import { Injectable } from '@angular/core';
import {ApiClientService} from './infra/api-client.service';
import {LocalStorageService} from './infra/local-storage.service';
import {environment} from '../../environments/environment';

@Injectable({
  providedIn: 'root'
})
export class PolicyService {

  /**
   * Constructor.
   *
   * @param apiClientService ApiClientService
   * @param localStorageService LocalStorageService
   */
  constructor(private apiClientService: ApiClientService,
              private localStorageService: LocalStorageService) {
  }

  public async getOfUser(): Promise<any> {
    const options = ApiClientService.getGetAuthHeaders(
      this.localStorageService.getClientSecretCookie(),
      this.localStorageService.getAuthCookie());

    return await this.apiClientService.get(environment.api_base_url + '/api/v1/users/policy', options)
      .then(result => {
        return result;
      })
      .catch(error => {
        console.log('Failed to getGroupsOfUser policy of user.' + error);
      });
  }
}
