import { ChangeDetectionStrategy, Component, computed, input } from '@angular/core';

export type AlertVariant = 'error' | 'info' | 'success' | 'warning';

const ALERT_CLASSES: Readonly<Record<AlertVariant, string>> = {
  error: 'border-red-200 bg-red-50 text-red-700',
  info: 'border-blue-200 bg-blue-50 text-blue-700',
  success: 'border-emerald-200 bg-emerald-50 text-emerald-700',
  warning: 'border-amber-200 bg-amber-50 text-amber-700',
};

@Component({
  selector: 'app-alert',
  template: `
    <div
      class="rounded-xl border px-4 py-3 text-sm"
      [class]="variantClasses()"
      [attr.role]="role()"
      [attr.aria-live]="role() === 'alert' ? 'assertive' : 'polite'"
    >
      {{ message() }}
    </div>
  `,
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class AlertComponent {
  readonly message = input.required<string>();
  readonly variant = input<AlertVariant>('info');

  protected readonly role = computed(() =>
    this.variant() === 'error' || this.variant() === 'warning' ? 'alert' : 'status',
  );
  protected readonly variantClasses = computed(() => ALERT_CLASSES[this.variant()]);
}
