import { Component, OnInit, signal, computed, effect } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Product } from '@productDomain/models/product.model';
import { GetProductsUseCase } from '@productDomain/useCases/getProducts.useCase';
import { DeleteProductsUseCase } from '@productDomain/useCases/deleteProducts.useCase';
import { ProductFormComponent } from '@productPresentation/product-form/product-form';

type ProductsState = {
  products: Product[];
  loading: boolean;
};

@Component({
  standalone: true,
  selector: 'app-products',
  imports: [CommonModule, ProductFormComponent],
  templateUrl: './products.html',
})
export default class ProductsComponent implements OnInit {
  private state = signal<ProductsState>({
    products: [],
    loading: false,
  });
  

  readonly products = computed(() => this.state().products);
  readonly loading = computed(() => this.state().loading);

  readonly isModalOpen = signal(false);

  constructor(
    private getProductsUseCase: GetProductsUseCase,
    private deleteProductsUseCase: DeleteProductsUseCase
  ) {}

  ngOnInit(): void {
    this.loadProducts();
  }

  loadProducts(): void {
    this.state.update((s) => ({ ...s, loading: true }));

    this.getProductsUseCase.execute().subscribe({
      next: (products) => {
        this.state.set({
          products,
          loading: false,
        });
      },
      error: () => {
        this.state.update((s) => ({ ...s, loading: false }));
      },
    });
  }

  delete(id: string): void {
    this.deleteProductsUseCase.execute(id).subscribe({
      next: () => this.loadProducts(),
    });
  }

  openModal(): void {
    this.isModalOpen.set(true);
  }

  closeModal(): void {
    this.isModalOpen.set(false);
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
