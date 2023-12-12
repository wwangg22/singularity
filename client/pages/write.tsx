import React, {useEffect, useState} from 'react'
import Layout from '../components/layout';
import { NextPageWithLayout } from "./_app";
import type {ReactElement} from 'react';
import Xicon from '@/components/XIcon';
import PhotoIcon from '@/components/PhotoIcon';
import VideoIcon from '@/components/VideoIcon';
import LinkIcon from '@/components/LinkIcon';
import CodeIcon from '@/components/CodeIcon';
import ParagraphIcon from '@/components/ParagraphIcon';


const regex = /(?<=[^\n])\n|\n(?=[^\n])|\n\n(?=\n)/
const test:NextPageWithLayout = () => {

    const [numparagraphs, setNumparagraphs] = useState(3);
    const [location, setLocation] = useState(0);
    const [isMenuVisible, setIsMenuVisible] = useState(false);
    console.log('refreshed');

    let dic: string[] = [];

    useEffect(() => {
        document.getElementById('button')!.style.transform = `translateY(${location*42}px)`;
      }, [location]);

    useEffect(()=>{

        const testing2 = document.getElementById("testing2");

        testing2?.addEventListener('input', handleInput);
        // testing2?.addEventListener('propertychange', (e) => {
        //     //console.log('propchange',e);
        // })
        // testing2?.addEventListener('keypress', (e) => {
        //     //console.log('keypress',e);
        // });
        // testing2?.addEventListener('mouseup', (e) => {
        //     //console.log('mouseup',e);
        // });
        // testing2?.addEventListener('keyup', (e) => {
        //     //console.log('keyup',e);
        // });
        document.addEventListener('mousedown', handleOutsideClick);
        return () => {

            document.removeEventListener('mousedown', handleOutsideClick);
            testing2?.removeEventListener('input', handleInput);
        };

    },[])

    const handleOutsideClick = (event: MouseEvent) => {
        console.log(event)
        const button = document.getElementById('button');
        const menubar = document.getElementById('menubar');
        // Ensure that event.target is a Node
        const target = event.target as Node;
        const tf = document.getElementById('menubar')?.classList.contains('opacity-1');

        if (menubar && button && !menubar.contains(target) && !button.contains(target) && tf) {
            setIsMenuVisible(false);
            flip45(document.getElementById('icon'));
        }

        let v:HTMLElement | null;
        let indx = 0;
        // console.log(document.getElementById('testing2')?.childNodes)
        for (const j of document.getElementById('testing2')?.childNodes!){
            if (j.contains(target)){
                setLocation(indx);
                break;
            }
            indx += 1;
        }

    };

    const handleInput = () => {
        const text = document.getElementById("testing2")?.innerText;
        const lines = text?.split(regex).map(s => s === '\n' ? '' : s);
        var b = 0;
        console.log(JSON.stringify(text));
        console.log(lines);
        console.log(dic);
        if (lines!.length < dic.length){
            setLocation(lines!.length -1);
        }
        else{
            for (const a of lines!){

                if (dic[b] != undefined){
                    if (a != dic[b]){
                        console.log('hey')
                        setLocation(b);
                        console.log(location);
                        break;
                    }
                }
                else{
                    setLocation(b);
                }
                b+=1
            }
        }
        dic = lines!;
    }

    const click = () => {
        console.log(String.raw(document.querySelector("#testing2")?.innerText))
    }
    const flip = () =>{
        setIsMenuVisible(!isMenuVisible);
        flip45(document.getElementById('icon')!)
    }

    const flip45 = (item:HTMLElement | null) => {
        if (item?.classList.contains("rotate-45")){
            item.classList.remove("rotate-45")
        }
        else{
            item?.classList.add("rotate-45");
        }
    }

    return (
        <>
            <div id = 'button' className={`w-[42px] h-[42px] absolute top-[172px] left-svg flex outline outline-black outline-1 duration-1000 `}>
                <button className="w-full h-full z-10" onClick={flip}>
                    <Xicon/>
                </button>
                <div id='menubar' className={`absolute left-0 top-0 h-auto mx-auto grid grid-rows-5 gap-[20px] transition-all duration-1000 transform ${isMenuVisible ? 'translate-y-[64px] opacity-1' : '-translate-y-full opacity-0'}`}>
                    <button title="add photo">
                        <PhotoIcon/>
                    </button>
                    <button title="add video">
                        <VideoIcon/>
                    </button>
                    <button title="insert embedded link">
                        <LinkIcon/>
                    </button>
                    <button title="insert code block">
                        <CodeIcon/>
                    </button>
                    <button title="new section">
                        <ParagraphIcon/>
                    </button>
                </div>
            </div>
            <div className="w-1/2 m-auto text-2xl">
                <div id='testing2' className="outline-none outline-black border-b-[2px]" contentEditable={true}>
                    <h3 className="text-titlexl outline-black border-b-[1px]">title</h3>
                    <div>text here</div>
                </div>
                
            </div>
        </>
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