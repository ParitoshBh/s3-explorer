import { Request, Response } from "express";
import { ListObjectsCommand } from "@aws-sdk/client-s3";
import { s3ClientObject } from '../utils/s3';
import { ViewError } from '../interfaces/viewError';

export const objectGet = async (req: Request, res: Response) => {
    const bucketName = req.params.bucketName;
    const viewError: ViewError = {
        message: 'No objects found',
        context: '',
    };
    let bucketObjects = {};

    try {
        const s3Response = await s3ClientObject().send(
            new ListObjectsCommand({
                Bucket: bucketName
            })
        );
        bucketObjects = s3Response.Contents ?? {};
    } catch (error) {
        viewError.context = JSON.stringify(error, null, 2);
    }

    res.render('objects', {
        objects: bucketObjects,
        bucketName,
        viewError,
    });
};