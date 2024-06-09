"use client";
import React, { useEffect, useRef, useState } from "react";
import { usePathname } from "next/navigation";
import Link from "next/link";
import Image from "next/image";
import DashboardIcon from "@ft/ui-components/ions/DashboardIcon";
import UserIcon from "@ft/ui-components/ions/UserIcon";
import SequenceIcon from "@ft/ui-components/ions/SequenceIcon";
import TemplateIcon from "@ft/ui-components/ions/TemplateIcon";
import EmailIcon from "@ft/ui-components/ions/EmailIcon";
import SettingIcon from "@ft/ui-components/ions/SettingIcon";
import InvoiceIcon from "@ft/ui-components/ions/InvoiceIcon";
import CampaignIcon from "@ft/ui-components/ions/CampaignIcon";


const Sidebar = ({ sidebarOpen, setSidebarOpen, usertype = '2' }) => {
    const pathname = usePathname();
    const trigger = useRef(null);
    const sidebar = useRef(null);
    let storedSidebarExpanded = "true";
    const [sidebarExpanded, setSidebarExpanded] = useState(storedSidebarExpanded === null ? false : storedSidebarExpanded === "true");
    // close on click outside
    useEffect(() => {
        const clickHandler = ({ target }) => {
            if (!sidebar.current || !trigger.current) return;
            if (
                !sidebarOpen ||
                sidebar.current.contains(target) ||
                trigger.current.contains(target)
            )
                return;
            setSidebarOpen(false);
        };
        document.addEventListener("click", clickHandler);
        return () => document.removeEventListener("click", clickHandler);
    });
    useEffect(() => {
        const keyHandler = ({ key }) => {
            if (!sidebarOpen || key !== "Escape") return;
            setSidebarOpen(false);
        };
        document.addEventListener("keydown", keyHandler);
        return () => document.removeEventListener("keydown", keyHandler);
    });

    useEffect(() => {
        localStorage.setItem("sidebar-expanded", sidebarExpanded.toString());
        if (sidebarExpanded) {
            document.querySelector("body")?.classList.add("sidebar-expanded");
        } else {
            document.querySelector("body")?.classList.remove("sidebar-expanded");
        }
    }, [sidebarExpanded]);

    return (
        <aside
            ref={sidebar}
            className={`absolute left-0 top-0 z-9999 flex h-screen w-72.5 flex-col overflow-y-hidden bg-black duration-300 ease-linear dark:bg-boxdark lg:static lg:translate-x-0 ${sidebarOpen ? "translate-x-0" : "-translate-x-full"
                }`}
        >
            <div className="flex items-center justify-between gap-2 px-6 py-5.5 lg:py-6.5">
                <Link href="/">
                    <Image
                        width={176}
                        height={32}
                        src={"/images/logo-no-background.png"}
                        alt="Logo"
                        priority
                    />
                </Link>
                <button
                    ref={trigger}
                    onClick={() => setSidebarOpen(!sidebarOpen)}
                    aria-controls="sidebar"
                    aria-expanded={sidebarOpen}
                    className="block lg:hidden"
                >
                    <svg
                        className="fill-current"
                        width="20"
                        height="18"
                        viewBox="0 0 20 18"
                        fill="none"
                        xmlns="http://www.w3.org/2000/svg"
                    >
                        <path
                            d="M19 8.175H2.98748L9.36248 1.6875C9.69998 1.35 9.69998 0.825 9.36248 0.4875C9.02498 0.15 8.49998 0.15 8.16248 0.4875L0.399976 8.3625C0.0624756 8.7 0.0624756 9.225 0.399976 9.5625L8.16248 17.4375C8.31248 17.5875 8.53748 17.7 8.76248 17.7C8.98748 17.7 9.17498 17.625 9.36248 17.475C9.69998 17.1375 9.69998 16.6125 9.36248 16.275L3.02498 9.8625H19C19.45 9.8625 19.825 9.4875 19.825 9.0375C19.825 8.55 19.45 8.175 19 8.175Z"
                            fill=""
                        />
                    </svg>
                </button>
            </div>

            <div className="no-scrollbar flex flex-col overflow-y-auto duration-300 ease-linear">
                <nav className="mt-5 px-4 py-4 lg:mt-9 lg:px-6">
                    <div>
                        <h3 className="mb-4 ml-4 text-sm font-semibold text-bodydark2"> MENU </h3>
                        <ul className="mb-6 flex flex-col gap-1.5">
                            <li>
                                <Link
                                    href="/prospects"
                                    className={`group relative flex items-center gap-2.5 rounded-sm px-4 py-2 font-medium text-bodydark1 duration-300 ease-in-out hover:bg-graydark dark:hover:bg-meta-4 ${pathname?.includes("prospects") && "bg-graydark dark:bg-meta-4"
                                        }`}
                                >
                                    <UserIcon />
                                    Prospects
                                </Link>
                            </li>
                            <li>
                                <Link
                                    href="/campaigns"
                                    className={`group relative flex items-center gap-2.5 rounded-sm px-4 py-2 font-medium text-bodydark1 duration-300 ease-in-out hover:bg-graydark dark:hover:bg-meta-4 ${pathname?.includes("campaigns") && "bg-graydark dark:bg-meta-4"
                                        }`}
                                >
                                    <CampaignIcon />
                                    Campaign
                                </Link>
                            </li>
                            <li>
                                <Link
                                    href="/sequences"
                                    className={`group relative flex items-center gap-2.5 rounded-sm px-4 py-2 font-medium text-bodydark1 duration-300 ease-in-out hover:bg-graydark dark:hover:bg-meta-4 ${pathname?.includes("sequences") && "bg-graydark dark:bg-meta-4"
                                        }`}
                                >
                                    <SequenceIcon />
                                    Sequences
                                </Link>
                            </li>
                            <li>
                                <Link
                                    href="/templates"
                                    className={`group relative flex items-center gap-2.5 rounded-sm px-4 py-2 font-medium text-bodydark1 duration-300 ease-in-out hover:bg-graydark dark:hover:bg-meta-4 ${pathname?.includes("templates") && "bg-graydark dark:bg-meta-4"
                                        }`}
                                >
                                    <TemplateIcon />
                                    Templates
                                </Link>
                            </li>
                            <li>
                                <Link
                                    href="/email"
                                    className={`group relative flex items-center gap-2.5 rounded-sm px-4 py-2 font-medium text-bodydark1 duration-300 ease-in-out hover:bg-graydark dark:hover:bg-meta-4 ${pathname?.includes("email") && "bg-graydark dark:bg-meta-4"
                                        }`}
                                >
                                    <EmailIcon />
                                    Email
                                </Link>
                            </li>
                            <li>
                                <Link
                                    href="/subscriptions"
                                    className={`group relative flex items-center gap-2.5 rounded-sm px-4 py-2 font-medium text-bodydark1 duration-300 ease-in-out hover:bg-graydark dark:hover:bg-meta-4 ${pathname?.includes("subscriptions") && "bg-graydark dark:bg-meta-4"
                                        }`}
                                >
                                    <InvoiceIcon />
                                    Subscriptions
                                </Link>
                            </li>
                            {usertype === '1' ? <li>
                                <Link
                                    href="/users"
                                    className={`group relative flex items-center gap-2.5 rounded-sm px-4 py-2 font-medium text-bodydark1 duration-300 ease-in-out hover:bg-graydark dark:hover:bg-meta-4 ${pathname?.includes("users") && "bg-graydark dark:bg-meta-4"
                                        }`}
                                >
                                    <UserIcon />
                                    Users
                                </Link>
                            </li> : null}
                            <li>
                                <Link
                                    href="/setting"
                                    className={`group relative flex items-center gap-2.5 rounded-sm px-4 py-2 font-medium text-bodydark1 duration-300 ease-in-out hover:bg-graydark dark:hover:bg-meta-4 ${pathname?.includes("setting") && "bg-graydark dark:bg-meta-4"
                                        }`}
                                >
                                    <SettingIcon />
                                    Setting
                                </Link>
                            </li>
                        </ul>
                    </div>
                </nav>
            </div>
        </aside>
    );
};

export default Sidebar;
