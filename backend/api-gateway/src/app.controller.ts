import { Controller, Get, Inject } from '@nestjs/common';
import { ClientProxy } from '@nestjs/microservices';
import { Observable } from 'rxjs';

@Controller('api/products')
export class AppController {
  constructor(
    @Inject('PRODUCTS_SERVICE')
    private readonly productsClient: ClientProxy,
  ) {}

  @Get()
  findAll(): Observable<any> {
    return this.productsClient.send('list_products', {});
  }
}
