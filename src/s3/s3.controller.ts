import {
  Body,
  Controller,
  Delete,
  Get,
  HttpCode,
  Param,
  Render,
} from '@nestjs/common';
import { S3Service } from './s3.service';

@Controller()
export class S3Controller {
  constructor(private readonly s3Service: S3Service) {}

  @Get()
  @Render('index')
  async root() {
    const buckets = await this.s3Service.listBuckets();
    return {
      buckets: buckets.Buckets,
      bucketCount: buckets.Buckets?.length ?? 0,
      errorMessage: 'No buckets found',
      errorContext: undefined,
    };
  }

  @Delete('buckets/:bucket/objects')
  @HttpCode(204)
  async deleteObjects(
    @Param('bucket') bucket: string,
    @Body() body: { keys: Array<string> },
  ) {
    await this.s3Service.deleteObjects(bucket, body.keys);
    return;
  }

  @Get('bucket/:bucketName')
  @Render('objects')
  async listBucketObjects(@Param('bucketName') bucketName: string) {
    let bucketObjects = {};
    let objectCount = 0;
    const errorObject = {
      errorMessage: '',
      errorContext: '',
    };

    try {
      const objects = await this.s3Service.listBucketObjects(bucketName);
      bucketObjects = objects.Contents ?? {};
      objectCount = objects.Contents?.length ?? 0;
    } catch (error) {
      errorObject.errorContext = JSON.stringify(error, null, 2);
    }

    return {
      bucketName: bucketName,
      objects: bucketObjects,
      objectCount: objectCount,
      ...errorObject,
    };
  }
}
