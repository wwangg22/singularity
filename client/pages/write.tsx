import React, {useContext} from 'react'
import Layout from '../components/layout';
import { NextPageWithLayout } from "./_app";
import type {MouseEventHandler, ReactElement} from 'react';
import RichTextEditor from '@/components/RichTextEditor';
import getServerSideProps from '@/components/login-flow/serverauth';
import { userContext } from '../components/layout';
import type { DataProps } from '@/components/types';




const Write:NextPageWithLayout<DataProps> = ({userdata}) => {
    const { data, setData } = useContext(userContext);
    if (userdata !== undefined) {
      setData(userdata);
    }
    console.log(userdata);
    return (
        <RichTextEditor
        userdata = {userdata}
         />
    );
}

Write.getLayout = function getLayout(Write:ReactElement){
    
    return (   
            <Layout>
                {Write}
            </Layout>
    )
}



export {getServerSideProps};

export default Write