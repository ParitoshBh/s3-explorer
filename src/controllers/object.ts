import { Request, Response } from "express";
import { ListObjectsCommand } from "@aws-sdk/client-s3";
import { s3ClientObject } from '../utils/s3';

export const objectGet = async (req: Request, res: Response) => {
    const bucketName = req.params.bucketName;
    let errorMessage = '';
    let bucketObjects = {};

    try {
        const s3Response = await s3ClientObject().send(
            new ListObjectsCommand({
                Bucket: bucketName
            })
        );
        bucketObjects = s3Response.Contents ?? {};
    } catch (error) {
        errorMessage = JSON.stringify(error, null, 2);
    }

    res.render('objects', { objects: bucketObjects, bucketName: bucketName, errorMessage: errorMessage });
};