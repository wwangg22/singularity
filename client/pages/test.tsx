import React from 'react'
import Layout from '../components/layout';
import { NextPageWithLayout } from "./_app";
import type {ReactElement} from 'react';

const test:NextPageWithLayout = () => {
    return (
        <div className = "h-[200vh]">heyyyy</div>
    );
}
test.getLayout = function getLayout(test:ReactElement){
return (
    <Layout>
    {test}
    </Layout>
)
}

export default test