import React,{useState,useEffect} from 'react'
import Profile from './Profile';
import Link from 'next/link';

function Headers({page}:{page:String}) {
    const [selected, setSelected] = useState(0)
    const [topofPage, settopofPage] = useState(false)
    const [dropdown, setdropdown] = useState(false);

    useEffect(()=>{
        document.addEventListener('scroll', handleScroll);
        return () => {
            document.removeEventListener('scroll', handleScroll)
        }
    },[])

    const handleScroll = () => {
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
    }


    const sendGetRequest = () =>{
        fetch('/api/upload',{
            method: "POST",
            headers: {
              Accept: "application/json",
              "Content-Type": "application/json"
            },
            body: JSON.stringify({
              username: "foo",
              password: "bar"
            })}
            )
        .then(response => response.json())
        .then(data => console.log(data));
    }

    const clicked = () =>{
        return (event:React.MouseEvent) => {
            setdropdown(!dropdown);
            event.preventDefault();

        }
    }

    const select = (x:number) => {
        return (event:React.MouseEvent) => {
            setSelected(x);
            console.log(x)
            event.preventDefault();

        }
    }
  return (
    <>
    <Link href="/">
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
    </Link>
    <svg id="titleicon" className = "fixed col-start-1 row-start-1 z-0 top-6 left-1/2 -translate-x-1/2" width="57" height="29" viewBox="0 0 57 29" fill="none" xmlns="http://www.w3.org/2000/svg">
        <path d="M57 28.5C57 20.9413 53.9973 13.6922 48.6525 8.34746C43.3078 3.00267 36.0587 5.70664e-07 28.5 0C20.9413 -5.70664e-07 13.6922 3.00267 8.34746 8.34745C3.00267 13.6922 1.14133e-06 20.9413 0 28.5L28.5 28.5H57Z" fill="#DCDCDC"/>
    </svg>
    <div className='mt-6 grid grid-rows-headers fixed w-full'>
        <div className='grid grid-cols-7 h-[75px]'>
            <div className="flex pl-search pr-searchright col-span-2 w-full">
                <input className= "w-[160px] self-end w-full bg-transparent text-left text-2xl outline-none border-black hover:border-solid hover:border-b-2 focus:border-solid focus:border-b-2"id="search" type="text" placeholder= "search"></input>
            </div>
            <div></div>
            <div></div>
            <div></div>
            <h3 className="text-2xl text-right flex"><Link className="self-end cursor-pointer w-full" href='/write'>write</Link></h3>
            <h3 className="text-2xl pl-4 flex">
                {/* <button className="cursor-pointer" onClick={clicked()}>my profile
                </button> */}
                <button onClick={clicked()}>
                    <img className="ml-5 rounded-xl object-contain w-[62px] h-[62px]"src="data:image/jpeg;base64,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"/>
                </button>
            </h3>
        </div>
        {
            page && page != "saved posts" ||
            <div className="grid grid-cols-4 mt-3">
            <div></div>
            <div id = "minimenu" className="flex justify-left gap-3 text-sml">
                <h2 className = {`cursor-pointer`}><button className={`${selected == 0 ? 'underline': ''}`}  onClick={select(0)}>food</button></h2>
                <h2 className = {`cursor-pointer`}><button className={`${selected == 1 ? 'underline': ''}`}  onClick={select(1)}>bar</button></h2>
                <h2 className = {`cursor-pointer`}><button className={`${selected == 2 ? 'underline': ''}`} onClick={select(2)}>clubs</button></h2>
            </div>
            <div>
                {/*<button onClick={sendGetRequest}>send</button>*/}
            </div>
            <div></div>
        </div>
        }
        {
            page &&
            <div>
                <h1 className="text-title w-3/4 mx-auto">{page}</h1>
            </div>
        }
    </div>
    {dropdown ? <Profile /> : null}
    <div className='h-100'>
    </div>
    </>
  )
}

export default Headers