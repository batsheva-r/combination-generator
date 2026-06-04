import { ComponentFixture, TestBed } from '@angular/core/testing';

import { PermutationTable } from './permutation-table';

describe('PermutationTable', () => {
  let component: PermutationTable;
  let fixture: ComponentFixture<PermutationTable>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [PermutationTable]
    })
    .compileComponents();

    fixture = TestBed.createComponent(PermutationTable);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
