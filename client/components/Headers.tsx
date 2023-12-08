import React,{useState,useEffect} from 'react'
import Profile from './Profile';

function Headers() {
    const [selected, setSelected] = useState(0)
    const [topofPage, settopofPage] = useState(false)
    const [dropdown, setdropdown] = useState(false);

    useEffect(()=>{
        document.addEventListener('scroll', (e)=>{
            if (window.scrollY > 60){
                if (!document.getElementById('title')?.classList.contains('move')){
                    document.getElementById('title')?.classList.add('move');
                    document.getElementById('titleicon')?.classList.add('move');
                    document.getElementById('minimenu')?.classList.add('move');
                }
            }
            else{
                if (document.getElementById('title')?.classList.contains('move')){
                    document.getElementById('title')?.classList.remove('move');
                    document.getElementById('titleicon')?.classList.remove('move');
                    document.getElementById('minimenu')?.classList.remove('move');
                }
            }
            
        })
    },[])

    const clicked = () =>{
        return (event:React.MouseEvent) => {
            setdropdown(!dropdown);
            event.preventDefault();

        }
    }
  return (
    <>
    <div id = "title" className="flex cursor-default text-center m-auto text-graytrans text-title fixed top-6 left-1/2 -translate-x-1/2 z-10 duration-1000">
            <h1>S</h1>
            <h1>i</h1>
            <h1>n</h1>
            <h1>g</h1>
            <h1>u</h1>
            <h1>l</h1>
            <h1>a</h1>
            <h1>r</h1>
            <h1>i</h1>
            <h1>t</h1>
            <h1>y</h1>
    </div>
    <svg id="titleicon" className = "fixed col-start-1 row-start-1 z-0 top-6 left-1/2 -translate-x-1/2" width="57" height="29" viewBox="0 0 57 29" fill="none" xmlns="http://www.w3.org/2000/svg">
        <path d="M57 28.5C57 20.9413 53.9973 13.6922 48.6525 8.34746C43.3078 3.00267 36.0587 5.70664e-07 28.5 0C20.9413 -5.70664e-07 13.6922 3.00267 8.34746 8.34745C3.00267 13.6922 1.14133e-06 20.9413 0 28.5L28.5 28.5H57Z" fill="#DCDCDC"/>
    </svg>
    <div className='mt-6 grid grid-rows-headers fixed w-full'>
        <div className='grid grid-cols-7'>
            <div className="pl-search pr-searchright col-span-2 w-full">
                <input className= "w-full bg-transparent text-left text-2xl outline-none border-black hover:border-solid hover:border-b-2 focus:border-solid focus:border-b-2"id="search" type="text" placeholder= "search"></input>
            </div>
            <div></div>
            <div></div>
            <div></div>
            <h3 className="text-2xl text-right"><a className="cursor-pointer" href='/write'>write</a></h3>
            <h3 className="text-2xl pl-4"><button className="cursor-pointer" onClick={clicked()}>my profile</button></h3>
        </div>
        <div className="grid grid-cols-4">
            <div></div>
            <div id = "minimenu" className="flex justify-left gap-3 text-sml">
                <h2 className = {`${selected == 0 ? 'underline': ''} cursor-pointer`}>food</h2>
                <h2 className = {`${selected == 1 ? 'underline': ''} cursor-pointer`}>bar</h2>
                <h2 className = {`${selected == 2 ? 'underline': ''} cursor-pointer`}>clubs</h2>
            </div>
            <div></div>
            <div></div>
        </div>
    </div>
    {dropdown ? <Profile /> : null}
    <div className='h-100'>

    </div>
    </>
  )
}

export default Headers