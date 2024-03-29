// Next.js API route support: https://nextjs.org/docs/api-routes/introduction
import type { NextApiRequest, NextApiResponse } from 'next'
import verifyJWT from '@/components/login-flow/verifyCookies'
type Data = {
  message: string,
}

export default function handler(
  req: NextApiRequest,
  res: NextApiResponse<Data>
) {
    verifyJWT(req.cookies.token, (err,decoded)=>{
      console.log(err);
      if (err){
        res.status(401).json({message: "FORBIDDEN BITCH"})
      }
      res.status(200).json({message: "whats good gang"})
    })
    
}
