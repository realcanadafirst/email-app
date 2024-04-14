"use client";
import React, { useState, useEffect } from "react";
import Header from "@ft/ui-components/admin/Layouts/Header";
export default function GuestLayout({ children }) {
    const [sidebarOpen, setSidebarOpen] = useState(false);   

    return (
        <>
            <div className="flex h-screen overflow-hidden">
                <div className="relative flex flex-1 flex-col overflow-y-auto overflow-x-hidden">
                    <Header sidebarOpen={sidebarOpen} setSidebarOpen={setSidebarOpen} />
                    <main>
                        <div className="mx-auto max-w-screen-2xl p-4 md:p-6 2xl:p-10">
                            {children}
                        </div>
                    </main>
                </div>
            </div>
        </>
    );


}
