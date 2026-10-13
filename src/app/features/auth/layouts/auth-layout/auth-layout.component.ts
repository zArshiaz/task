import { Component } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { MatIcon } from '@angular/material/icon';

@Component({
  selector: 'app-auth-layout',
  imports: [RouterOutlet, MatIcon],
  templateUrl: './auth-layout.component.html'
})
export class AuthLayoutComponent {
}
