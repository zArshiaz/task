import { ChangeDetectionStrategy, Component, DestroyRef, inject, signal } from '@angular/core';
import { takeUntilDestroyed } from '@angular/core/rxjs-interop';
import { FormControl, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { MatButtonModule } from '@angular/material/button';
import { MAT_DIALOG_DATA, MatDialogModule, MatDialogRef } from '@angular/material/dialog';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatIconModule } from '@angular/material/icon';
import { MatInputModule } from '@angular/material/input';
import { finalize } from 'rxjs';

import { AlertComponent } from '../../../../../../shared/components/alert/alert.component';
import { Product, ProductPayload } from '../../models/product.model';
import { ProductsService } from '../../data-access/products.service';

@Component({
  selector: 'app-product-form',
  imports: [
    AlertComponent,
    MatButtonModule,
    MatDialogModule,
    MatFormFieldModule,
    MatIconModule,
    MatInputModule,
    ReactiveFormsModule,
  ],
  templateUrl: './product-form.component.html',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class ProductFormComponent {
  protected readonly dialogRef = inject(MatDialogRef<ProductFormComponent, Product>);
  private readonly destroyRef = inject(DestroyRef);
  private readonly productsService = inject(ProductsService);

  protected readonly product = inject<Product | null>(MAT_DIALOG_DATA);
  protected readonly isSubmitting = signal(false);
  protected readonly errorMessage = signal<string | null>(null);
  protected readonly form = new FormGroup({
    title: new FormControl(this.product?.title ?? '', {
      nonNullable: true,
      validators: [Validators.required, Validators.maxLength(200)],
    }),
    price: new FormControl(this.product?.price ?? 0, {
      nonNullable: true,
      validators: [Validators.required, Validators.min(0)],
    }),
    category: new FormControl(this.product?.category ?? '', {
      nonNullable: true,
      validators: [Validators.required, Validators.maxLength(100)],
    }),
    image: new FormControl(this.product?.image ?? '', {
      nonNullable: true,
      validators: [Validators.required, Validators.pattern(/^https?:\/\/.+/)],
    }),
    description: new FormControl(this.product?.description ?? '', {
      nonNullable: true,
      validators: [Validators.required, Validators.maxLength(1000)],
    }),
  });

  protected get isEditMode(): boolean {
    return this.product !== null;
  }

  protected submit(): void {
    if (this.form.invalid || this.isSubmitting()) {
      this.form.markAllAsTouched();
      return;
    }

    this.isSubmitting.set(true);
    this.errorMessage.set(null);
    const payload: ProductPayload = this.form.getRawValue();
    const request = this.product
      ? this.productsService.update(this.product.id, payload)
      : this.productsService.create(payload);

    request
      .pipe(
        finalize(() => this.isSubmitting.set(false)),
        takeUntilDestroyed(this.destroyRef),
      )
      .subscribe({
        next: (product) => this.dialogRef.close(product),
        error: () => this.errorMessage.set('ذخیره محصول انجام نشد. دوباره تلاش کنید.'),
      });
  }
}
