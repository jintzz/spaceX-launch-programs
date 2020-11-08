import { Component, OnInit } from '@angular/core';
import { Location } from '@angular/common';
import { LauchManagerService } from '../services/lauch-manager.service';


@Component({
  selector: 'app-launch-list',
  templateUrl: './launch-list.component.html',
  styleUrls: ['./launch-list.component.scss']
})
export class LaunchListComponent implements OnInit {
  flightHistory: any = [];
  isInitialLoad = true;
  landSuccess: boolean;
  constructor(
    private launchService: LauchManagerService,
    private location: Location
  ) { }

  ngOnInit() {
    this.getMissionData();
    this.detectUrlChange();
  }
  getMissionData() {
    this.launchService.getDataList().subscribe(data => {
      this.flightHistory = data;
      if (data && data.length) {
        this.isInitialLoad = false;
      }
    });
  }
  detectUrlChange() {
    this.location.onUrlChange((url: string, state: any) => {
      if (state && Object.keys(state).length) {
        this.landSuccess = state.land_success !== undefined ? state.land_success : '';
      }
    });
  }
}
