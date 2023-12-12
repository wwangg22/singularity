import React from "react";
import Articles from "./Articles";

function Mainpage() {
  return (
    <div className="grid grid-rows-auto w-1/2 mx-auto gap-3 mt-5">
      <Articles
        title="Best Ever Stuffing for Crock Pot or Oven"
        author="william"
        date="aug 15, 2023"
        id = 'a'
      />
      <Articles
        title="Best Ever Stuffing for Crock Pot or Oven22"
        author="william22"
        date="aug 1125, 2023"
        id = 'b'
      />
      <Articles
        title="Best Ever Stuffing for Crock Pot or Oven22"
        author="william22"
        date="aug 1125, 2023"
        id = 'c'
      />
      <Articles
        title="Best Ever Stuffing for Crock Pot or Oven22"
        author="william22"
        date="aug 1125, 2023"
        id = 'd'
      />
      <Articles
        title="Best Ever Stuffing for Crock Pot or Oven22"
        author="william22"
        date="aug 1125, 2023"
        id = 'e'
      />
    </div>
  );
}

export default Mainpage;
