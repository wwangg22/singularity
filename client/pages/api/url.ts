// Next.js API route support: https://nextjs.org/docs/api-routes/introduction
import type { NextApiRequest, NextApiResponse } from 'next';
import crypto from 'crypto';
import { Bucket } from "sst/node/bucket";
import { S3Client, PutObjectCommand} from "@aws-sdk/client-s3";
import { getSignedUrl } from '@aws-sdk/s3-request-presigner';
// import { generateUploadURL } from '@/components/s3'
import verifyJWT from '@/components/login-flow/verifyCookies'


type Data = {
  url: string
}
let URL:string = "testing";
export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse<Data>
) {
  await verifyJWT(req.cookies.token, async (err,decoded)=>{
    if (err){
      res.status(401).json({url: "get out"})
    }
    try{
      const command = new PutObjectCommand({
        ACL: "public-read",
        Key: crypto.randomUUID(),
        Bucket: Bucket.public.bucketName,
      });
      URL = await getSignedUrl(new S3Client({}), command);
    }
    catch(err){
      res.status(500).json({url: "an error occured"})
    }
    
    
    // const link = await generateUploadURL();
   res.status(200).json({ url: URL})
  })
}

