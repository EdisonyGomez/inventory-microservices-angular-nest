import { Injectable } from "@angular/core";
import { productApi } from "@productData/product.api";
import { Product } from "@productDomain/models/product.model";
import { ProductRepository } from "@productDomain/repositories/product.repository";
import { Observable } from "rxjs";

@Injectable({
    providedIn: 'root'
})

export class ProductRepositoryImpl extends ProductRepository {

    constructor(private productApi: productApi) {
        super();
    }

 override getAll(): Observable<Product[]> {
        return this.productApi.getAll();
    }

    override create(product: Product): Observable<Product> {    
        return this.productApi.create(product);
    }

    override delete(id: string): Observable<Product> {
        return this.productApi.delete(id);
    }   

}