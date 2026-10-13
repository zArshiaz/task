import { HttpErrorResponse } from '@angular/common/http';
import { Component, inject, signal, ViewChild } from '@angular/core';
import { FormControl, FormGroup, FormGroupDirective, ReactiveFormsModule, Validators } from '@angular/forms';
import { MatButtonModule } from '@angular/material/button';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatSnackBar, MatSnackBarModule } from '@angular/material/snack-bar';
import { finalize } from 'rxjs';

import { AuthService } from '../../../../core/auth/auth.service';
import { AlertComponent } from '../../../../shared/components/alert/alert.component';
import { FormControlErrorComponent } from '../../../../shared/components/form-control-error/form-control-error.component';
import { LoadingButtonDirective } from '../../../../shared/directives/loading-button/loading-button.directive';

@Component({
  selector: 'app-login',
  imports: [
    ReactiveFormsModule,
    MatButtonModule,
    MatFormFieldModule,
    MatInputModule,
    MatSnackBarModule,
    AlertComponent,
    FormControlErrorComponent,
    LoadingButtonDirective,
  ],
  templateUrl: './login.component.html',
})
export class LoginComponent {
  private readonly authService = inject(AuthService);
  private readonly snackBar = inject(MatSnackBar);

  @ViewChild(FormGroupDirective)
  private formDirective!: FormGroupDirective;

  protected readonly isSubmitting = signal(false);
  protected readonly errorMessage = signal<string | null>(null);
  protected readonly loginForm = new FormGroup({
    username: new FormControl('', { nonNullable: true, validators: [Validators.required] }),
    password: new FormControl('', { nonNullable: true, validators: [Validators.required] }),
  });

  protected submit(): void {
    if (this.loginForm.invalid || this.isSubmitting()) {
      this.loginForm.markAllAsTouched();
      return;
    }

    this.isSubmitting.set(true);
    this.errorMessage.set(null);

    this.authService
      .login(this.loginForm.getRawValue())
      .pipe(finalize(() => this.isSubmitting.set(false)))
      .subscribe({
        next: (session) => {
          this.authService.saveSession(session);
          this.snackBar.open('ورود با موفقیت انجام شد.', 'بستن');
          this.loginForm.reset();
          this.formDirective.resetForm();
        },
        error: (error: HttpErrorResponse) => {
          this.errorMessage.set(
            error.status === 401
              ? 'نام کاربری یا رمز عبور صحیح نیست.'
              : 'ارتباط با سرور برقرار نشد. دوباره تلاش کنید.',
          );
        },
      });
  }
}
