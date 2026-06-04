import { ChangeDetectionStrategy, Component, output, inject } from '@angular/core';
import { FormBuilder, ReactiveFormsModule, Validators } from '@angular/forms';

@Component({
  selector: 'app-start-form',
  imports: [ReactiveFormsModule],
  templateUrl: './start-form.html',
  styleUrls: ['./start-form.css'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class StartFormComponent {
  private readonly fb = inject(FormBuilder);
  readonly startClicked = output<number>();
  readonly form = this.fb.group({
    n: [null as number | null, [Validators.required, Validators.min(1), Validators.max(20)]],
  });

  submit(): void {
    if (this.form.invalid) {
      this.form.markAllAsTouched();
      return;
    }
    this.startClicked.emit(this.form.controls.n.value as number);
  }
}