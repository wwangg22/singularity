// import dotenv from 'dotenv'
// import aws from 'aws-sdk'
// import crypto from 'crypto'
// import { promisify } from 'util'

// const randomBytes = promisify(crypto.randomBytes)

// dotenv.config()

// const region = "us-east-1"
// const accessKeyId = ""
// const secretAccessKey = ""
// const bucketName = "mytesting132"

// const s3 = new aws.S3({
//     region,
//     accessKeyId,
//     secretAccessKey,
//     signatureVersion: 'v4',
// })

// export async function generateUploadURL() {
//     const rawBytes = await randomBytes(16);
//     const imageName = rawBytes.toString('hex')

//     const params = ({
//         Bucket: bucketName,
//         Key: imageName,
//         Expires: 60,
//     })

//     const generateUploadURL = await s3.getSignedUrlPromise('putObject', params)
//     return generateUploadURL
// }


