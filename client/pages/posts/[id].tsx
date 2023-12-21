import React from 'react'
import { useRouter } from 'next/router'
import Layout from '@/components/layout';
import { NextPageWithLayout } from "../_app";
import type {ReactElement} from 'react';

const Index:NextPageWithLayout = () => {
    const router = useRouter()
    //Post: {router.query.id}
    const sections = 5;
    const test = "Well damn Medium. I like this text editor a lot!I’m actually about to launch a social media site myself. It's called MeritFront. It may compete with you eventually (sorry, not sorry).I am checking out your text editor… because well… I think our text editor is our current biggest weakness. So, I am here to get ideas.First off, I applaud the design. I mean look at how clean this is. Very few distractions. Hold on. I’ll screenshot this for anyone reading this very, very private conversation between me and medium."
  return (
    <div className = {`w-1/2 m-auto grid`}>
      <div>h</div>
      <div>e</div>
      <div>y</div>
    </div>
  )
}
Index.getLayout = function getLayout(index:ReactElement){
    return (
        <Layout>
        {index}
        </Layout>
    )
    }

export default Index;