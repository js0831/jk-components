import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { IloginButtonComponent } from './ilogin-button.component';

describe('IloginButtonComponent', () => {
  let component: IloginButtonComponent;
  let fixture: ComponentFixture<IloginButtonComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ IloginButtonComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(IloginButtonComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
