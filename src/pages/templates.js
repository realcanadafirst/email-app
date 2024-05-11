import { useState } from "react";
import Link from 'next/link';
import DefaultLayout from "@ft/ui-components/admin/Layouts/DefaultLayout";
import Breadcrumb from '@ft/ui-components/admin/breadcrumb';
import TableTemplate from '@ft/ui-components/admin/TableTemplate';
import Alert from "@ft/ui-components/admin/Alert";
export default function Templates() {
    const [message, setMessage] = useState({ msg: '', type: '' });
    return (
        <DefaultLayout>
            <div className="mx-auto max-w-screen-2xl p-4 md:p-6 2xl:p-10">
                <div className="mx-auto max-w-270">
                    <Breadcrumb pageName="Templates" />
                    <div className="flex flex-col-reverse justify-end gap-6 py-4.5 pl-4 pr-4 sm:flex-row lg:pl-10 lg:pr-7.5">
                        <Link href="/template/create" className={`flex rounded-md bg-primary px-5.5 py-2.5 font-medium text-white`}>
                            Add Template
                        </Link>
                    </div>
                    <Alert message={message} setMessage={setMessage} />
                    <TableTemplate setMessage={setMessage} />
                </div>
            </div>
        </DefaultLayout>
    );
}