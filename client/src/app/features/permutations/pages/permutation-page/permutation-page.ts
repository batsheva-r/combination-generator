import { ChangeDetectionStrategy, Component, inject } from '@angular/core';
import { FontAwesomeModule } from '@fortawesome/angular-fontawesome';
import { faExclamationTriangle, faShuffle } from '@fortawesome/free-solid-svg-icons';
import { StartFormComponent } from '../../components/start-form/start-form';
import { ControlsPanelComponent } from '../../components/controls-panel/controls-panel';
import { PermutationsTableComponent } from '../../components/permutation-table/permutation-table';
import { PaginationComponent } from '../../components/pagination/pagination';
import { PermutationsState } from '../../services/permutations-state';

@Component({
  selector: 'app-permutations-page',
  imports: [FontAwesomeModule, StartFormComponent, ControlsPanelComponent, PermutationsTableComponent, PaginationComponent],
  templateUrl: './permutation-page.html',
  styleUrls: ['./permutation-page.css'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class PermutationsPageComponent {
  readonly state = inject(PermutationsState);
  readonly faShuffle = faShuffle;
  readonly faExclamationTriangle = faExclamationTriangle;

  start(n: number): void {
    void this.state.start(n);
  }

  next(): void {
    void this.state.next();
  }

  showAll(): void {
    void this.state.switchToList();
  }

  back(): void {
    this.state.switchToSingle();
  }

  reset(): void {
    this.state.reset();
  }

  firstPage(): void {
    void this.state.firstPage();
  }

  previousPage(): void {
    void this.state.previousPage();
  }

  nextPage(): void {
    void this.state.nextPage();
  }

  lastPage(): void {
    void this.state.lastPage();
  }

  goToPage(page: bigint): void {
    void this.state.loadPage(page);
  }
}