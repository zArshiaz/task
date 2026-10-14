import { ChangeDetectionStrategy, Component, input, output } from '@angular/core';
import { MatButtonModule } from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';

import { LoadingButtonDirective } from '../../../../../../shared/directives/loading-button/loading-button.directive';
import { Product } from '../../models/product.model';

@Component({
  selector: 'app-product-card',
  imports: [MatButtonModule, MatIconModule, LoadingButtonDirective],
  templateUrl: './product-card.component.html',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class ProductCardComponent {
  readonly product = input.required<Product>();
  readonly deleting = input(false);

  readonly editRequested = output<Product>();
  readonly detailsRequested = output<Product>();
  readonly deleteRequested = output<Product>();
}
