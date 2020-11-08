import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { HttpClientTestingModule } from '@angular/common/http/testing';
import { CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { RouterTestingModule } from '@angular/router/testing';

import { LaunchListComponent } from './launch-list.component';
import { LauchManagerService } from '../services/lauch-manager.service';
import { of } from 'rxjs';

class MockLauchManagerService {
  getDataList() {
    return of(mockData);
  }
}

const mockData = [
  {
    key: 'test1',
    value: 'test2',
    link: {
      mission_patch_small: true
    }
  }
];

describe('LaunchListComponent', () => {
  let component: LaunchListComponent;
  let fixture: ComponentFixture<LaunchListComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [LaunchListComponent],
      imports: [HttpClientTestingModule, RouterTestingModule],
      schemas: [CUSTOM_ELEMENTS_SCHEMA],
      providers: [
        { provide: LauchManagerService, useClass: MockLauchManagerService }
      ]
    })
      .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(LaunchListComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
  it('should fetch data from API on page load', () => {
    component.getMissionData();
    expect(component.flightHistory).toEqual(mockData);
  });
});
