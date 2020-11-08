import { Component, OnInit } from '@angular/core';
import { Location } from '@angular/common';
import { LauchManagerService } from '../services/lauch-manager.service';

@Component({
  selector: 'app-filter',
  templateUrl: './filter.component.html',
  styleUrls: ['./filter.component.scss']
})
export class FilterComponent implements OnInit {
  launchYear: any;
  states: any;
  selectedYear: any;
  launchStatus: boolean;
  landStatus: boolean;
  constructor(
    private launchService: LauchManagerService,
    private location: Location
  ) { }

  ngOnInit() {
    this.location.go('/launchBoard', '', '');
    this.detectUrlChange();
    this.launchYear = [2006, 2007, 2008, 2009, 2010, 2011, 2012, 2013, 2014, 2015, 2016, 2017, 2018, 2019, 2020];
    this.states = [{ key: true, value: 'True' }, { key: false, value: 'False' }];
    this.launchService.fetchLaunchList();
  }
  detectUrlChange() {
    this.location.onUrlChange((url: string, state: any) => {
      if (state && Object.keys(state).length) {
        this.launchService.fetchLaunchList(state);
      }
    });
  }
  changeFilter(event) {
    this.selectedYear = event.key === 'launch_year' ?
      event.value === this.selectedYear ? undefined : event.value
      : this.selectedYear;
    this.launchStatus = event.key === 'launch_success' ?
      event.value === this.launchStatus ? undefined : event.value
      : this.launchStatus;
    this.landStatus = event.key === 'land_success' ?
      event.value === this.landStatus ? undefined : event.value
      : this.landStatus;
    const payload = {
      launch_success: this.launchStatus,
      land_success: this.landStatus,
      launch_year: this.selectedYear
    };
    let payloadString = '';
    if (payload) {
      payloadString = payload.launch_year ?
        payloadString + '&launch_year=' + payload.launch_year : payloadString;
      payloadString = 'land_success' in payload && payload.land_success !== undefined ?
        payloadString + '&land_success=' + payload.land_success : payloadString;
      payloadString = 'launch_success' in payload && payload.launch_success !== undefined ?
        payloadString + '&launch_success=' + payload.launch_success : payloadString;

    }
    this.location.go('/launchBoard', payloadString, payload);
  }
}
