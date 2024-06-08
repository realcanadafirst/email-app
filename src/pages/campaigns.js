import { useState, useEffect } from "react";
import Link from 'next/link';
import DefaultLayout from "@ft/ui-components/admin/Layouts/DefaultLayout";
import Breadcrumb from '@ft/ui-components/admin/breadcrumb';
import TableCampaigns from '@ft/ui-components/admin/TableCampaigns';
import { fetchData } from '@ft/services/apiService';
export default function Campaign() {
    const [message, setMessage] = useState({ msg: '', type: '' });
    const [campaigns, setCampaigns] = useState(null);
    useEffect(() => {
        getCampaigns();
    }, []);
    const getCampaigns = () => {
        fetchData('/api/v1/campaigns', 'GET').then((res) => {
            if (res.status === 'success') {
                setCampaigns(res.data)
            } else {
                setCampaigns([]);
                setMessage({ msg: 'Failed to get campaigns please try again', type: 'error' });
            }
        });
    }
    return (
        <DefaultLayout>
            <div className="mx-auto max-w-screen-2xl p-4 md:p-6 2xl:p-10">
                <Breadcrumb pageName="Campaigns" />
                <div className="flex flex-col-reverse justify-end gap-6 py-4.5 pl-4 pr-4 sm:flex-row lg:pl-10 lg:pr-7.5">
                    <Link href="/campaigns/create" className={`flex rounded-md bg-primary px-5.5 py-2.5 font-medium text-white`}>
                        Create
                    </Link>
                </div>
                <TableCampaigns campaigns={campaigns} />
            </div>
        </DefaultLayout>
    );
}
