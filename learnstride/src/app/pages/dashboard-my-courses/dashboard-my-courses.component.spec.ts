import { ComponentFixture, TestBed } from '@angular/core/testing';

import { DashboardMyCoursesComponent } from './dashboard-my-courses.component';

describe('DashboardMyCoursesComponent', () => {
  let component: DashboardMyCoursesComponent;
  let fixture: ComponentFixture<DashboardMyCoursesComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [DashboardMyCoursesComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(DashboardMyCoursesComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
