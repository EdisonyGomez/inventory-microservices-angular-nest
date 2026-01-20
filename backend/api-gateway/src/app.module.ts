import { Module } from '@nestjs/common';
import { ClientsModule, Transport } from '@nestjs/microservices';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { StorageService } from './storage/storage.service';
import { ConfigModule } from '@nestjs/config/dist/config.module';

@Module({
  imports: [
    ClientsModule.register([
      {
        name: 'PRODUCTS_SERVICE',
        transport: Transport.TCP,
        options: {
          host: process.env.PRODUCTS_MS_HOST || 'products-service',
          port: Number(process.env.PRODUCTS_MS_PORT) || 8877,
        },

      },
    ]),
    ConfigModule.forRoot({
      isGlobal: true,
    }),
  ],
  controllers: [AppController],
  providers: [AppService, StorageService],
})
export class AppModule { }
