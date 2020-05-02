import {Component, OnInit} from '@angular/core';
import {GroupService} from '../../service/group.service';
import {Group} from '../../model/group';
import {Overlay} from '@angular/cdk/overlay';
import {ComponentPortal} from '@angular/cdk/portal';
import {MatSpinner} from '@angular/material/progress-spinner';
import {ToastrService} from 'ngx-toastr';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent implements OnInit {
  public groups: Group[];
  public displayedColumns: string[];
  public progress = this.overlay.create({
    hasBackdrop: true,
    positionStrategy: this.overlay.position().global().centerHorizontally().centerVertically()
  });

  /**
   * Constructor.
   *
   * @param groupService GroupService
   * @param overlay Overlay
   * @param toastrService ToastrService
   */
  constructor(private groupService: GroupService,
              private overlay: Overlay,
              private toastrService: ToastrService) {
  }

  ngOnInit(): void {
    this.showProgress();

    this.groupService.get()
      .then(result => {
        this.groups = result;
        this.displayedColumns = ['id', 'name', 'uuid', 'selection'];
        this.hideProgress();
      }).catch(error => {
      this.toastrService.error('Could not read data.');
      this.hideProgress();
    });
  }

  onClickGroup(groupId: number) {
  }

  private showProgress(): void {
    this.progress.attach(new ComponentPortal(MatSpinner));
  }

  private hideProgress(): void {
    this.progress.detach();
  }
}
