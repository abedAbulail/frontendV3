"use client"


import Navbar from "./nav"
import { usePathname } from "next/navigation"
export default function ShowNav(){



    const pathname = usePathname()

const showNav = pathname !== "/login" &&  pathname !== "/"

    return(<>{showNav && <Navbar/>} </> )

    
}