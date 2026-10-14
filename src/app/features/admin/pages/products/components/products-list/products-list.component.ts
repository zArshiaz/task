import {
  ChangeDetectionStrategy,
  Component,
  computed,
  DestroyRef,
  inject,
  input,
  output,
  signal,
} from '@angular/core';
import { takeUntilDestroyed } from '@angular/core/rxjs-interop';
import { FormControl, FormGroup, ReactiveFormsModule } from '@angular/forms';
import { MatButtonModule } from '@angular/material/button';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatIconModule } from '@angular/material/icon';
import { MatInputModule } from '@angular/material/input';
import { MatPaginatorModule, PageEvent } from '@angular/material/paginator';
import { MatSelectModule } from '@angular/material/select';

import { Product } from '../../models/product.model';
import { ProductCardComponent } from '../product-card/product-card.component';

type ProductSortOption =
  'id-desc' | 'id-asc' | 'title-asc' | 'title-desc' | 'price-asc' | 'price-desc';

type ProductComparator = (first: Product, second: Product) => number;

const PRODUCT_SORTERS: Readonly<Record<ProductSortOption, ProductComparator>> = {
  'id-desc': (first, second) => second.id - first.id,
  'id-asc': (first, second) => first.id - second.id,
  'title-asc': (first, second) => first.title.localeCompare(second.title),
  'title-desc': (first, second) => second.title.localeCompare(first.title),
  'price-asc': (first, second) => first.price - second.price,
  'price-desc': (first, second) => second.price - first.price,
};

@Component({
  selector: 'app-products-list',
  imports: [
    MatButtonModule,
    MatFormFieldModule,
    MatIconModule,
    MatInputModule,
    MatPaginatorModule,
    MatSelectModule,
    ProductCardComponent,
    ReactiveFormsModule,
  ],
  templateUrl: './products-list.component.html',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class ProductsListComponent {
  readonly products = input.required<readonly Product[]>();
  readonly deletingProductId = input<number | null>(null);

  readonly editRequested = output<Product>();
  readonly detailsRequested = output<Product>();
  readonly deleteRequested = output<Product>();

  protected readonly filterForm = new FormGroup({
    search: new FormControl('', { nonNullable: true }),
    category: new FormControl('', { nonNullable: true }),
    sort: new FormControl<ProductSortOption>('id-desc', { nonNullable: true }),
  });
  protected readonly categories = computed(() =>
    [...new Set(this.products().map(({ category }) => category))].sort((first, second) =>
      first.localeCompare(second),
    ),
  );
  protected readonly pageSize = signal(10);
  protected readonly pageIndex = signal(0);

  private readonly filters = signal(this.filterForm.getRawValue());
  private readonly destroyRef = inject(DestroyRef);

  protected readonly filteredProducts = computed(() => {
    const { search, category, sort } = this.filters();
    const query = search.trim().toLocaleLowerCase();
    const matchingProducts = this.products().filter((product) => {
      const matchesQuery =
        !query ||
        product.title.toLocaleLowerCase().includes(query) ||
        product.category.toLocaleLowerCase().includes(query);
      const matchesCategory = !category || product.category === category;

      return matchesQuery && matchesCategory;
    });

    return matchingProducts.sort(PRODUCT_SORTERS[sort]);
  });
  protected readonly currentPageIndex = computed(() => {
    const lastPageIndex = Math.max(
      0,
      Math.ceil(this.filteredProducts().length / this.pageSize()) - 1,
    );
    return Math.min(this.pageIndex(), lastPageIndex);
  });
  protected readonly visibleProducts = computed(() => {
    const start = this.currentPageIndex() * this.pageSize();
    return this.filteredProducts().slice(start, start + this.pageSize());
  });

  constructor() {
    this.filterForm.valueChanges.pipe(takeUntilDestroyed(this.destroyRef)).subscribe(() => {
      this.filters.set(this.filterForm.getRawValue());
      this.pageIndex.set(0);
    });
  }

  protected clearSearch(): void {
    this.filterForm.controls.search.setValue('');
  }

  protected changePage(event: PageEvent): void {
    this.pageIndex.set(event.pageIndex);
    this.pageSize.set(event.pageSize);
  }
}
