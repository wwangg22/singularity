import Headers from "./Headers";

export default function Layout({page, children}:any){
    return (
        <>
            <Headers
                page={page}
            />
            <main>{children}</main>
        </>
    )
}