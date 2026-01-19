import { Body, Controller, Get, Post, Inject, Delete, Param } from '@nestjs/common';
import { ClientProxy } from '@nestjs/microservices';
import { CreateProductDto } from './dto/create-product.dto';
import { lastValueFrom } from 'rxjs/internal/lastValueFrom';

@Controller('api/products')
export class AppController {
  constructor(
    @Inject('PRODUCTS_SERVICE')
    private readonly productsClient: ClientProxy,
  ) { }

  @Get()
  async getProducts() {
    return lastValueFrom(
      this.productsClient.send({ cmd: 'get-products' }, {})
    );
  }

  @Post()
  async create(@Body() dto: CreateProductDto) {
    return lastValueFrom(
      this.productsClient.send(
        { cmd: 'products.create' },
        dto,
      ),
    );
  }

  @Delete(':id')
  async delete(@Param('id') id: string) {
    return lastValueFrom(
      this.productsClient.send({ cmd: 'delete-product' }, { id })
    );
  }


}
