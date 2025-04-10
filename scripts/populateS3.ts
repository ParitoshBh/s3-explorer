import {
  CreateBucketCommand,
  PutObjectCommand,
  S3Client,
} from '@aws-sdk/client-s3';
import { faker } from '@faker-js/faker';

// Initialize S3 connection
const s3Client = new S3Client({
  region: 'us-east-1',
  credentials: {
    accessKeyId: 'testKey',
    secretAccessKey: 'testSecret',
  },
  endpoint: 'http://s3:4566',
  forcePathStyle: true,
});

async function createFakeBuckets(s3Client: S3Client) {
  const bucketCount = faker.number.int({
    min: 1,
    max: 10,
  });
  for (let i = 0; i < bucketCount; i++) {
    const bucketName = faker.lorem.slug(3);
    const createBucketRes = await s3Client.send(
      new CreateBucketCommand({
        Bucket: bucketName,
      }),
    );
    console.log(JSON.stringify(createBucketRes));
    const createObjectRes = await s3Client.send(
      new PutObjectCommand({
        Bucket: bucketName,
        Key: faker.lorem.slug(4),
        Body: faker.lorem.sentence(15),
        ContentType: 'application/text',
      }),
    );
    console.log(JSON.stringify(createObjectRes));
  }
}

createFakeBuckets(s3Client).catch((error) => {
  console.error(error);
});
