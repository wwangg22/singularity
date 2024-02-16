"use client";

import React from "react";
import { useRouter } from "next/navigation";
import { useState, useEffect } from "react";
import Layout from "../components/layout";
import { NextPageWithLayout } from "./_app";
import Link from "next/link";
import type { ReactElement } from "react";
import { PropagateLoader } from "react-spinners";
import axios from "axios";
import url from "@/components/url"
import jwt from "jsonwebtoken";
import type { DataProps } from '@/components/types';
import { Config } from "sst/node/config";
import type { GetServerSideProps, GetServerSidePropsContext } from "next";



const validateEmail = (email: String) => {
  return String(email)
    .toLowerCase()
    .match(
      /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|.(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/
    );
};
const Login: NextPageWithLayout<DataProps> = () => {
  const router = useRouter();

  const [user, setUser] = useState({
    email: "",
    password: "",
  });
  const [errorMessage, setErrorMessage] = useState("");
  const [inputError, setInputError] = useState(false);
  const [errorfields, setErrorfields] = useState("");
  const [buttonDisabled, setButtonDisabled] = useState(false);
  const [loading, setLoading] = useState(false);
  useEffect(() => {
    if (user.email.length > 0 && user.password.length > 0) {
      setButtonDisabled(false);
    } else {
      setButtonDisabled(true);
    }
  }, [user]);
  const onSubmit = async (e: React.SyntheticEvent) => {
    setLoading(true);
    setInputError(false); // Reset input error flag
    setErrorMessage(""); // Clear any existing error messages
    e.preventDefault();
    try {
      if (validateEmail(user.email) == null) {
        setErrorMessage("Invalid Email");
        setInputError(true);
        setErrorfields("email");
        return;
      }
      const response = await axios.post(`${url}/api/logintest`, user);
      if (response.status === 200) {
        router.push("/");
      }
    } catch (error) {
      let statuscode;
      if (typeof error == 'object' && 'response' in error!)
      {

        const errorWithResponse = error as { response: { status: number } };
        statuscode = errorWithResponse.response.status;
      }
      else{
        statuscode = 0;
      }
      console.log(statuscode)
      if (statuscode === 400) {
        setErrorMessage("Invalid characters");
        setInputError(true);
        setErrorfields("both");
      } else if (statuscode === 401) {
        setErrorMessage("Invalid credentials");
        setInputError(true);
        setErrorfields("both");
      } else {
        setErrorMessage("Something went wrong, please try again");
        setInputError(true);
        setErrorfields("both");
      }
    } finally {
      setLoading(false);
    }
  };
  return (
    <div
      className={"flex flex-col items-center justify-center h-0.75 p-5 w-full"}
    >
      <h1 className={"text-2xl my-16"}>Login</h1>

      <label htmlFor={"email"}>Email</label>
      <div>
        <input
          className={`text-black my-4 p-2 rounded ${
            inputError && errorfields != "password"
              ? "border-[#9B2006] border-2"
              : "border border-gray-300"
          } focus:outline-none focus:ring-2 focus:ring-white`}
          type={"text"}
          id={"email"}
          placeholder={"Email"}
          value={user.email}
          onChange={(e) => setUser({ ...user, email: e.target.value })}
        />
        {errorMessage && errorfields != "password" && (
          <div className={"text-[#9B2006] text-sm mb-4"}>{errorMessage}</div>
        )}
      </div>
      <label htmlFor={"password"}>Password</label>
      <div>
        <input
          className={`text-black my-4 p-2 rounded ${
            inputError && errorfields != "email"
              ? "border-[#9B2006] border-2"
              : "border border-gray-300"
          } focus:outline-none focus:ring-2 focus:ring-white`}
          type={"password"}
          id={"password"}
          placeholder={"Password"}
          value={user.password}
          onChange={(e) => setUser({ ...user, password: e.target.value })}
        />
        {errorMessage && errorfields != "email" && (
          <div className={"text-[#9B2006] text-sm mb-2"}>{errorMessage}</div>
        )}
      </div>
      <button
        className={
          "mt-4 border-2 border-white py-2 rounded hover:bg-white hover:text-black p-2 cursor-pointer"
        }
        onClick={onSubmit}
        disabled={buttonDisabled}
      >
        {loading ? <PropagateLoader /> : "Login"}
      </button>
      <Link className={"text-sm my-2"} href={"/signup"}>
        Don&apos;t have an account? Sign Up
      </Link>
    </div>
  );
};
Login.getLayout = function getLayout(Login: ReactElement) {
  return <Layout>{Login}</Layout>;
};

export const getServerSideProps: GetServerSideProps =  async (context: GetServerSidePropsContext) => {
  const token = context.req.cookies.token || "";
  let data = {};
  let dc = false;
  await jwt.verify(
    token,
    Config.JWT_SECRET_TOKEN,
    function (err, decoded) {
      if (decoded) {
        console.log("hey");
        dc = true;
      }
      if (err) {
        data = {};
      }
    }
  );
  if (dc) {
    return {
      redirect: {
        permanent: false,
        destination: "/",
      },
    };
  }
  return {
    props: { userdata: data },
  };
}

export default Login;
