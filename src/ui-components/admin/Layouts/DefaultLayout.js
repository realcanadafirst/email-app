"use client";
import React, { useState, useEffect } from "react";
import Sidebar from "@ft/ui-components/admin/Layouts/Sidebar";
import Header from "@ft/ui-components/admin/Layouts/Header";
import { useRouter } from 'next/router';
export default function DefaultLayout({ children }) {
    const [sidebarOpen, setSidebarOpen] = useState(false);
    const router = useRouter();
    const [isAuthenticated, setIsAuthenticated] = useState(false)
    const [userData, setUserData] = useState({})
    useEffect(() => {
        if (localStorage.getItem('userData')) {
            setIsAuthenticated(true);
            setUserData(JSON.parse(localStorage.getItem('userData')))
        } else {
            setIsAuthenticated(false);
            router.push('/')
        }
    }, [])
    return (
        <>
            <div className="flex h-screen overflow-hidden text-black dark:text-white">
                {isAuthenticated ? <Sidebar sidebarOpen={sidebarOpen} setSidebarOpen={setSidebarOpen} isAuthenticated={isAuthenticated} usertype={userData.type} /> : null}
                <div className="relative flex flex-1 flex-col overflow-y-auto overflow-x-hidden">
                    <Header sidebarOpen={sidebarOpen} setSidebarOpen={setSidebarOpen} isAuthenticated={isAuthenticated} />
                    <main>
                        {children}
                    </main>
                </div>
            </div>
        </>
    );
}
