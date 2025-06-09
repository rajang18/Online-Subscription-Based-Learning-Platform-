import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AadminDashboardComponent } from './aadmin-dashboard.component';

describe('AadminDashboardComponent', () => {
  let component: AadminDashboardComponent;
  let fixture: ComponentFixture<AadminDashboardComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [AadminDashboardComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(AadminDashboardComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
