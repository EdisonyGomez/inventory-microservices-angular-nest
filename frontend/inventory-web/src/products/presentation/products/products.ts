import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Product } from '@productDomain/models/product.model';
import { GetProductsUseCase } from '@productDomain/useCases/getProducts.useCase';
import { DeleteProductsUseCase } from '@productDomain/useCases/deleteProducts.useCase';
import { ProductFormComponent } from '@productPresentation/product-form/product-form';

@Component({
  standalone: true,
  selector: 'app-products',
  imports: [CommonModule, ProductFormComponent],
  templateUrl: './products.html',
})
export default class ProductsComponent implements OnInit {
  products: Product[] = [];
  loading = false;
  isModalOpen = false;

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

  openModal(): void {
    this.isModalOpen = true;
  }

  closeModal(): void {
    this.isModalOpen = false;
  }

  onProductCreated(): void {
    this.closeModal();
    this.loadProducts();
  }

  getStockLabel(stock: number): string {
    if (stock === 0) return 'OUT OF STOCK';
    if (stock <= 5) return 'LOW STOCK';
    return 'IN STOCK';
  }

  getStockBadgeClass(stock: number): string {
    if (stock === 0) return 'bg-red-100 text-red-600';
    if (stock <= 5) return 'bg-yellow-100 text-yellow-700';
    return 'bg-green-100 text-green-700';
  }
}
