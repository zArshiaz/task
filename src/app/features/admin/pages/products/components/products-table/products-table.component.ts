import {
  ChangeDetectionStrategy,
  Component,
  effect,
  input,
  output,
  viewChild,
} from '@angular/core';
import { MatButtonModule } from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';
import { MatPaginator, MatPaginatorIntl, MatPaginatorModule } from '@angular/material/paginator';
import { MatSort, MatSortModule } from '@angular/material/sort';
import { MatTableDataSource, MatTableModule } from '@angular/material/table';

import { Product } from '../../models/product.model';
import { LoadingButtonDirective } from '../../../../../../shared/directives/loading-button/loading-button.directive';

class PersianPaginatorIntl extends MatPaginatorIntl {
  override itemsPerPageLabel = 'تعداد در هر صفحه:';
  override nextPageLabel = 'صفحه بعد';
  override previousPageLabel = 'صفحه قبل';
  override firstPageLabel = 'صفحه اول';
  override lastPageLabel = 'صفحه آخر';

  override getRangeLabel = (page: number, pageSize: number, length: number): string => {
    if (length === 0 || pageSize === 0) {
      return `۰ از ${length.toLocaleString('fa-IR')}`;
    }

    const start = page * pageSize + 1;
    const end = Math.min(start + pageSize - 1, length);
    return `${start.toLocaleString('fa-IR')} تا ${end.toLocaleString('fa-IR')} از ${length.toLocaleString('fa-IR')}`;
  };
}

@Component({
  selector: 'app-products-table',
  imports: [
    MatButtonModule,
    MatIconModule,
    MatPaginatorModule,
    LoadingButtonDirective,
    MatSortModule,
    MatTableModule,
  ],
  providers: [{ provide: MatPaginatorIntl, useClass: PersianPaginatorIntl }],
  templateUrl: './products-table.component.html',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class ProductsTableComponent {
  readonly products = input.required<readonly Product[]>();
  readonly deletingProductId = input<number | null>(null);

  readonly editRequested = output<Product>();
  readonly deleteRequested = output<Product>();
  protected readonly dataSource = new MatTableDataSource<Product>();
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

  constructor() {
    effect(() => {
      this.dataSource.data = [...this.products()];
    });
    effect(() => {
      this.dataSource.paginator = this.paginator();
      this.dataSource.sort = this.sort();
    });
  }
}
