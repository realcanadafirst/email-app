'use client'
import Link from "next/link";
import DarkModeSwitcher from "@ft/ui-components/admin/Layouts/DarkModeSwitcher";
import DropdownUser from "@ft/ui-components/admin/Layouts/DropdownUser";
import Image from "next/image";
import { useEffect, useState } from "react";

const Header = ({ sidebarOpen, setSidebarOpen }) => {
    const [isAuthenticated, setIsAuthenticated] = useState(false)
    useEffect(() => {
        if (localStorage.getItem('userData')) {
            setIsAuthenticated(true);
        } else {
            setIsAuthenticated(false);
        }
    }, [])
    return (
        <header className={`sticky top-0 z-999 flex w-full bg-white drop-shadow-1 dark:bg-boxdark dark:drop-shadow-none`}>
            {
                isAuthenticated ? <div className="flex flex-grow items-center justify-between px-4 py-4 shadow-2 md:px-6 2xl:px-11">
                    <div className="flex items-center gap-2 sm:gap-4 lg:hidden">
                        <button
                            aria-controls="sidebar"
                            onClick={(e) => {
                                e.stopPropagation();
                                setSidebarOpen(!sidebarOpen);
                            }}
                            className="z-99999 block rounded-sm border border-stroke bg-white p-1.5 shadow-sm dark:border-strokedark dark:bg-boxdark lg:hidden"
                        >
                            <span className="relative block h-5.5 w-5.5 cursor-pointer">
                                <span className="du-block absolute right-0 h-full w-full">
                                    <span
                                        className={`relative left-0 top-0 my-1 block h-0.5 w-0 rounded-sm bg-black delay-[0] duration-200 ease-in-out dark:bg-white ${!sidebarOpen && "!w-full delay-300"
                                            }`}
                                    ></span>
                                    <span
                                        className={`relative left-0 top-0 my-1 block h-0.5 w-0 rounded-sm bg-black delay-150 duration-200 ease-in-out dark:bg-white ${!sidebarOpen && "delay-400 !w-full"
                                            }`}
                                    ></span>
                                    <span
                                        className={`relative left-0 top-0 my-1 block h-0.5 w-0 rounded-sm bg-black delay-200 duration-200 ease-in-out dark:bg-white ${!sidebarOpen && "!w-full delay-500"
                                            }`}
                                    ></span>
                                </span>
                                <span className="absolute right-0 h-full w-full rotate-45">
                                    <span
                                        className={`absolute left-2.5 top-0 block h-full w-0.5 rounded-sm bg-black delay-300 duration-200 ease-in-out dark:bg-white ${!sidebarOpen && "!h-0 !delay-[0]"
                                            }`}
                                    ></span>
                                    <span
                                        className={`delay-400 absolute left-0 top-2.5 block h-0.5 w-full rounded-sm bg-black duration-200 ease-in-out dark:bg-white ${!sidebarOpen && "!h-0 !delay-200"
                                            }`}
                                    ></span>
                                </span>
                            </span>
                        </button>

                        <Link className="block flex-shrink-0 lg:hidden" href="/">
                            <Image
                                width={32}
                                height={32}
                                src={"/images/logo/logo-icon.svg"}
                                alt="Logo"
                            />
                        </Link>
                    </div>

                    <div className="hidden sm:block">

                    </div>
                    <div className="flex items-center gap-3 2xsm:gap-7">
                        <ul className="flex items-center gap-2 2xsm:gap-4">
                            <DarkModeSwitcher />
                        </ul>
                        <DropdownUser />
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
