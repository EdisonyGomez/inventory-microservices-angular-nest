import { Injectable } from '@nestjs/common';
import {
  S3Client,
  PutObjectCommand,
} from '@aws-sdk/client-s3';

@Injectable()
export class StorageService {
  private s3 = new S3Client({
    region: process.env.SUPABASE_S3_REGION,
    endpoint: process.env.SUPABASE_S3_ENDPOINT,
    credentials: {
      accessKeyId: process.env.SUPABASE_S3_ACCESS_KEY!,
      secretAccessKey: process.env.SUPABASE_S3_SECRET_KEY!,
    },
    forcePathStyle: true,
  });

  async uploadProductImage(file: Express.Multer.File): Promise<string> {
    const fileName = `${crypto.randomUUID()}-${file.originalname}`;

    await this.s3.send(
      new PutObjectCommand({
        Bucket: process.env.SUPABASE_S3_BUCKET!,
        Key: fileName,
        Body: file.buffer,
        ContentType: file.mimetype,
      }),
    );

    return `${process.env.SUPABASE_S3_ENDPOINT}/${process.env.SUPABASE_S3_BUCKET}/${fileName}`;
  }
}
