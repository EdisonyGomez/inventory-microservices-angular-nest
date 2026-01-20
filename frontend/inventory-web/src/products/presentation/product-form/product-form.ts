import { Component, EventEmitter, Output, signal } from '@angular/core';
import {
  FormControl,
  FormGroup,
  Validators,
  ReactiveFormsModule,
} from '@angular/forms';
import { CommonModule } from '@angular/common'; // Importante para el *ngIf
import { InsertProductsUseCase } from '@productDomain/useCases/insertProducts.useCase';
import { NotificationService } from 'src/app/core/services/notification.service';


@Component({
  standalone: true,
  selector: 'app-product-form',
  imports: [ReactiveFormsModule, CommonModule],
  templateUrl: './product-form.html',
})
export class ProductFormComponent {
  @Output() created = new EventEmitter<void>();
  @Output() cancelled = new EventEmitter<void>();

  imagePreview: string | null = null;
  isSubmitting = signal(false); // Signal para el loader
  form = new FormGroup({
    name: new FormControl('', { nonNullable: true, validators: [Validators.required] }),
    price: new FormControl(0, { nonNullable: true, validators: [Validators.required, Validators.min(1)] }),
    stock: new FormControl(0, { nonNullable: true, validators: [Validators.required, Validators.min(0)] }),
    image: new FormControl<File | null>(null),
  });

  constructor(private insertProductsUseCase: InsertProductsUseCase,
             private notification: NotificationService // Tu nuevo servicio
  ) { }

  onFileSelected(event: Event): void {
    const input = event.target as HTMLInputElement;
    if (input.files && input.files[0]) {
      const file = input.files[0];
      this.form.patchValue({ image: file });

      // Generar Preview
      const reader = new FileReader();
      reader.onload = () => {
        this.imagePreview = reader.result as string;
      };
      reader.readAsDataURL(file);
    }
  }

submit(): void {
    if (this.form.invalid || this.isSubmitting()) return;

    this.isSubmitting.set(true); // Bloquear botón e iniciar loader

    const formData = new FormData();
    formData.append('name', this.form.controls.name.value);
    formData.append('price', String(this.form.controls.price.value));
    formData.append('stock', String(this.form.controls.stock.value));

    if (this.form.value.image) {
      formData.append('image', this.form.value.image);
    }

    this.insertProductsUseCase.execute(formData).subscribe({
      next: () => {
        this.notification.success('Producto creado con éxito');
        this.form.reset();
        this.imagePreview = null;
        this.isSubmitting.set(false);
        this.created.emit();
      },
      error: (err) => {
        const errorMsg = err.error?.message || 'Error al conectar con el servidor';
        error: () => this.notification.error('Error al crear el producto')
        this.isSubmitting.set(false);
      }
    });
  }

  cancel(): void {
if (!this.isSubmitting()) this.cancelled.emit();  }
}