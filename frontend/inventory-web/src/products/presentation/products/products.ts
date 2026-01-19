import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Product } from '@productDomain/models/product.model';
import { GetProductsUseCase } from '@productDomain/useCases/getProducts.useCase';
import { DeleteProductsUseCase } from '@productDomain/useCases/deleteProducts.useCase'; 

@Component({
  standalone: true,
  selector: 'app-products',
  imports: [CommonModule],
  templateUrl: './products.html',
  styleUrls: ['./products.css'],
})
export default class ProductsComponent implements OnInit {
  products: Product[] = [];
  loading = false;

  constructor(
    private getProductsUseCase: GetProductsUseCase,
    private deleteProductsUseCase: DeleteProductsUseCase
  ) {}

  ngOnInit(): void {
    this.loadProducts();
  }

  loadProducts(): void {
    this.loading = true;

    this.getProductsUseCase.execute().subscribe({
      next: (products) => {
        this.products = products;
        this.loading = false;
      },
      error: () => {
        this.loading = false;
      },
    });
  }

  delete(id: string): void {
    this.deleteProductsUseCase.execute(id).subscribe({
      next: () => this.loadProducts(),
    });
  }
}
