import { ChangeDetectionStrategy, Component, computed, effect, input, signal } from '@angular/core';
import { AbstractControl } from '@angular/forms';

type ErrorMessageResolver = (errorDetails: unknown) => string;

const readNumericDetail = (errorDetails: unknown, key: string): number | null => {
  if (typeof errorDetails !== 'object' || errorDetails === null) {
    return null;
  }

  const value = (errorDetails as Record<string, unknown>)[key];
  return typeof value === 'number' ? value : null;
};

const DEFAULT_ERROR_MESSAGES: Readonly<Record<string, ErrorMessageResolver>> = {
  required: () => 'این فیلد الزامی است.',
  requiredTrue: () => 'پذیرفتن این گزینه الزامی است.',
  email: () => 'ایمیل واردشده معتبر نیست.',
  minlength: (details) => {
    const requiredLength = readNumericDetail(details, 'requiredLength');
    return requiredLength === null
      ? 'تعداد کاراکترهای واردشده کمتر از حد مجاز است.'
      : `حداقل ${requiredLength} کاراکتر وارد کنید.`;
  },
  maxlength: (details) => {
    const requiredLength = readNumericDetail(details, 'requiredLength');
    return requiredLength === null
      ? 'تعداد کاراکترهای واردشده بیشتر از حد مجاز است.'
      : `حداکثر ${requiredLength} کاراکتر وارد کنید.`;
  },
  min: (details) => {
    const minimum = readNumericDetail(details, 'min');
    return minimum === null
      ? 'مقدار واردشده کمتر از حد مجاز است.'
      : `حداقل مقدار مجاز ${minimum} است.`;
  },
  max: (details) => {
    const maximum = readNumericDetail(details, 'max');
    return maximum === null
      ? 'مقدار واردشده بیشتر از حد مجاز است.'
      : `حداکثر مقدار مجاز ${maximum} است.`;
  },
  pattern: () => 'فرمت مقدار واردشده معتبر نیست.',
};

@Component({
  selector: 'mat-error[appFormControlError]',
  template: `{{ errorMessage() }}`,
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class FormControlErrorComponent {
  readonly control = input.required<AbstractControl>();

  private readonly controlStateVersion = signal(0);

  protected readonly errorMessage = computed(() => {
    this.controlStateVersion();

    const control = this.control();
    if (!control.invalid || (!control.touched && !control.dirty) || !control.errors) {
      return '';
    }

    const errorKey = Object.keys(control.errors)[0];
    if (!errorKey) {
      return '';
    }

    const resolveMessage = DEFAULT_ERROR_MESSAGES[errorKey];
    return resolveMessage?.(control.errors[errorKey]) ?? 'مقدار واردشده معتبر نیست.';
  });

  private readonly observeControlState = effect((onCleanup) => {
    const subscription = this.control().events
      .subscribe(() => {
      this.controlStateVersion.update((version) => version + 1);
    });

    onCleanup(() => subscription.unsubscribe());
  });
}
