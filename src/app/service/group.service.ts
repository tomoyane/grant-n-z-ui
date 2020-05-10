import {Injectable} from '@angular/core';
import {ApiClientService} from './infra/api-client.service';
import {environment} from '../../environments/environment';
import {LocalStorageService} from './infra/local-storage.service';

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

  public async getGroupsOfUser(): Promise<any> {
    const options = ApiClientService.getGetAuthHeaders(
      this.localStorageService.getClientSecretCookie(),
      this.localStorageService.getAuthCookie());

    return await this.apiClientService.get(environment.api_base_url + '/api/v1/users/group', options)
      .then(result => {
        return result;
      })
      .catch(error => {
        console.log('Failed to get groups of user.' + error);
        return error;
      });
  }

  public async getGroupById(groupId: string): Promise<any> {
    const options = ApiClientService.getGetAuthHeaders(
      this.localStorageService.getClientSecretCookie(),
      this.localStorageService.getAuthCookie());

    return await this.apiClientService.get(environment.api_base_url + '/api/v1/groups/' + groupId, options)
      .then(result => {
        return result;
      })
      .catch(error => {
        console.log('Failed to get group by id.' + error);
        return error;
      });
  }

  public updateGid(groupId: number) {
    this.localStorageService.setGroupIdCookie(groupId);
  }
}
