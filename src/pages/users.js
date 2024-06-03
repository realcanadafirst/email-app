import { useState } from "react";
import Link from 'next/link';
import DefaultLayout from "@ft/ui-components/admin/Layouts/DefaultLayout";
import Breadcrumb from '@ft/ui-components/admin/breadcrumb';
import TableUsers from '@ft/ui-components/admin/TableUsers';
import Alert from "@ft/ui-components/admin/Alert";
export default function Users() {
    const [message, setMessage] = useState({ msg: '', type: '' });
    return (
        <DefaultLayout>
            <div className="mx-auto max-w-screen-2xl p-4 md:p-6 2xl:p-10">
                <Breadcrumb pageName="Users" />
                {message.msg && <Alert message={message} setMessage={setMessage} />}
                <TableUsers setMessage={setMessage} />
            </div>
        </DefaultLayout>
    );
}
