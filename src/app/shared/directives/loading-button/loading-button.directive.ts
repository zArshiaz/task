import {
  booleanAttribute,
  ComponentRef,
  DestroyRef,
  Directive,
  effect,
  ElementRef,
  inject,
  input,
  numberAttribute,
  Renderer2,
  ViewContainerRef,
} from '@angular/core';
import { MatProgressSpinner } from '@angular/material/progress-spinner';

@Directive({
  selector: 'button[appLoadingButton]',
})
export class LoadingButtonDirective {
  readonly loading = input(false, {
    alias: 'appLoadingButton',
    transform: booleanAttribute,
  });
  readonly spinnerDiameter = input(20, {
    alias: 'appLoadingButtonDiameter',
    transform: numberAttribute,
  });

  private readonly button = inject(ElementRef<HTMLButtonElement>).nativeElement;
  private readonly renderer = inject(Renderer2);
  private readonly viewContainerRef = inject(ViewContainerRef);

  private spinnerRef: ComponentRef<MatProgressSpinner> | null = null;
  private disabledBeforeLoading = false;

  constructor() {
    effect(() => {
      const loading = this.loading();
      const diameter = this.spinnerDiameter();

      if (loading) {
        this.showSpinner(diameter);
        return;
      }

      this.hideSpinner();
    });
  }

  private showSpinner(diameter: number): void {
    if (this.spinnerRef) {
      this.spinnerRef.setInput('diameter', diameter);
      return;
    }

    this.disabledBeforeLoading = this.button.disabled;
    this.renderer.setProperty(this.button, 'disabled', true);
    this.renderer.setAttribute(this.button, 'aria-busy', 'true');

    this.spinnerRef = this.viewContainerRef.createComponent(MatProgressSpinner);
    this.spinnerRef.setInput('mode', 'indeterminate');
    this.spinnerRef.setInput('diameter', diameter);

    const spinner = this.spinnerRef.location.nativeElement as HTMLElement;
    this.renderer.setStyle(spinner, 'display', 'inline-block');
    this.renderer.setStyle(spinner, 'flex-shrink', '0');
    this.renderer.setStyle(spinner, 'margin-inline-end', '0.5rem');
    this.renderer.appendChild(this.button, spinner);  }

  private hideSpinner(): void {
    if (!this.spinnerRef) {
      return;
    }

    this.spinnerRef.destroy();
    this.spinnerRef = null;
    this.renderer.setProperty(this.button, 'disabled', this.disabledBeforeLoading);
    this.renderer.removeAttribute(this.button, 'aria-busy');
  }
}
