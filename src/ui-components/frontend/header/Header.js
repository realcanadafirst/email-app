'use client'
import Link from "next/link";
import Image from "next/image";
import { useEffect, useState } from "react";

const Header = () => {
    const [isAuthenticated, setIsAuthenticated] = useState(false)
    useEffect(() => {
        if (localStorage.getItem('usreData')) {
            setIsAuthenticated(true);
        }
    }, [])
    return (
        <header className={`sticky top-0 z-999 flex w-full bg-white drop-shadow-1 dark:bg-boxdark dark:drop-shadow-none ${isAuthenticated ? '' : ''} `}>
            {
                isAuthenticated ? <div className="flex flex-grow items-center justify-between px-4 py-4 shadow-2 md:px-6 2xl:px-11">
                    <div className="flex items-center gap-2 sm:gap-4 ">
                        <Link className="block flex-shrink-0" href="/">
                            <Image src={"/images/logo-no-background.png"} alt="Logo" className="logo-header" width={150} height={50} />
                        </Link>
                    </div>
                    <div className="hidden sm:block">

                    </div>
                    <div className="flex items-center gap-3 2xsm:gap-7">
                        <ul className="flex items-center gap-2 2xsm:gap-4">
                            <button className="inline-flex items-center justify-center rounded-md border border-meta-3 px-10 py-2 text-center font-medium text-meta-3 hover:bg-opacity-90 lg:px-8 xl:px-10">Login</button>
                        </ul>
                    </div>
                </div>
                    : <div className="flex flex-grow items-center justify-between px-4 py-4 shadow-2 md:px-6 2xl:px-11">
                        <div className="flex items-center gap-2 sm:gap-4 ">
                            <Link className="block flex-shrink-0" href="/">
                                <Image src={"/images/logo-no-background.png"} alt="Logo" className="logo-header" width={150} height={50} />
                            </Link>
                        </div>
                        <div className="hidden sm:block">

                        </div>
                        <div className="flex items-center gap-3 2xsm:gap-7">
                            <ul className="flex items-center gap-2 2xsm:gap-4">
                                <Link className="block flex-shrink-0" href="/login">
                                    <button className="inline-flex items-center justify-center rounded-md border border-meta-3 px-10 py-2 text-center font-medium text-meta-3 hover:bg-opacity-90 lg:px-8 xl:px-10">Login</button>
                                </Link>
                            </ul>
                        </div>
                    </div>
            }
        </header>
    );
};

export default Header;
