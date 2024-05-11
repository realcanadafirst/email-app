'use client'
import React from 'react';
import Link from 'next/link';
import DropdownUser from '@ft/ui-components/admin/header/DropdownUser';
import Image from "next/image";

const Header = () => {
    return (
        <header className="sticky top-0 z-999 flex w-full bg-white drop-shadow-1 dark:bg-boxdark dark:drop-shadow-none">
            <div className="flex flex-grow items-center justify-between px-4 py-4 shadow-2 md:px-6 2xl:px-11">
                <div className="flex items-center gap-2 sm:gap-4 ">
                    <Link className="block flex-shrink-0" href="/">
                        <Image src={"/images/logo-no-background.png"} alt="Logo" />
                    </Link>
                </div>
                <div className="flex items-center gap-3 2xsm:gap-7">
                    <DropdownUser />
                </div>
            </div>
        </header>
    );
}

export default Header