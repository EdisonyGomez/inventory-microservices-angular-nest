import { Injectable } from '@nestjs/common';
import { CreateProductDto } from './dto/create-product.dto';

@Injectable()
export class ProductsService {
  private products = [
    { id: 1, name: 'Producto demo', price: 100, stock: 10 },
  ];

  findAll() {
    return this.products;
  }

  create(dto: CreateProductDto) {
  const product = {
    id: Date.now(),
    ...dto,
  };

  this.products.push(product);
  return product;
}

}
