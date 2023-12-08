import Headers from "./Headers";

export default function Layout({children}:any){
    return (
        <>
            <Headers/>
            <main>{children}</main>
        </>
    )
}