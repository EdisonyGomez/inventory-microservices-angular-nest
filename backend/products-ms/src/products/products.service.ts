import { Injectable } from '@nestjs/common';
import { PrismaService } from 'prisma/prisma.service'; 
import { CreateProductDto } from './dto/create-product.dto';

@Injectable()
export class ProductsService {
  constructor(private readonly prisma: PrismaService) {}

  create(dto: CreateProductDto) {
    return this.prisma.invProduct.create({
      data: {
        name: dto.name,
        price: dto.price,
        stock: dto.stock,
      },
    });
  }

  async findAll() {
  return this.prisma.invProduct.findMany();
}

}
