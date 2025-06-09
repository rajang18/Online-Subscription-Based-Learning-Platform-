import { ComponentFixture, TestBed } from '@angular/core/testing';

import { DashboardPlatformComponent } from './dashboard-platform.component';

describe('DashboardPlatformComponent', () => {
  let component: DashboardPlatformComponent;
  let fixture: ComponentFixture<DashboardPlatformComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [DashboardPlatformComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(DashboardPlatformComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
