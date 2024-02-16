import Headers from "./Headers";
import { createContext,useState } from "react";
import { UserData } from "@/components/types"; // Import UserData type

interface UserContextType {
    data: UserData | null; // Use UserData or null for when there's no user data
    setData: React.Dispatch<React.SetStateAction<UserData>>;
}

const defaultSetData: React.Dispatch<React.SetStateAction<UserData>> = () => {};

export const userContext = createContext<UserContextType>({
  data: null,
  setData: defaultSetData,
});

export default function Layout({page, children}:any){
    const inital: UserData = {}
    const [data,setData] = useState(inital)
    const values: UserContextType = {data,setData}
    console.log(data);

    return (
        <userContext.Provider value = {values}>
            <Headers
                page={page}
                userdata={data}
            />
            <main>{children}</main>
        </userContext.Provider>
    )
}