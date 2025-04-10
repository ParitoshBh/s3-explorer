# @smblitz/s3explorer

GUI for browsing S3 buckets, to facilitate local development. Currently tested against [localstack](https://github.com/localstack/localstack) and [MinIO](https://github.com/minio/minio).

## Using Package

To run the package using `npx` run following command,

```sh
# export variable that'll be used by package
export S3_ENDPOINT=
export S3_ACCESS_KEY_ID=
export S3_SECRET_ACCESS_KEY=

# finally run the package directly using npx
npx @smblitz/s3explorer
```

### Supported Environment Variables

- S3_PORT (optional, default `3000`)
- S3_REGION (optional, default `us-east-1`)
- S3_ENDPOINT (required)
- S3_ACCESS_KEY_ID (required)
- S3_SECRET_ACCESS_KEY (required)

## Dev Setup

If you'd like to contribute to the package,

1. Clone this repository
1. If you have Visual Studio Code installed, open the cloned repository in it and it'll prompt you to open in container.
1. Once in container, run the package locally using following command in dev container,
   ```sh
    # export variable that'll be used by package
    export S3_ENDPOINT=http://s3:4566
    export S3_ACCESS_KEY_ID=1234
    export S3_SECRET_ACCESS_KEY=1234

    # start in watch mode
    npm run start:dev
   ```

If you'd like to populate Localstack S3 container (started when you open this repository in Visual Studio Code) with fake data then run following,
```js
npm run populateS3
```