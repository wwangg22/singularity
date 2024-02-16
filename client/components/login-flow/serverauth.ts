import jwt from "jsonwebtoken";
import type { GetServerSideProps, GetServerSidePropsContext } from "next";
import type { UserData } from "../types";
import { Config } from "sst/node/config";

const getServerSideProps:GetServerSideProps = async (context:GetServerSidePropsContext) => {
  const token = context.req.cookies.token || "";
  let data: UserData = {};
  await jwt.verify(
    token,
    Config.JWT_SECRET_TOKEN,
    function (err, decoded) {
      if (decoded) {
        data = decoded as UserData;
      }
      if (err) {
        data = {};
      }
    }
  );
  return {
    props: { userdata: data },
  };
}

export default getServerSideProps;
