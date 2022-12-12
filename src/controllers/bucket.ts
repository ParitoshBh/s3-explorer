import { Request, Response } from "express";
import { ListBucketsCommand } from "@aws-sdk/client-s3";
import { s3ClientObject } from '../utils/s3';
import { ViewError } from '../interfaces/viewError';

export const bucketGet = async (req: Request, res: Response) => {
  const viewError: ViewError = {
    message: 'No buckets found',
    context: '',
  };
  const buckets = await s3ClientObject().send(
    new ListBucketsCommand({})
  );

  res.render('index', {
    buckets: buckets.Buckets, 
    viewError
  });
};