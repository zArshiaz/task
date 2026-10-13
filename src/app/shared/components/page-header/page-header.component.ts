import { ChangeDetectionStrategy, Component, input } from '@angular/core';

import { JalaliDatePipe } from '../../pipes/jalali-date/jalali-date.pipe';
import type { JalaliDateFormat } from '../../pipes/jalali-date/jalali-date.types';

@Component({
  selector: 'app-page-header',
  imports: [JalaliDatePipe],
  templateUrl: './page-header.component.html',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class PageHeaderComponent {
  readonly title = input.required<string>();
  readonly description = input<string | null>(null);
  readonly titleId = input('page-title');
  readonly showDate = input(false);
  readonly date = input(new Date());
  readonly dateLabel = input('امروز');
  readonly dateFormat = input<JalaliDateFormat>('d MMMM yyyy');
}
