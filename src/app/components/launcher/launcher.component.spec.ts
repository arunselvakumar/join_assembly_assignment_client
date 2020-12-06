import { ComponentFixture, TestBed } from '@angular/core/testing';

import { LauncherComponent } from './launcher.component';

describe('LauncherComponent', () => {
  let component: LauncherComponent;
  let fixture: ComponentFixture<LauncherComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ LauncherComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(LauncherComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
