import { HttpClient } from '@angular/common/http';
import { inject, Injectable } from '@angular/core';
import { Observable } from 'rxjs';

import { API_BASE_URL } from '../config/api-base-url.token';
import { LoginRequestDto, LoginResponseDto } from './dto/login.dto';
import { AuthSession } from './models/auth-session.model';
import { LoginCredentials } from './models/login-credentials.model';

@Injectable({ providedIn: 'root' })
export class AuthService {
  private readonly http = inject(HttpClient);
  private readonly apiBaseUrl = inject(API_BASE_URL);

  login(credentials: LoginCredentials): Observable<AuthSession> {
    const request: LoginRequestDto = {
      username: credentials.username,
      password: credentials.password,
    };

    return this.http
      .post<LoginResponseDto>(`${this.apiBaseUrl}/auth/login`, request)
  }

  saveSession(session: AuthSession): void {
    localStorage.setItem('auth_token', session.token);
  }
}
