import { S3Client, S3ClientConfig } from "@aws-sdk/client-s3";
import { getArgs } from './args';

let s3Client: S3Client;

export const initializeS3 = (config?: S3ClientConfig) => {
  if (!config) {
    const args = getArgs();
    config = {
      region: args.region,
      credentials: {
        accessKeyId: args.accessKeyId,
        secretAccessKey: args.secretAccessKey,
      },
      endpoint: args.endpoint,
      forcePathStyle: true
    };
  }

  s3Client = new S3Client(config);
};

export const s3ClientObject = (): S3Client => {
  return s3Client;
}