import express from 'express';
import { initializeS3 } from './utils/s3';
// Controllers (route handlers)
import { bucketGet } from "./controllers/bucket";
import { objectGet } from "./controllers/object";
import { parseArgs, getArgs } from "./utils/args";

const app = express();

app.use(express.static('assets'))
app.set('view engine', 'ejs');

// Parse arguments
parseArgs();
// Initialize S3 connection
initializeS3();

app.get('/', bucketGet);
app.get('/bucket/:bucketName', objectGet);

app.listen(getArgs().port, () => {
  console.log(`Listening on port ${getArgs().port}`)
});