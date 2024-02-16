import type { JwtPayload } from "jsonwebtoken";

export interface BlogEntry {
    metadata: string;
    GSI1PK: string;
    date: string;
    images: string[];
    SK: string;
    GSI1SK: string;
    PK: string;
    rawHTML: string;
    author: string;
    title: string;
  }
export interface UserData extends JwtPayload{
    email?: string;
    username?:string;
}
export interface DataProps {
    userdata?: UserData;
    blogs?: BlogEntry[];
    rawhtml?: string;
  }
