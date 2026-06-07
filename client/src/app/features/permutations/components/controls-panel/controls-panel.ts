import { ChangeDetectionStrategy, Component, input, output, } from '@angular/core';
import { FontAwesomeModule } from '@fortawesome/angular-fontawesome';
import { faArrowRight, faList, faArrowLeft, faUndo } from '@fortawesome/free-solid-svg-icons';

@Component({
  selector: 'app-controls-panel',
  imports: [FontAwesomeModule],
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
  readonly faArrowRight = faArrowRight;
  readonly faList = faList;
  readonly faArrowLeft = faArrowLeft;
  readonly faUndo = faUndo;
}