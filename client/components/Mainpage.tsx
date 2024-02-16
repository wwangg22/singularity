import React from "react";
import Articles from "./Articles";
import { BlogEntry } from "@/components/types";

interface MainpageProps {
  blogs: BlogEntry[] | undefined;
}

const Mainpage:React.FC<MainpageProps> = ({blogs}) => {
  return (
    <div className="grid grid-rows-auto w-1/2 mx-auto gap-3 mt-5">
      {blogs?.map((blog, index) => (
        <Articles
          key = {blog.SK} 
          title={blog.title || "no title available"}
          author={blog.author || "no author available"}
          date={new Date(blog.date).toDateString() || "no date available"}
          id={blog.SK.split('#')[1]}
        />
      ))}
      
    </div>
  );
}


export default Mainpage;
