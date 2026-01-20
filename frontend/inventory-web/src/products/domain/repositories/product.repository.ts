import { Injectable } from "@angular/core";
import { Product } from "@productDomain/models/product.model";
import { Observable } from "rxjs";

@Injectable({
    providedIn: 'root'  
})

export abstract class ProductRepository {
    abstract getAll(): Observable<Product[]>;
    abstract create(formData: FormData): Observable<Product>;
    abstract delete(id: string): Observable<Product>;
}