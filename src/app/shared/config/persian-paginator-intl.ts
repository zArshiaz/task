import { Injectable } from '@angular/core';
import { MatPaginatorIntl } from '@angular/material/paginator';

@Injectable({ providedIn: 'root' })
export class PersianPaginatorIntl extends MatPaginatorIntl {
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
