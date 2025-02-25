import { ChangeDetectionStrategy, Component } from '@angular/core';

@Component({
  selector: 'spinner',
  imports: [],
  templateUrl: './spinner.component.html',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class SpinnerComponent { }
