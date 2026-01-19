import { Body, Controller, Get, Post, Inject } from '@nestjs/common';
import { ClientProxy } from '@nestjs/microservices';

@Controller('api/products')
export class AppController {
  constructor(
    @Inject('PRODUCTS_SERVICE')
    private readonly productsClient: ClientProxy,
  ) {}

  @Get()
  findAll() {
    return this.productsClient.send('list_products', {});
  }

  @Post()
  create(@Body() body: any) {
    return this.productsClient.send('create_product', body);
  }
}
