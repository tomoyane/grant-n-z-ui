import {AfterViewInit, Component} from '@angular/core';
import {environment} from '../environments/environment';
import {LocalStorageService} from './service/local-storage.service';
import {Router} from '@angular/router';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
  public consoleName = environment.name;
  public username: string;
  private localStorageService: LocalStorageService;

  /**
   * Constructor.
   *
   * @param localStorageService LocalStorageService
   * @param router Router
   */
  constructor(localStorageService: LocalStorageService, private router: Router) {
    this.localStorageService = localStorageService;
    this.reloadUsername();
  }

  public reloadUsername() {
    this.username = this.localStorageService.getUsername();
    if (this.username === null) {
      this.router.navigate(['/login']);
    }
  }
}
