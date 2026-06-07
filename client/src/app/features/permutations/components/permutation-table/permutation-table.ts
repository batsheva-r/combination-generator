import { ChangeDetectionStrategy, Component, input } from '@angular/core';
import { GetAllItem } from '../../../../core/models/all.dto';
import { BigIntNumberPipe } from '../../../../core/pipes/bigint-number';

@Component({
  selector: 'app-permutations-table',
  templateUrl: './permutation-table.html',
  styleUrls: ['./permutation-table.css'],
  imports: [BigIntNumberPipe],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class PermutationsTableComponent {
  readonly items = input.required<GetAllItem[]>();
}