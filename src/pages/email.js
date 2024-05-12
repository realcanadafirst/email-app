import { useState, useEffect } from "react";
import Link from 'next/link';
import DefaultLayout from "@ft/ui-components/admin/Layouts/DefaultLayout";
import Breadcrumb from '@ft/ui-components/admin/breadcrumb';
import TableEmails from '@ft/ui-components/admin/TableEmails';
import { fetchData } from '@ft/services/apiService';
import { useRouter } from "next/router";
export default function Email() {
    const [message, setMessage] = useState({ msg: '', type: '' });
    const [emails, setEmails] = useState(null);
    useEffect(() => {
        getEmails();
    }, []);
    const getEmails = () => {
        fetchData('/api/v1/emails', 'GET').then((res) => {
            if (res.status === 'success') {
                setEmails(res.data)
            } else {
                setEmails([]);
                setMessage({ msg: 'Failed to get emails please try again', type: 'error' });
            }
        });
    }
    return (
        <DefaultLayout>
            <div className="mx-auto max-w-screen-2xl p-4 md:p-6 2xl:p-10">
                <div className="mx-auto max-w-270">
                    <Breadcrumb pageName="Emails" />
                    <div className="flex flex-col-reverse justify-end gap-6 py-4.5 pl-4 pr-4 sm:flex-row lg:pl-10 lg:pr-7.5">
                        <Link href="/email/compose" className={`flex rounded-md bg-primary px-5.5 py-2.5 font-medium text-white`}>
                            Compose
                        </Link>
                    </div>
                    <TableEmails emails={emails} />
                </div>
            </div>
        </DefaultLayout>
    );
}
