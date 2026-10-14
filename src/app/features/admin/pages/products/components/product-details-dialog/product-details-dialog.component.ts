import { ChangeDetectionStrategy, Component, inject } from '@angular/core';
import { MatButtonModule } from '@angular/material/button';
import { MAT_DIALOG_DATA, MatDialogModule, MatDialogRef } from '@angular/material/dialog';

import { Product } from '../../models/product.model';

@Component({
  selector: 'app-product-details-dialog',
  imports: [MatButtonModule, MatDialogModule],
  templateUrl: './product-details-dialog.component.html',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class ProductDetailsDialogComponent {
  protected readonly product = inject<Product>(MAT_DIALOG_DATA);
  protected readonly dialogRef = inject(MatDialogRef<ProductDetailsDialogComponent>);
}
