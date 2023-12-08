import React, { useEffect, useState } from "react";
import type {ReactElement} from 'react';
import Layout from "../components/layout";
import Mainpage from "../components/Mainpage";
import { NextPageWithLayout } from "./_app";
import Profile from "../components/Profile";

const index:NextPageWithLayout = () => {
  return (
    <>
      <Mainpage />
    </>
  );
}
index.getLayout = function getLayout(index:ReactElement){
  return (
    <Layout>
      {index}
    </Layout>
  )
}
export default index;

