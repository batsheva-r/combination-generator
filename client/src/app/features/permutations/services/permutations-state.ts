import { Injectable, computed, inject, signal } from '@angular/core';
import { firstValueFrom } from 'rxjs';
import { PermutationsApi } from '../../../core/api/permutations.api';
import type { StartRequest } from '../../../core/models/start.dto';
import type { GetAllItem } from '../../../core/models/all.dto';
import type { ViewState } from '../models/view-state';

@Injectable({
  providedIn: 'root',
})
export class PermutationsState {
  private readonly api = inject(PermutationsApi);
  private readonly pageSize = 10;

  readonly viewMode = signal<ViewState>('input');
  readonly n = signal<number | null>(null);
  readonly totalPermutations = signal<bigint>(0n);
  readonly currentIndex = signal<bigint>(0n);
  readonly currentPermutation = signal<number[]>([]);
  readonly items = signal<GetAllItem[]>([]);
  readonly page = signal<bigint>(1n);
  readonly totalPages = signal<bigint>(0n);
  readonly totalItems = signal<bigint>(0n);
  readonly hasNextPage = signal<boolean>(false);
  readonly hasPreviousPage = signal<boolean>(false);
  readonly loading = signal<boolean>(false);
  readonly error = signal<string | null>(null);

  readonly hasStarted = computed(() => this.n() !== null);
  readonly isInputMode = computed(
    () => this.viewMode() === 'input',
  );
  readonly isSingleMode = computed(
    () => this.viewMode() === 'single',
  );
  readonly isListMode = computed(
    () => this.viewMode() === 'list',
  );
  readonly hasCurrentPermutation = computed(
    () => this.currentPermutation().length > 0,
  );
  readonly currentIndexLabel = computed(
    () => (this.currentIndex() + 1n).toString(),
  );
  readonly canShowAll = computed(() => {
    const total = this.totalPermutations();
    if (!this.hasCurrentPermutation()) {
      return total > 0n;
    }
    return this.currentIndex() + 1n < total;
  });

  async start(n: number): Promise<void> {
    this.loading.set(true);
    this.error.set(null);
    try {
      const request: StartRequest = { n };
      const response = await firstValueFrom(
        this.api.start(request),
      );
      this.n.set(n);
      this.totalPermutations.set(BigInt(response.total));
      this.currentIndex.set(0n);
      this.currentPermutation.set([]);
      this.items.set([]);
      this.page.set(1n);
      this.totalPages.set(0n);
      this.totalItems.set(0n);
      this.viewMode.set('single');
      this.hasNextPage.set(false);
      this.hasPreviousPage.set(false);
    } catch {
      this.error.set('Failed to start calculation');
    } finally {
      this.loading.set(false);
    }
  }

  async next(): Promise<void> {
    const n = this.n();
    if (n === null) {
      return;
    }
    const total = this.totalPermutations();
    const nextIndex = this.hasCurrentPermutation()
      ? this.currentIndex() + 1n
      : this.currentIndex();

    if (nextIndex >= total) {
      this.error.set('No more permutations available');
      return;
    }
    this.loading.set(true);
    this.error.set(null);
    try {
      const response = await firstValueFrom(
        this.api.next({
          n,
          index: nextIndex.toString(),
        }),
      );
      this.currentIndex.set(BigInt(response.index));
      this.currentPermutation.set(
        response.permutation,
      );
    } catch {
      this.error.set('Failed to load next permutation');
    } finally {
      this.loading.set(false);
    }
  }

  async switchToList(): Promise<void> {
    if (!this.canShowAll()) {
      this.error.set('No more permutations available.');
      return;
    }
    // Calculate the page that contains the next permutation (currentIndex + 1)
    const nextIndex = this.hasCurrentPermutation()
      ? this.currentIndex() + 1n
      : 0n;
    const targetPage = nextIndex / BigInt(this.pageSize) + 1n;
    this.viewMode.set('list');
    await this.loadPage(targetPage, 0n);
  }

  switchToSingle(): void {
    const lastItem = this.items().at(-1);
    if (lastItem) {
      // API returns table item indexes as 1-based values.
      // Convert to the internal zero-based permutation index.
      this.currentIndex.set(BigInt(lastItem.index) - 1n);
      this.currentPermutation.set([...lastItem.permutation]);
    }
    this.viewMode.set('single');
  }

  async loadPage(page: bigint, startIndex = 0n): Promise<void> {
    const n = this.n();
    if (n === null) {
      return;
    }
    this.loading.set(true);
    this.error.set(null);
    try {
      const response = await firstValueFrom(
        this.api.getAll({
          n,
          startIndex: startIndex.toString(),
          page: page.toString(),
          pageSize: this.pageSize,
        }),
      );
      this.page.set(BigInt(response.page));
      this.totalPages.set(BigInt(response.total_pages));
      this.totalItems.set(BigInt(response.total_items));
      this.hasNextPage.set(response.has_next);
      this.hasPreviousPage.set(response.has_prev);
      this.items.set(response.items);
    } catch {
      this.error.set('Failed to load permutations');
    } finally {
      this.loading.set(false);
    }
  }

  async firstPage(): Promise<void> {
    await this.loadPage(1n);
  }

  async previousPage(): Promise<void> {
    if (!this.hasPreviousPage()) {
      return;
    }
    await this.loadPage(this.page() - 1n);
  }

  async nextPage(): Promise<void> {
    if (!this.hasNextPage()) {
      return;
    }
    await this.loadPage(this.page() + 1n);
  }

  async lastPage(): Promise<void> {
    await this.loadPage(this.totalPages());
  }

  reset(): void {
    this.viewMode.set('input');
    this.n.set(null);
    this.totalPermutations.set(0n);
    this.currentIndex.set(0n);
    this.currentPermutation.set([]);
    this.items.set([]);
    this.page.set(1n);
    this.totalPages.set(0n);
    this.totalItems.set(0n);
    this.hasNextPage.set(false);
    this.hasPreviousPage.set(false);
    this.loading.set(false);
    this.error.set(null);
  }
}