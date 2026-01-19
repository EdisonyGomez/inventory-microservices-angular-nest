import { Controller } from '@nestjs/common';
import { MessagePattern } from '@nestjs/microservices';

@Controller()
export class AppController {
  @MessagePattern('list_products')
  findAll() {
    // return [
    //   {
    //     id: 1,
    //     name: 'Producto demo',
    //     price: 100,
    //     stock: 10,
    //   },
    // ];
  }
}
