import {Injectable} from '@angular/core';
import {environment} from '../../environments/environment';
import {Service} from '../model/service';
import {ApiClientService} from './api-client.service';

@Injectable({
  providedIn: 'root'
})
export class ServiceService {

  /**
   * Constructor.
   *
   * @param apiClientService ApiClientService
   */
  constructor(private apiClientService: ApiClientService) {
  }

  public async get(): Promise<any> {
    return await this.apiClientService.get(environment.api_base_url + '/api/v1/services', {})
      .then(result => {
        return result;
      })
      .catch(error => {
        console.log('Failed to get services.', error);
      });
  }

  public extractApiKey(services: Array<Service>, selectedName: string): string {
    let apiKey = '';
    services.forEach(service => {
      if (service.name === selectedName) {
        apiKey = service.api_key;
      }
    });
    return apiKey;
  }
}
