// Next.js API route support: https://nextjs.org/docs/api-routes/introduction
import type { NextApiRequest, NextApiResponse } from 'next'
import { generateUploadURL } from '@/components/s3'

type Data = {
  url: string
}

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse<Data>
) {
    const link = await generateUploadURL();
  res.status(200).json({ url: link })
}
