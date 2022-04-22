import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ListofusersbycompanyComponent } from './listofusersbycompany.component';

describe('ListofusersbycompanyComponent', () => {
  let component: ListofusersbycompanyComponent;
  let fixture: ComponentFixture<ListofusersbycompanyComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ListofusersbycompanyComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(ListofusersbycompanyComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
