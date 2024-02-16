import bcrypt from "bcryptjs";
import type { NextApiRequest, NextApiResponse } from "next";
import { checkUserEmail } from "@/components/login-flow/appbased";
import jwt from "jsonwebtoken";
import "dotenv/config.js";
import cookie from "cookie";
// import {sign} from "@/components/login-flow/josemethods";
import { Config } from "sst/node/config";

type Data = {
  title: string;
  body?: string;
};
const expirationTime = 60 * 60 * 24;

const validateEmail = (email: String) => {
  return String(email)
    .toLowerCase()
    .match(
      /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|.(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/
    );
};

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse<Data>
) {
  if (req.method === "POST") {
    // Process a POST request
    try {
      console.log(req.body);
      const { email, password } = req.body;
      if (!email || !password || validateEmail(email) == null) {
        res.status(400).json({ title: "invalid fields" });
      }
      const ck = await checkUserEmail(email);
      console.log("ck", ck);
      if (ck == undefined) {
        console.log("done");
        res.status(401).json({ title: "invalid credentials" });
        console.log("he");
        return;
      }
      const valid = await bcrypt.compare(password, ck!.password);
      if (!valid) {
        res.status(401).json({ title: "invalid credentials" });
      }
      const tokenData = {
        username: ck!.username,
        email: ck!.email,
      };

      const token = await jwt.sign(tokenData, Config.JWT_SECRET_TOKEN, {
        expiresIn: expirationTime,
      });

      res.setHeader(
        "Set-Cookie",
        cookie.serialize("token", token, {
          httpOnly: true,
          path: "/",
          maxAge: expirationTime,
        })
      );
      res.status(200).json({ title: "success" });
    } catch (err) {
      console.log(err);
      res.status(500).json({ title: "error" });
    }
  } else {
    // Handle any other HTTP method
    res.status(400).json({ title: "error" });
  }
}
