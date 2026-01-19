import { Component, EventEmitter, Output } from '@angular/core';
import {
  FormControl,
  FormGroup,
  Validators,
  ReactiveFormsModule,
} from '@angular/forms';
import { InsertProductsUseCase } from '@productDomain/useCases/insertProducts.useCase';
import { Product } from '@productDomain/models/product.model';

@Component({
  standalone: true,
  selector: 'app-product-form',
  imports: [ReactiveFormsModule],
  templateUrl: './product-form.html',
})
export class ProductFormComponent {
  @Output() created = new EventEmitter<void>();

  form = new FormGroup({
    name: new FormControl('', Validators.required),
    price: new FormControl(0, [Validators.required, Validators.min(1)]),
    stock: new FormControl(0, [Validators.required, Validators.min(0)]),
  });

  constructor(private insertProductsUseCase: InsertProductsUseCase) {}

  submit(): void {
    if (this.form.invalid) return;

    const product: Product = {
      name: this.form.value.name!,
      price: this.form.value.price!,
      stock: this.form.value.stock!,
    };

    this.insertProductsUseCase.execute(product).subscribe({
      next: () => {
        this.form.reset({ price: 0, stock: 0 });
        this.created.emit();
      },
    });
  }
}
