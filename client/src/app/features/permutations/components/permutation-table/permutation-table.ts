import { ChangeDetectionStrategy, Component, input } from '@angular/core';
import { GetAllItem } from '../../../../core/models/all.dto';

@Component({
  selector: 'app-permutations-table',
  templateUrl: './permutation-table.html',
  styleUrls: ['./permutation-table.css'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class PermutationsTableComponent {
  readonly items = input.required<GetAllItem[]>();
}