import { ChangeDetectionStrategy, Component, computed, inject, input, output } from '@angular/core';
import { BigIntNumberPipe } from '../../../../core/pipes/bigint-number';
import { PageLabelPipe } from '../../../../core/pipes/page-label';
import { FormBuilder, ReactiveFormsModule, Validators } from '@angular/forms';
import { FontAwesomeModule } from '@fortawesome/angular-fontawesome';
import { faAnglesRight, faAngleLeft, faAngleRight, faAnglesLeft } from '@fortawesome/free-solid-svg-icons';

@Component({
  selector: 'app-pagination',
  imports: [ReactiveFormsModule, FontAwesomeModule, BigIntNumberPipe, PageLabelPipe],
  templateUrl: './pagination.html',
  styleUrls: ['./pagination.css'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class PaginationComponent {
  private readonly fb = inject(FormBuilder);
  readonly faAnglesLeft = faAnglesLeft;
  readonly faAngleLeft = faAngleLeft;
  readonly faAngleRight = faAngleRight;
  readonly faAnglesRight = faAnglesRight;

  readonly page = input.required<bigint>();
  readonly totalPages = input.required<bigint>();
  readonly hasNextPage = input.required<boolean>();
  readonly hasPreviousPage = input.required<boolean>();
  readonly loading = input(false);

  readonly firstPageClicked = output<void>();
  readonly previousPageClicked = output<void>();
  readonly nextPageClicked = output<void>();
  readonly lastPageClicked = output<void>();
  readonly pageChanged = output<bigint>();

  readonly jumpForm = this.fb.nonNullable.group({
    page: ['1', [Validators.required, Validators.pattern(/^[1-9]\d*$/)]],
  });

  readonly visiblePages = computed(() => {
    const current = this.page();
    const total = this.totalPages();
    const start = current > 2n ? current - 2n : 1n;
    const end = current + 2n < total ? current + 2n : total;
    const count = Number(end - start + 1n);
    return Array.from({ length: count }, (_, index) => start + BigInt(index));
  });

  goToPage(): void {
    if (this.jumpForm.invalid) {
      this.jumpForm.markAllAsTouched();
      return;
    }
    const pageValue = this.jumpForm.controls.page.value;
    try {
      const page = BigInt(pageValue);
      if (page < 1n || page > this.totalPages()) {
        this.jumpForm.markAllAsTouched();
        return;
      }
      this.pageChanged.emit(page);
    } catch {
      this.jumpForm.markAllAsTouched();
    }
  }
}