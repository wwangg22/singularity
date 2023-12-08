import React from 'react'

function Profile() {
  return (
    <div className="origin-top-right fixed top-[6vh] right-[2vw] mt-2 w-56 rounded-md shadow-lg bg-white ring-1 ring-black ring-opacity-5 focus:outline-none" role="menu" aria-orientation="vertical" aria-labelledby="menu-button">
                    <div className="py-1" role="none">
                        <a href="#" className="text-gray-700 block px-4 py-2 text-sm" role="menuitem">Saved Posts</a>
                        <a href="#" className="text-gray-700 block px-4 py-2 text-sm" role="menuitem">Settings</a>
                        <a href="#" className="text-gray-700 block px-4 py-2 text-sm" role="menuitem">Help</a>
                        <a href="#" className="text-gray-700 block px-4 py-2 text-sm" role="menuitem">Sign Out</a>
                    </div>
                </div>
  )
}

export default Profile