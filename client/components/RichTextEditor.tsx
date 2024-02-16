'use client'
import React, {useEffect, useState, useContext} from 'react'
import Xicon from '@/components/XIcon';
import PhotoIcon from '@/components/PhotoIcon';
import VideoIcon from '@/components/VideoIcon';
import LinkIcon from '@/components/LinkIcon';
import CodeIcon from '@/components/CodeIcon';
import ParagraphIcon from '@/components/ParagraphIcon';
import axios from 'axios'
import url1 from "@/components/url"
import type { UserData } from '@/components/types';
import { PropagateLoader } from "react-spinners";


const regex = /(?<=[^\n])\n|\n(?=[^\n])|\n\n(?=\n)/

function RichTextEditor({userdata}: UserData) {

    const [numparagraphs, setNumparagraphs] = useState(3);
    const [location, setLocation] = useState(0);
    const [coord, setCoord] = useState(0);
    const [imageurls, setImageurls] = useState<any[]>([])
    const [scroll,setScroll] = useState(0);
    const [loading, setLoading] = useState(false);
    const [saved, setSaved] = useState(false);
    const [isMenuVisible, setIsMenuVisible] = useState(false);

    let dic: string[] = [];
    useEffect(() => {
        if (!saved){
        document.getElementById('button')!.style.transform = `translateY(${coord - 212.8000030517578 + 42 +window.scrollY}px)`;
        document.getElementById('savebtn')!.style.transform = `translateY(${coord - 212.8000030517578 + 42 +window.scrollY}px)`;}
      }, [coord]);

    useEffect(()=>{

        const testing2 = document.getElementById("testing2");

        testing2?.addEventListener('input', handleInput);
        
        document.addEventListener('mousedown', handleOutsideClick);
        document.addEventListener('mouseup',handleMouseUp);
        return () => {
            document.removeEventListener('mousedown', handleOutsideClick);
            testing2?.removeEventListener('input', handleInput);
            document.removeEventListener('mouseup',handleMouseUp);
        };

    },[])

    const handleMouseUp =(e: MouseEvent) => {
        const target = e.target as Node;
        let indx = 0;
        for (const j of document.getElementById('testing2')?.childNodes!){

            if (j.contains(target)){
                setCoord((j as Element).getBoundingClientRect().y)
                setLocation(indx);
                break;
            }
            indx += 1;
        }
    }
    
    const submitInput = (event:React.MouseEvent) =>{
        const imageinput = document.getElementById("imageinput") as HTMLInputElement
        imageinput.click();
        event.preventDefault();
    }

    const insertAfter = (newNode:HTMLElement, existingNode:HTMLElement) => {
        existingNode.parentNode?.insertBefore(newNode, existingNode.nextSibling);
    }

    const saveArticle = async () => {


        const element = document.getElementById('testing2');
        if (element){
            element.contentEditable = 'false';

        }
        else{
            alert("error finding table!")
            return
        }
        const rhtml = element!.innerHTML
        //have to freeze div so you can't edit more!
        try{
            setLoading(true);
            const {url} = await fetch(`${url1}/api/url`).then(res => res.json());
        
            await fetch(url, {
                method: "PUT",
                headers:{
                    "Content-Type": "text/plain"
                },
                body: rhtml
            })
            const htmlUrl= url.split('?')[0];
            const title = document.getElementById('titletxt')?.innerText
            let prms = {
                title: title,
                author: userdata?.username || '', // Added author field
                metadata: '',
                rawHTML: htmlUrl, // Added text field
                images: imageurls // Added images field
            }
            const response = await axios.post(`${url1}/api/put`, prms)
        }
        catch(e){
            alert(e)
            setLoading(false)
        }
        finally{
            setLoading(false)
            setSaved(true);
        }

    }

    const submitForm = async (event:React.ChangeEvent) => {
        event.preventDefault();
        // const form = document.getElementById("imageform") as HTMLFormElement
        // form.submit();
        console.log('Upload function called');
        const imageinput = document.getElementById("imageinput") as HTMLInputElement
        const file = imageinput.files?.[0];
        console.log('File selected:', file);

        const {url} = await fetch(`${url1}/api/url`).then(res => res.json());

        await fetch(url, {
            method: "PUT",
            headers:{
                "Content-Type": "multipart/form-data"
            },
            body:file
        })
        

        const imageUrl= url.split('?')[0];
        console.log(imageUrl);
        setImageurls((old: any[]) => [...old, imageUrl])

        var parentElement = document.getElementById('testing2')as HTMLElement;
        var referenceNode = parentElement.children[location] as HTMLElement;
        var newElement = document.createElement('img');
        var emptyLine = document.createElement('div');
        emptyLine.appendChild(document.createElement('br'))
        newElement.setAttribute('src', imageUrl);

        //parentElement.insertBefore(newElement,referenceNode);
        insertAfter(newElement,referenceNode);
        insertAfter(emptyLine,newElement);


    }

    const handleOutsideClick = (event: MouseEvent) => {
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
                setCoord((j as Element).getBoundingClientRect().y)
                setLocation(indx);
                break;
            }
            indx += 1;
        }

    };

    const handleInput = () => {
        const text = (document.querySelector("#testing2") as HTMLElement).innerText;
        const lines = text?.split(regex).map(s => s === '\n' ? '' : s);
        var b = 0;
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

    // const click = () => {
    //     console.log('clicked')
    // }
    const flip = () =>{
        setIsMenuVisible(!isMenuVisible);
        flip45(document.getElementById('icon')!)
    }

    const upload = async (event: React.FormEvent<HTMLFormElement>) => {
        event.preventDefault();
        // console.log('Upload function called');
        // const imageinput = document.getElementById("imageinput") as HTMLInputElement
        // const file = imageinput.files?.[0];
        // console.log('File selected:', file);

        // Handle file upload logic here
    };

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
        {
        !saved && 
        <div id = 'button' className={`w-[42px] h-[42px] absolute top-[172px] left-svg flex outline outline-black outline-1 duration-1000 `}>
            <button className="w-full h-full z-10" onClick={flip}>
                <Xicon/>
            </button>
            <div id='menubar' className={`w-full absolute left-0 top-0 h-auto mx-auto grid grid-rows-5 gap-[20px] transition-all duration-1000 transform ${isMenuVisible ? 'translate-y-[64px] opacity-1 pointer-events-auto' : '-translate-y-full opacity-0 pointer-events-none'}`}>
                <form id="imageform" onSubmit={upload}>
                <input id="imageinput" type="file" accept="image/*" onChange={submitForm} hidden/>
                    <button id="imagebutton" type="button" title="add photo" onClick={submitInput}>
                        <PhotoIcon/>
                    </button>
                </form>
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
        </div>}
        {
            !saved && 
            <div id ="savebtn" className={'w-[150px] h-[42px] absolute top-[172px] right-bbl flex outline outline-black outline-1 duration-1000'}>
           { 
           loading ? 
           <PropagateLoader /> 
           :
            <button className="w-full h-full z-10" onClick={saveArticle}>
                save this bitch
            </button>
            
            }
            </div>
        }
        <div className="w-1/2 m-auto text-2xl">
            <div id='testing2' className="outline-none outline-black border-b-[2px]" contentEditable={true}>
                <h3 id="titletxt" className="text-titlexl outline-black border-b-[1px]">title</h3>
                <div>text here</div>
            </div>
        </div>
    </>
  )
}

export default RichTextEditor;