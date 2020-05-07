import {Injectable} from '@angular/core';
import {ApiClientService} from './api-client.service';
import {environment} from '../../environments/environment';
import {LocalStorageService} from './local-storage.service';

@Injectable({
  providedIn: 'root'
})
export class GroupService {

  /**
   * Constructor.
   *
   * @param apiClientService ApiClientService
   * @param localStorageService LocalStorageService
   */
  constructor(private apiClientService: ApiClientService,
              private localStorageService: LocalStorageService) {
  }

  public async get(): Promise<any> {
    const options = ApiClientService.getGetAuthHeaders(
      this.localStorageService.getClientSecretCookie(),
      this.localStorageService.getAuthCookie());

    return await this.apiClientService.get(environment.api_base_url + '/api/v1/users/group', options)
      .then(result => {
        return result;
      })
      .catch(error => {
        console.log('Failed to getAll groups of user.' + error);
      });
  }

  public updateGroupIdCookie(groupId: number) {
    this.localStorageService.setGroupIdCookie(groupId);
  }
}
