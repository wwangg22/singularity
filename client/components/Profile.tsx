import React from 'react'
import Link from 'next/link'

function Profile() {
  return (
    <div className="origin-top-right fixed top-[96px] right-[2vw] mt-2 w-56 rounded-md shadow-lg bg-white ring-1 ring-black ring-opacity-5 focus:outline-none duration-500" role="menu" aria-orientation="vertical" aria-labelledby="menu-button">
                    <div className="py-1" role="none">
                        <Link href="/savedposts" className="text-gray-700 block px-4 py-2 text-sm hover:underline" role="menuitem">Saved Posts</Link>
                        <Link href="/settings" className="text-gray-700 block px-4 py-2 text-sm hover:underline" role="menuitem">Settings</Link>
                        <Link href="/help" className="text-gray-700 block px-4 py-2 text-sm hover:underline" role="menuitem">Help</Link>
                        <Link href="#" className="text-gray-700 block px-4 py-2 text-sm hover:underline" role="menuitem">Sign Out</Link>
                    </div>
                </div>
  )
}

export default Profile