import { Controller } from '@nestjs/common';
import { MessagePattern, Payload } from '@nestjs/microservices';
import { ProductsService } from './products.service';
import { CreateProductDto } from './dto/create-product.dto';

@Controller()
export class ProductsController {
  constructor(private readonly productsService: ProductsService) { }

  @MessagePattern({ cmd: 'products.create' })
  create(@Payload() dto: CreateProductDto) {
    return this.productsService.create(dto);
  }

  @MessagePattern({ cmd: 'get-products' })
  findAll() {
    return this.productsService.findAll();
  }

  @MessagePattern({ cmd: 'delete-product' })
  delete(@Payload() data: { id: string }) {
    return this.productsService.delete(data.id);
  }

}
