import { Injectable, NotFoundException } from '@nestjs/common';
import { PrismaService } from 'prisma/prisma.service';
import { CreateProductDto } from './dto/create-product.dto';

@Injectable()
export class ProductsService {
  constructor(private readonly prisma: PrismaService) { }

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

  async delete(id: string) {
    const exists = await this.prisma.invProduct.findUnique({
      where: { id },
    });

    if (!exists) {
      throw new NotFoundException('Producto no encontrado');
    }

    return this.prisma.invProduct.delete({
      where: { id },
    });
  }

}
