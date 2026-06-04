import { ChangeDetectionStrategy, Component, input, output, } from '@angular/core';

@Component({
  selector: 'app-controls-panel',
  templateUrl: './controls-panel.html',
  styleUrls: ['./controls-panel.css'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class ControlsPanelComponent {
  readonly isListMode = input.required<boolean>();
  readonly canShowAll = input.required<boolean>();
  readonly loading = input(false);
  readonly nextClicked = output<void>();
  readonly showAllClicked = output<void>();
  readonly resetClicked = output<void>();
  readonly backClicked = output<void>();
}