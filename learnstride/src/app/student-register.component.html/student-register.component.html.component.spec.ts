import { ComponentFixture, TestBed } from '@angular/core/testing';

import { StudentRegisterComponentHtmlComponent } from './student-register.component.html.component';

describe('StudentRegisterComponentHtmlComponent', () => {
  let component: StudentRegisterComponentHtmlComponent;
  let fixture: ComponentFixture<StudentRegisterComponentHtmlComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [StudentRegisterComponentHtmlComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(StudentRegisterComponentHtmlComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
