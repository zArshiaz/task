import {
  ChangeDetectionStrategy,
  Component,
  computed,
  DestroyRef,
  effect,
  inject,
  input,
  output,
  signal,
  viewChild,
} from '@angular/core';
import { takeUntilDestroyed } from '@angular/core/rxjs-interop';
import { MatButtonModule } from '@angular/material/button';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatIconModule } from '@angular/material/icon';
import { MatInputModule } from '@angular/material/input';
import { MatPaginator, MatPaginatorModule } from '@angular/material/paginator';
import { MatSelectModule } from '@angular/material/select';
import { MatSort, MatSortModule, Sort } from '@angular/material/sort';
import { MatTableDataSource, MatTableModule } from '@angular/material/table';
import { FormControl, FormGroup, ReactiveFormsModule } from '@angular/forms';
import { startWith } from 'rxjs';

import { Product } from '../../models/product.model';
import { LoadingButtonDirective } from '../../../../../../shared/directives/loading-button/loading-button.directive';
import { ProductCardComponent } from '../product-card/product-card.component';

type ProductSortOption =
  'id-desc' | 'id-asc' | 'title-asc' | 'title-desc' | 'price-asc' | 'price-desc';

const PRODUCT_SORT_OPTIONS: Readonly<
  Record<ProductSortOption, { readonly active: keyof Product; readonly direction: 'asc' | 'desc' }>
> = {
  'id-desc': { active: 'id', direction: 'desc' },
  'id-asc': { active: 'id', direction: 'asc' },
  'title-asc': { active: 'title', direction: 'asc' },
  'title-desc': { active: 'title', direction: 'desc' },
  'price-asc': { active: 'price', direction: 'asc' },
  'price-desc': { active: 'price', direction: 'desc' },
};

const isProductSortOption = (value: unknown): value is ProductSortOption =>
  typeof value === 'string' && value in PRODUCT_SORT_OPTIONS;

@Component({
  selector: 'app-products-table',
  imports: [
    MatButtonModule,
    MatFormFieldModule,
    MatIconModule,
    MatInputModule,
    MatPaginatorModule,
    MatSelectModule,
    LoadingButtonDirective,
    MatSortModule,
    MatTableModule,
    ProductCardComponent,
    ReactiveFormsModule,
  ],
  templateUrl: './products-table.component.html',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class ProductsTableComponent {
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
    [...new Set(this.products().map(({ category }) => category))]
  );
  protected readonly dataSource = new MatTableDataSource<Product>();
  protected readonly visibleProducts = signal<readonly Product[]>([]);
  protected readonly displayedColumns: readonly string[] = [
    'id',
    'image',
    'title',
    'category',
    'price',
    'actions',
  ];

  private readonly paginator = viewChild(MatPaginator);
  private readonly sort = viewChild(MatSort);
  private readonly destroyRef = inject(DestroyRef);

  constructor() {
    this.dataSource.filterPredicate = (product, filter) => {
      const [query = '', category = ''] = filter.split('\u0000');
      const normalizedTitle = product.title.toLocaleLowerCase();
      const normalizedCategory = product.category.toLocaleLowerCase();
      const matchesQuery =
        !query || normalizedTitle.includes(query) || normalizedCategory.includes(query);
      const matchesCategory = !category || product.category === category;

      return matchesQuery && matchesCategory;
    };

    effect(() => {
      this.dataSource.data = [...this.products()];
    });

    effect(() => {
      this.dataSource.paginator = this.paginator();
      this.dataSource.sort = this.sort();
      const sort = this.sort();
      if (sort) {
        this.applySort(this.filterForm.controls.sort.value, sort);
      }
    });

    this.dataSource
      .connect()
      .pipe(takeUntilDestroyed(this.destroyRef))
      .subscribe((products) => this.visibleProducts.set(products));

    this.filterForm.valueChanges
      .pipe(startWith(this.filterForm.getRawValue()), takeUntilDestroyed(this.destroyRef))
      .subscribe(() => {
        const { search, category, sort } = this.filterForm.getRawValue();
        const query = search.trim().toLocaleLowerCase();
        this.dataSource.filter = `${query}\u0000${category}`;
        this.dataSource.paginator?.firstPage();

        const matSort = this.sort();
        if (matSort) {
          this.applySort(sort, matSort);
        }
      });
  }

  protected clearSearch(): void {
    this.filterForm.controls.search.setValue('');
  }

  protected syncSelectedSort(sort: Sort): void {
    const selectedSort = Object.entries(PRODUCT_SORT_OPTIONS).find(
      ([, option]) => option.active === sort.active && option.direction === sort.direction,
    )?.[0];

    if (isProductSortOption(selectedSort)) {
      this.filterForm.controls.sort.setValue(selectedSort, { emitEvent: false });
    }
  }

  private applySort(sortOption: ProductSortOption, matSort: MatSort): void {
    const selectedSort = PRODUCT_SORT_OPTIONS[sortOption];
    matSort.active = selectedSort.active;
    matSort.direction = selectedSort.direction;
    matSort.sortChange.emit(selectedSort);
  }
}
