import { Injectable } from "@angular/core";
import { Product } from "@productDomain/models/product.model";
import { ProductRepository } from "@productDomain/repositories/product.repository";
import { Observable } from "rxjs/internal/Observable";

@Injectable({
    providedIn: 'root'  
})
export class GetProductsUseCase {
    constructor(private productRepository: ProductRepository) {}

    execute(): Observable<Product[]> {
        return this.productRepository.getAll();
    }
}