import { ComponentFixture, TestBed } from '@angular/core/testing';

import { LoginattemptsComponent } from './loginattempts.component';

describe('LoginattemptsComponent', () => {
  let component: LoginattemptsComponent;
  let fixture: ComponentFixture<LoginattemptsComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ LoginattemptsComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(LoginattemptsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
