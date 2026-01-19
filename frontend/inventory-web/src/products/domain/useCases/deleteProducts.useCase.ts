import { Injectable } from "@angular/core";
import { Product } from "@productDomain/models/product.model";
import { ProductRepository } from "@productDomain/repositories/product.repository";
import { Observable } from "rxjs";

@Injectable({
    providedIn: 'root'
})

export class DeleteProductsUseCase {
    constructor(private productRepository: ProductRepository) { }
    execute(id: string): Observable<Product> {
        return this.productRepository.delete(id);
    }
}