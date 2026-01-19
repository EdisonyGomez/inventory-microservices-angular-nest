import { HttpClient } from "@angular/common/http";
import { Injectable } from "@angular/core";
import { Product } from "@productDomain/models/product.model";
import { Observable } from "rxjs";

import { environment } from "@environments/environment"; 

@Injectable({
    providedIn: 'root'
})
export class productApi {
    constructor(private readonly http: HttpClient) { }



    getAll(): Observable<Product[]> {
    return this.http.get<Product[]>(`${environment.apiUrl}products`);
  }

  create(product: Omit<Product, 'id' | 'createdAt'>): Observable<Product> {
    return this.http.post<Product>(environment.apiUrl, product);
  }

  delete(id: string): Observable<Product> {
    return this.http.delete<Product>(`${environment.apiUrl}${id}`);
  }

}