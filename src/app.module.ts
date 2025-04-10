import { Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import { S3Module } from './s3/s3.module';
import { validationSchema } from './config/configuration';

@Module({
  imports: [
    ConfigModule.forRoot({
      validationSchema,
    }),
    S3Module,
  ],
})
export class AppModule {}
