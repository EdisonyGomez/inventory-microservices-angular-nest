import { Module } from '@nestjs/common';
import { ClientsModule, Transport } from '@nestjs/microservices';
import { ProductsController } from './products.controller';
import { PrismaModule } from 'prisma/prisma.module';
import { ProductsService } from './products.service';
import { StorageService } from './storage/storage.service';

@Module({
  imports: [
    ClientsModule.register([
      {
        name: 'PRODUCTS_MS',
        transport: Transport.TCP,
        options: {
          host: '127.0.0.1',
          port: 8877,
        },
      },
    ]),
  PrismaModule],
  providers: [ProductsService,StorageService],
  exports: [ProductsService],
  controllers: [ProductsController],
})
export class ProductsModule {}
