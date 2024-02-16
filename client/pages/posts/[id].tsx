import React from "react";
import { useRouter } from "next/router";
import Layout from "@/components/layout";
import { NextPageWithLayout } from "../_app";
import { useContext } from "react";
import type { ReactElement } from "react";
import { userContext } from "@/components/layout";
import jwt from "jsonwebtoken";
import axios from "axios";
import url from "@/components/url"
import { Config } from "sst/node/config";
import type { DataProps } from "@/components/types";
import type { GetServerSideProps, GetServerSidePropsContext } from "next";


const Index: NextPageWithLayout<DataProps> = ({ userdata, rawhtml }) => {
  const router = useRouter();
  //Post: {router.query.id}
  console.log(rawhtml)
  const sections = 5;
  const { data, setData } = useContext(userContext);
  if (userdata != undefined){
    setData(userdata);
  }

  return (
    <div className="w-1/2 m-auto text-2xl">
      <div dangerouslySetInnerHTML={{ __html: rawhtml || "" }} />
    </div>
  );
};
Index.getLayout = function getLayout(index: ReactElement) {
  return <Layout>{index}</Layout>;
};

export const getServerSideProps: GetServerSideProps = async (context: GetServerSidePropsContext) => {
  const token = context.req.cookies.token || "";
  let blogs = [];
  let data = {};
  await jwt.verify(
    token,
    Config.JWT_SECRET_TOKEN,
    function (err, decoded) {
      if (decoded) {
        data = decoded;
      }
      if (err) {
        data = {};
      }
    }
  );
  let rawhtmld;
    const response = await axios.get(`${url}/api/getpost`, {
      params: { blogid: context.params?.id },
    });
    blogs = JSON.parse(response.data.data);
    console.log(blogs)
    const rawhtml = await axios.get(blogs.rawHTML);
    rawhtmld = rawhtml.data;

  return {
    props: { userdata: data, rawhtml: rawhtmld },
  };
}
export default Index;
