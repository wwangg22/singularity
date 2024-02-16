import React from 'react'
import Layout from '../components/layout';
import { NextPageWithLayout } from "./_app";
import type {ReactElement} from 'react';
import { useContext } from 'react';
import { userContext } from '../components/layout';
import SettingComponent from '@/components/SettingComponent';
import type { DataProps } from '@/components/types';


const Settings:NextPageWithLayout<DataProps> = 
    ({userdata}) => {
        const { data, setData } = useContext(userContext);

        if (userdata !== undefined) {
            setData(userdata);
          }
    return (
        <>
            <div className="grid grid-rows-auto w-1/2 mx-auto gap-3 mt-5">
                <SettingComponent
                    name = 'newsletter'
                    type = 'onoff'
                    selections = {['idk', '2']}
                    id = {1}
                />
                <SettingComponent
                    name = 'email'
                    type = 'enter'
                    selections = {['niudbb@gmail.com', '2']}
                    id = {2}
                />
                <SettingComponent
                    name = 'name'
                    type = 'enter'
                    selections = {['william', '2']}
                    id = {3}
                />
                <SettingComponent
                    name = 'username'
                    type = 'enter'
                    selections = {['sukuna', '2']}
                    id = {4}
                />
                <SettingComponent
                    name = 'birthdate'
                    type = 'date'
                    selections = {['august,2022', '2']}
                    id = {5}
                />
            </div>
        </>
    );
    }
Settings.getLayout = function getLayout(Settings:ReactElement){
return (
    <Layout page='settings'>
    {Settings}
    </Layout>
)
}

export { default as getServerSideProps } from "@/components/login-flow/serverauth";


export default Settings