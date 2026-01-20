import { Body, Controller, Get, Post, Inject, Delete, Param, UseInterceptors, UploadedFile } from '@nestjs/common';
import { ClientProxy } from '@nestjs/microservices';
import { CreateProductDto } from './dto/create-product.dto';
import { lastValueFrom } from 'rxjs/internal/lastValueFrom';
import { FileInterceptor } from '@nestjs/platform-express/multer/interceptors/file.interceptor';
import { StorageService } from './storage/storage.service';

@Controller('api/products')
export class AppController {
  constructor(
    @Inject('PRODUCTS_SERVICE')
    private readonly productsClient: ClientProxy,
     private readonly storageService: StorageService,
  ) { }

  @Get()
  async getProducts() {
    return lastValueFrom(
      this.productsClient.send({ cmd: 'get-products' }, {})
    );
  }

  @Post()
@UseInterceptors(FileInterceptor('image'))
async create(
  @UploadedFile() file: Express.Multer.File,
  @Body() dto: CreateProductDto, // Aquí ya vendrán como number gracias al Pipe
) {
  let imageUrl: string | undefined;

  if (file) {
    imageUrl = await this.storageService.uploadProductImage(file);
  }

  return lastValueFrom(
    this.productsClient.send(
      { cmd: 'products.create' },
      {
        ...dto,
        imageUrl, // imageUrl reemplaza al opcional del DTO
      },
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
