import { ComponentFixture, TestBed } from '@angular/core/testing';

import { LoginattemptsdetailsComponent } from './loginattemptsdetails.component';

describe('LoginattemptsdetailsComponent', () => {
  let component: LoginattemptsdetailsComponent;
  let fixture: ComponentFixture<LoginattemptsdetailsComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ LoginattemptsdetailsComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(LoginattemptsdetailsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
