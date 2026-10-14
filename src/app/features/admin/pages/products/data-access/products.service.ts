import { HttpClient } from '@angular/common/http';
import { inject, Injectable } from '@angular/core';
import { Observable, timeout } from 'rxjs';

import { API_BASE_URL } from '../../../../../core/config/api-base-url.token';
import { Product, ProductPayload } from '../models/product.model';

@Injectable({ providedIn: 'root' })
export class ProductsService {
  private readonly http = inject(HttpClient);
  private readonly apiBaseUrl = inject(API_BASE_URL);
  private readonly requestTimeoutMs = 10_000;

  getAll(): Observable<readonly Product[]> {
    return this.http
      .get<readonly Product[]>(`${this.apiBaseUrl}/products`)
      .pipe(timeout(this.requestTimeoutMs));
  }

  create(payload: ProductPayload): Observable<Product> {
    return this.http
      .post<Product>(`${this.apiBaseUrl}/products`, payload)
      .pipe(timeout(this.requestTimeoutMs));
  }

  update(id: number, payload: ProductPayload): Observable<Product> {
    return this.http
      .put<Product>(`${this.apiBaseUrl}/products/${id}`, payload)
      .pipe(timeout(this.requestTimeoutMs));
  }

  delete(id: number): Observable<void> {
    return this.http.delete<void>(`${this.apiBaseUrl}/products/${id}`).pipe(timeout(this.requestTimeoutMs));
  }
}
