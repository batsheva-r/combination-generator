import { ComponentFixture, TestBed } from '@angular/core/testing';

import { StartForm } from './start-form';

describe('StartForm', () => {
  let component: StartForm;
  let fixture: ComponentFixture<StartForm>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [StartForm]
    })
    .compileComponents();

    fixture = TestBed.createComponent(StartForm);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
