import {
  booleanAttribute,
  ComponentRef,
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

  readonly diameter = input(20, {
    alias: 'appLoadingButtonDiameter',
    transform: numberAttribute,
  });

  readonly showContent = input(true, {
    alias: 'appLoadingButtonShowContent',
    transform: booleanAttribute,
  });

  private readonly button = inject(ElementRef<HTMLButtonElement>).nativeElement;
  private readonly renderer = inject(Renderer2);
  private readonly view = inject(ViewContainerRef);

  private spinner: ComponentRef<MatProgressSpinner> | null = null;
  private contentWrapper: HTMLElement | null = null;
  private wasDisabled = false;

  constructor() {
    effect(() => {
      if (this.loading()) {
        this.startLoading();
      } else {
        this.stopLoading();
      }
    });
  }

  private startLoading(): void {
    if (!this.spinner) {
      this.wasDisabled = this.button.disabled;

      this.renderer.setProperty(this.button, 'disabled', true);
      this.renderer.setAttribute(this.button, 'aria-busy', 'true');

      this.spinner = this.view.createComponent(MatProgressSpinner);
      this.spinner.setInput('mode', 'indeterminate');

      const element = this.spinner.location.nativeElement;
      this.renderer.appendChild(this.button, element);

      this.renderer.setStyle(element, 'display', 'inline-block');
      this.renderer.setStyle(element, 'flex-shrink', '0');
      this.renderer.addClass(element, 'app-loading-button-spinner');
    }

    this.spinner.setInput('diameter', this.diameter());

    const spinnerElement = this.spinner.location.nativeElement;

    this.renderer.setStyle(spinnerElement, 'margin-inline-end', this.showContent() ? '8px' : '0');

    if (this.showContent()) {
      this.restoreContent();
    } else {
      this.hideContent();
    }
  }

  private stopLoading(): void {
    if (!this.spinner) return;

    this.restoreContent();
    this.spinner.destroy();
    this.spinner = null;

    this.renderer.setProperty(this.button, 'disabled', this.wasDisabled);
    this.renderer.removeAttribute(this.button, 'aria-busy');
  }

  private hideContent(): void {
    if (this.contentWrapper || !this.spinner) return;

    const spinnerElement = this.spinner.location.nativeElement;
    const wrapper = this.renderer.createElement('span') as HTMLElement;

    this.renderer.setStyle(wrapper, 'display', 'none');
    this.renderer.insertBefore(this.button, wrapper, spinnerElement);

    for (const node of Array.from(this.button.childNodes)) {
      if (node !== wrapper && node !== spinnerElement) {
        this.renderer.appendChild(wrapper, node);
      }
    }

    this.contentWrapper = wrapper;
  }

  private restoreContent(): void {
    if (!this.contentWrapper) return;

    const spinnerElement = this.spinner?.location.nativeElement ?? null;

    while (this.contentWrapper.firstChild) {
      this.renderer.insertBefore(this.button, this.contentWrapper.firstChild, spinnerElement);
    }

    this.renderer.removeChild(this.button, this.contentWrapper);
    this.contentWrapper = null;
  }
}
