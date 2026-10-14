import { ChangeDetectionStrategy, Component, DestroyRef, inject, signal } from '@angular/core';
import { takeUntilDestroyed } from '@angular/core/rxjs-interop';
import { MatButtonModule } from '@angular/material/button';
import { MatDialog } from '@angular/material/dialog';
import { MatIconModule } from '@angular/material/icon';
import { MatProgressSpinnerModule } from '@angular/material/progress-spinner';
import { MatSnackBar, MatSnackBarModule } from '@angular/material/snack-bar';
import { filter, finalize, switchMap } from 'rxjs';

import { AlertComponent } from '../../../../shared/components/alert/alert.component';
import { PageHeaderComponent } from '../../../../shared/components/page-header/page-header.component';
import { DeleteProductDialogComponent } from './components/delete-product-dialog/delete-product-dialog.component';
import { ProductDetailsDialogComponent } from './components/product-details-dialog/product-details-dialog.component';
import { ProductFormComponent } from './components/product-form/product-form.component';
import { ProductsListComponent } from './components/products-list/products-list.component';
import { ProductsService } from './data-access/products.service';
import { Product } from './models/product.model';

@Component({
  selector: 'app-products',
  imports: [
    AlertComponent,
    MatButtonModule,
    MatIconModule,
    MatProgressSpinnerModule,
    MatSnackBarModule,
    PageHeaderComponent,
    ProductsListComponent,
  ],
  templateUrl: './products.component.html',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class ProductsComponent {
  private readonly destroyRef = inject(DestroyRef);
  private readonly dialog = inject(MatDialog);
  private readonly productsService = inject(ProductsService);
  private readonly snackBar = inject(MatSnackBar);

  protected readonly products = signal<readonly Product[]>([]);
  protected readonly isLoading = signal(true);
  protected readonly errorMessage = signal<string | null>(null);
  protected readonly deletingProductId = signal<number | null>(null);

  constructor() {
    this.loadProducts();
  }

  protected openCreateForm(): void {
    this.openProductForm(null);
  }

  protected openEditForm(product: Product): void {
    this.openProductForm(product);
  }

  protected openProductDetails(product: Product): void {
    this.dialog.open(ProductDetailsDialogComponent, {
      data: product,
      width: '36rem',
      maxWidth: 'calc(100vw - 2rem)',
    });
  }

  protected confirmDelete(product: Product): void {
    this.dialog
      .open(DeleteProductDialogComponent, {
        data: product,
        width: '24rem',
        maxWidth: 'calc(100vw - 2rem)',
      })
      .afterClosed()
      .pipe(
        filter((confirmed): confirmed is true => confirmed === true),
        switchMap(() => {
          this.deletingProductId.set(product.id);
          return this.productsService
            .delete(product.id)
            .pipe(finalize(() => this.deletingProductId.set(null)));
        }),
        takeUntilDestroyed(this.destroyRef),
      )
      .subscribe({
        next: () => {
          this.products.update((products) => products.filter((item) => item.id !== product.id));
          this.snackBar.open('محصول حذف شد.', 'بستن');
        },
        error: () => this.snackBar.open('حذف محصول انجام نشد. دوباره تلاش کنید.', 'بستن'),
      });
  }

  protected loadProducts(): void {
    this.isLoading.set(true);
    this.errorMessage.set(null);

    this.productsService
      .getAll()
      .pipe(
        finalize(() => this.isLoading.set(false)),
        takeUntilDestroyed(this.destroyRef),
      )
      .subscribe({
        next: (products) => this.products.set(products),
        error: () => this.errorMessage.set('دریافت فهرست محصولات انجام نشد. دوباره تلاش کنید.'),
      });
  }

  private openProductForm(product: Product | null): void {
    this.dialog
      .open(ProductFormComponent, {
        data: product,
        width: '42rem',
        maxWidth: 'calc(100vw - 2rem)',
      })
      .afterClosed()
      .pipe(
        filter((savedProduct): savedProduct is Product => savedProduct !== undefined),
        takeUntilDestroyed(this.destroyRef),
      )
      .subscribe((savedProduct) => {
        this.products.update((products) => {
          const existingIndex = products.findIndex((item) => item.id === savedProduct.id);

          if (existingIndex === -1) {
            return [savedProduct, ...products];
          }

          return products.map((item) => (item.id === savedProduct.id ? savedProduct : item));
        });
        this.snackBar.open(product ? 'تغییرات محصول ذخیره شد.' : 'محصول جدید افزوده شد.', 'بستن');
      });
  }
}
