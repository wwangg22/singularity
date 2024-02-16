import React from 'react'
import Link from 'next/link'
import { useRouter } from 'next/navigation'
import { useContext,useState } from 'react';
import { userContext } from '../components/layout';
import axios from "axios";
import url from "@/components/url"

const Profile: React.FC = () =>{
  const router=useRouter();
  const {data, setData} = useContext(userContext);
  const [loading, setLoading] = useState(false);

  async function signOut(e: React.MouseEvent<HTMLButtonElement>){
    try{
      const response = await axios.get(`${url}/api/logout`);
      if (response.status === 200) {
        router.push("/");
      }
    } catch (error) {
      console.log(error);
    } finally {
      setLoading(false);
    }
  }

  return (
    <div className="origin-top-right fixed top-[96px] right-[2vw] mt-2 w-56 rounded-md shadow-lg bg-white ring-1 ring-black ring-opacity-5 focus:outline-none duration-500" role="menu" aria-orientation="vertical" aria-labelledby="menu-button">
                    <div className="py-1" role="none">
                        <h3 className="px-[5px]">{data?.username || ""}</h3>
                        <Link href="/savedposts" className="text-gray-700 block px-4 py-2 text-sm hover:underline" role="menuitem">Saved Posts</Link>
                        <Link href="/settings" className="text-gray-700 block px-4 py-2 text-sm hover:underline" role="menuitem">Settings</Link>
                        <Link href="/myposts" className="text-gray-700 block px-4 py-2 text-sm hover:underline" role="menuitem">My Posts</Link>
                        <Link href="/help" className="text-gray-700 block px-4 py-2 text-sm hover:underline" role="menuitem">Help</Link>
                        <button onClick={signOut} className="text-gray-700 block px-4 py-2 text-sm hover:underline" role="menuitem">Sign Out</button>
                    </div>
                </div>
  )
}

export default Profile