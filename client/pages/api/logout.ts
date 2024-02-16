// Next.js API route support: https://nextjs.org/docs/api-routes/introduction
import type { NextApiRequest, NextApiResponse } from 'next'
import verifyJWT from '@/components/login-flow/verifyCookies'
import cookie from "cookie";



type Data = {
  message: string,
}

export default function handler(
  req: NextApiRequest,
  res: NextApiResponse<Data>
) {
    verifyJWT(req.cookies.token, (err,decoded)=>{
      res.setHeader(
        "Set-Cookie",
        cookie.serialize('token', "", {
          httpOnly: true,
          path: "/",
          maxAge: -60,

        })
      );
      res.status(200).json({message: "logged out successfully"})
    })
    
}
