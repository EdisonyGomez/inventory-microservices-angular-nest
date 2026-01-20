import { Injectable } from "@angular/core";
import { Product } from "@productDomain/models/product.model";
import { ProductRepository } from "@productDomain/repositories/product.repository";
import { Observable } from "rxjs";

@Injectable({
    providedIn: 'root'  
})

export class InsertProductsUseCase {
    constructor(private productRepository: ProductRepository) {}

    execute(formData: FormData): Observable<Product> {
        return this.productRepository.create(formData);
    }

}