import {
  DeleteObjectCommand,
  DeleteObjectCommandOutput,
  ListBucketsCommand,
  ListBucketsCommandOutput,
  ListObjectsCommand,
  ListObjectsCommandOutput,
  S3Client,
} from '@aws-sdk/client-s3';
import { Injectable } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';

@Injectable()
export class S3Service {
  private s3Client: S3Client;

  constructor(configService: ConfigService) {
    this.s3Client = new S3Client({
      endpoint: configService.get<string>('S3_ENDPOINT'),
      region: configService.get<string>('S3_REGION'),
      credentials: {
        accessKeyId: configService.get<string>('S3_ACCESS_KEY_ID') ?? '',
        secretAccessKey:
          configService.get<string>('S3_SECRET_ACCESS_KEY') ?? '',
      },
      forcePathStyle: true,
    });
  }

  async listBuckets(): Promise<ListBucketsCommandOutput> {
    return this.s3Client.send(new ListBucketsCommand({}));
  }

  async deleteObjects(
    bucket: string,
    keys: Array<string>,
  ): Promise<DeleteObjectCommandOutput[]> {
    const promises = keys.map((key) => this.deleteObject(bucket, key));
    return await Promise.all(promises);
  }

  async deleteObject(
    bucket: string,
    key: string,
  ): Promise<DeleteObjectCommandOutput> {
    return this.s3Client.send(
      new DeleteObjectCommand({
        Bucket: bucket,
        Key: key,
      }),
    );
  }

  async listBucketObjects(bucket: string): Promise<ListObjectsCommandOutput> {
    return this.s3Client.send(
      new ListObjectsCommand({
        Bucket: bucket,
      }),
    );
  }
}
