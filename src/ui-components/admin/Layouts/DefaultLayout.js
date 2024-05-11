"use client";
import React, { useState, useEffect } from "react";
import Sidebar from "@ft/ui-components/admin/Layouts/Sidebar";
import Header from "@ft/ui-components/admin/Layouts/Header";
import { useRouter } from 'next/router';
export default function DefaultLayout({ children }) {
    const [sidebarOpen, setSidebarOpen] = useState(false);
    const router = useRouter();
    return (
        <>
            <div className="flex h-screen overflow-hidden">
                <Sidebar sidebarOpen={sidebarOpen} setSidebarOpen={setSidebarOpen} />
                <div className="relative flex flex-1 flex-col overflow-y-auto overflow-x-hidden">
                    <Header sidebarOpen={sidebarOpen} setSidebarOpen={setSidebarOpen} />
                    <main>
                        {children}
                    </main>
                </div>
            </div>
        </>
    );
}
