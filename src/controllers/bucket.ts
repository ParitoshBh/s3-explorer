import { Request, Response } from "express";
import { ListBucketsCommand } from "@aws-sdk/client-s3";
import { s3ClientObject } from '../utils/s3';

export const bucketGet = async (req: Request, res: Response) => {
  const buckets = await s3ClientObject().send(
    new ListBucketsCommand({})
  );

  res.render('index', { buckets: buckets.Buckets });
};