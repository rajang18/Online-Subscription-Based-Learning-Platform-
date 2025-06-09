import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ManageCoursesComponent } from './manage-course.component';

describe('ManageCourseComponent', () => {
  let component: ManageCoursesComponent;
  let fixture: ComponentFixture<ManageCoursesComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [ManageCoursesComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(ManageCoursesComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
