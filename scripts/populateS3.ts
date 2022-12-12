import { CreateBucketCommand, PutObjectCommand, S3Client } from '@aws-sdk/client-s3';
import { initializeS3, s3ClientObject } from '../src/utils/s3';
import { faker } from '@faker-js/faker';

// Initialize S3 connection
initializeS3({
    region: 'us-east-1',
    credentials: {
        accessKeyId: 'testKey',
        secretAccessKey: 'testSecret',
    },
    endpoint: 'http://s3:4566',
    forcePathStyle: true
});
const s3Client = s3ClientObject();

createFakeBuckets(s3Client);

async function createFakeBuckets(s3Client: S3Client) {
    const bucketCount = faker.datatype.number({
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