import React from 'react'
import Layout from '../components/layout';
import { NextPageWithLayout } from "./_app";
import type {ReactElement} from 'react';

const Test:NextPageWithLayout = () => {
    return (
        <div className = "h-[200vh]">heyyyy</div>
    );
}
Test.getLayout = function getLayout(test:ReactElement){
return (
    <Layout>
    {test}
    </Layout>
)
}

export default Test