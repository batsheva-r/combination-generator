import { ComponentFixture, TestBed } from '@angular/core/testing';

import { PermutationPage } from './permutation-page';

describe('PermutationPage', () => {
  let component: PermutationPage;
  let fixture: ComponentFixture<PermutationPage>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [PermutationPage]
    })
    .compileComponents();

    fixture = TestBed.createComponent(PermutationPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
