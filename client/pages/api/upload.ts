// Next.js API route support: https://nextjs.org/docs/api-routes/introduction
import type { NextApiRequest, NextApiResponse } from 'next'

type Data = {
  title: string,
  body: string,
}

export default function handler(
  req: NextApiRequest,
  res: NextApiResponse<Data>
) {
    if (req.method === 'POST') {
        // Process a POST request
        console.log(req.body)
        res.status(200).json({ title: req.body.username, body: req.body.password })
    } else {
        // Handle any other HTTP method
        res.status(200).json({ title: 'John Doe', body: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit. Donec sed odio dui. Nullam id dolor id nibh ultricies vehicula ut id elit.' })
    }
}
