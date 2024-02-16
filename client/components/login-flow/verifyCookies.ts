import jwt from "jsonwebtoken";
import { Config } from "sst/node/config";

export default async function verifyJWT(
  token: string | undefined,
  api: (
    error: jwt.VerifyErrors | null,
    userDatadecoded: string | jwt.JwtPayload | undefined
  ) => void
) {
  const vfy = await jwt.verify(
    token || "",
    Config.JWT_SECRET_TOKEN,
    async function (err, decoded) {
      await api(err, decoded);
    }
  );
}
