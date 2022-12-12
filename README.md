# @smblitz/s3explorer

GUI for browsing S3 buckets, to facilitate local development. Currently tested against [localstack](https://github.com/localstack/localstack), [MinIO](https://github.com/minio/minio), etc.

## Using Package

To run the package using `npx` run following command,

```js
npx @smblitz/s3explorer --endpoint <URL> --accessKeyId <ACCESS_KEY> --secretAccessKey <SECRET>
```

### Supported Arguments

- --port (optional, default 3000)
- --region (optional, default us-east-1)
- --endpoint (required)
- --accessKeyId (required)
- --secretAccessKey (required)

## Dev Setup

If you'd like to contribute to the package,

1. Clone this repository
1. If you have Visual Studio Code installed, open the cloned repository in it and it'll prompt you to open in container.
1. Once in container, run the package locally using following command in dev container,
   ```js
   npm run dev -- --endpoint http://s3:4566 --accessKeyId testKey --secretAccessKey testSecret
   ```

If you'd like to populate Localstack S3 container (started when you open this repository in Visual Studio Code) with fake data then run following,
```js
npm run populateS3
```