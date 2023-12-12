import React from 'react'
import Image from "next/image"
import img from '../public/test.jpg'

function Articles({title, author,date, id}: {title:string, author:string, date:string, id:string}) {
  return (
    <a href ={ `/posts/${id}`}>
        <div className = "w-full h-art outline outline-1 grid grid-cols-46">

                <Image
                    src={img}
                    className="object-cover p-2 h-full w-full"
                    alt="test image" />
                <div className="p-2 grid grid-rows-91 font">
                    <h1 className="m-auto font-crsemibold text-2xl">
                        {title}
                    </h1>
                    <div className="flex justify-between">
                        <h3>{author}</h3>
                        <h3>{date}</h3>
                    </div>
                    
                </div>

        </div>
     </a>
  )
}

export default Articles