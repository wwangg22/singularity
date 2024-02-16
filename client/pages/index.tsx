import React, {  useContext } from "react";
import type { ReactElement } from "react";
import Layout from "../components/layout";
import Mainpage from "../components/Mainpage";
import { NextPageWithLayout } from "./_app";
import type { GetServerSideProps, GetServerSidePropsContext } from "next";
import { userContext } from "../components/layout";
import jwt from "jsonwebtoken";
import axios from "axios";
import url from "@/components/url"
import { BlogEntry, UserData, DataProps } from "@/components/types";
import { Config } from "sst/node/config";

const Index: NextPageWithLayout<DataProps> = ({ userdata, blogs }) => {
  const { data, setData } = useContext(userContext);
  if (userdata !== undefined) {
    setData(userdata);
  }

  return (
    <>
      <Mainpage blogs={blogs} />
    </>
  );
};
Index.getLayout = function getLayout(index: ReactElement) {
  return <Layout>{index}</Layout>;
};

export const getServerSideProps: GetServerSideProps =  async (context: GetServerSidePropsContext) => {
  const token = context.req.cookies.token || "";
  let data:UserData = {};
  let blogs: BlogEntry[] = [];
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
  try {
    const response = await axios.get(`${url}/api/get`);
    blogs = JSON.parse(response.data.data) as BlogEntry[];
  } catch (error) {
    console.error("Error fetching data: ", error);
    throw error;
  }
  console.log(data)
  return {
    props: { userdata: data, blogs: blogs },
  };
}

export default Index;
