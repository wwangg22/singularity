import React from 'react'
import Image from "next/image"
import { useEffect } from 'react'
import Xicon from './XIcon'

function SettingComponent({name, type, selections, id}: {name:string, type:string, selections:string[], id:number}) {

    useEffect(()=>{

    
        return () => {
            
        }
    },[])

    const appear = (kk:number) => {
        return (event:React.FocusEvent) => {
            const ele = document.querySelector(`[data-name='${kk}']`);
            const ele2 = document.querySelector(`[ur-mom='${kk}']`)
            if (ele?.classList.contains('opacity-0')){
                ele.classList.remove('opacity-0')
                ele2?.classList.remove('translate-x-[48px]')
            }
            event.preventDefault();

        }
    }

    const disappear = (kk:number) => {
        return (event:React.FocusEvent) => {
            const ele = document.querySelector(`[data-name='${kk}']`);
            const ele2 = document.querySelector(`[ur-mom='${kk}']`)
            if (ele?.classList.contains('opacity-0')){
                ele.classList.remove('opacity-0')
            }
            else{
                ele?.classList.add('opacity-0')
                ele2?.classList.add('translate-x-[48px]')
            }
            event.preventDefault();

        }
    }

    const monitorsize = (kk:number) => {
        return (event:React.KeyboardEvent) => {
            const ele2 = document.querySelector(`[ur-mom='${kk}']`);
            if ((event.key) === 'Backspace' ||  (event.key) === 'Delete'){
            }
            else if ((ele2 as HTMLElement).innerText.length > 34){
                (ele2 as HTMLElement).innerText = (ele2 as HTMLElement).innerText.substring(0,35);
                event.preventDefault();
            }
        }
    }

  return (
    <div className = "w-full h-[75px] outline-none border-t-2 p-[5px] flex justify-between">
        <div className="my-auto text-title">{name}</div>
        {
            type == "onoff" &&
            <label id="button" className="relative inline-block w-[60px] h-[34px] left-0 my-auto" >
                <input type="checkbox" id = "buttoninput"/>
                <span id="buttonspan"></span>
            </label>
        }
        {
            type == "enter" && 
            <div className='flex gap-[10px] enter'>
                <label ur-mom={`${id}`} className='my-auto outline-none focus:border-b-2 text-title opacity-[0.5] translate-x-[48px] duration-[0.5s] ease-in-out z-10' 
                contentEditable={true} 
                onFocus={appear(id)} 
                onBlur = {disappear(id)} 
                onKeyDown={monitorsize(id)}>
                    {selections[0]}
                </label>
                <div className="my-auto outline outline-black outline-1 p-[5px] opacity-0 duration-[0.5s] ease-in-out"  data-name = {`${id}`}>
                    <Xicon/>
                </div>
            </div> 
        }
        {
            type == "date" && 
            <input type='date'>
            </input>
        }
        

    </div>
  )
}

export default SettingComponent