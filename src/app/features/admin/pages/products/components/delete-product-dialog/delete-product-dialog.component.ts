import { ChangeDetectionStrategy, Component, inject } from '@angular/core';
import { MatButtonModule } from '@angular/material/button';
import { MAT_DIALOG_DATA, MatDialogModule, MatDialogRef } from '@angular/material/dialog';

import { Product } from '../../models/product.model';

@Component({
  selector: 'app-delete-product-dialog',
  imports: [MatButtonModule, MatDialogModule],
  templateUrl: './delete-product-dialog.component.html',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class DeleteProductDialogComponent {
  protected readonly product = inject<Product>(MAT_DIALOG_DATA);
  protected readonly dialogRef = inject(MatDialogRef<DeleteProductDialogComponent, boolean>);
}
