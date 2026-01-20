import { Component, OnInit, signal, computed, effect } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Product } from '@productDomain/models/product.model';
import { GetProductsUseCase } from '@productDomain/useCases/getProducts.useCase';
import { DeleteProductsUseCase } from '@productDomain/useCases/deleteProducts.useCase';
import { ProductFormComponent } from '@productPresentation/product-form/product-form';
import { NotificationService } from 'src/app/core/services/notification.service';

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
    private deleteProductsUseCase: DeleteProductsUseCase,
    private notification: NotificationService // Inyectar servicio
  ) { }

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

async delete(product: Product): Promise<void> {
    if (!product.id) return;

    // 1. Pedir confirmación al usuario
    const confirmed = await this.notification.confirmDelete(product.name);
    
    if (confirmed) {
      this.deleteProductsUseCase.execute(product.id).subscribe({
        next: () => {
          this.loadProducts();
          this.notification.success('Producto eliminado correctamente');
        },
        error: () => {
          this.notification.error('No se pudo eliminar el producto');
        }
      });
    }
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
    if (stock === 0) return 'Agotado';
    if (stock <= 5) return 'Stock Crítico';
    return 'En Stock';
  }

  getStockBadgeClass(stock: number): string {
    if (stock === 0) return 'bg-red-50 text-red-600 border border-red-100';
    if (stock <= 5) return 'bg-orange-50 text-orange-600 border border-orange-100';
    return 'bg-emerald-50 text-emerald-600 border border-emerald-100';
  }

  // En ProductsComponent class
  handleImageError(event: any): void {
    // Reemplaza la imagen rota por una de respaldo
    event.target.src = 'assets/images/placeholder-product.png'; // Asegúrate de tener esta ruta
    // O simplemente puedes ocultar la imagen fallida:
    // event.target.style.display = 'none';
  }
}
