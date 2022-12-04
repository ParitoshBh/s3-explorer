import { S3Client } from "@aws-sdk/client-s3";
import { getArgs } from './args';

let s3Client: S3Client;

export const initializeS3 = () => {
  const args = getArgs();

  s3Client = new S3Client({
    region: args.region,
    credentials: {
      accessKeyId: args.accessKeyId,
      secretAccessKey: args.secretAccessKey,
    },
    endpoint: args.endpoint,
    forcePathStyle: true
  });
};

export const s3ClientObject = (): S3Client => {
  return s3Client;
}