import { Body, Controller, Get, Post, Inject } from '@nestjs/common';
import { ClientProxy } from '@nestjs/microservices';
import { CreateProductDto } from './dto/create-product.dto';

@Controller('api/products')
export class AppController {
  constructor(
    @Inject('PRODUCTS_SERVICE')
    private readonly productsClient: ClientProxy,
  ) { }

  @Get()
  findAll() {
    return this.productsClient.send('list_products', {});
  }

  @Post()
  create(@Body() dto: CreateProductDto) {
    return this.productsClient.send('create_product', dto);
  }

}
