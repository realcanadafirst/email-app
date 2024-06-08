import { useState, useEffect } from "react";
import DefaultLayout from "@ft/ui-components/admin/Layouts/DefaultLayout";
import Loader from "@ft/ui-components/admin/Loader";
import { fetchData } from '@ft/services/apiService';
import { useRouter } from "next/router";

export default function InitSetup() {
    const [message, setMessage] = useState({ msg: '', type: '' });
    const router = useRouter();
    useEffect(() => {
        getInitSetup();
    }, []);
    const getInitSetup = () => {
        fetchData(`/api/v1/initsetup`, 'POST').then((res) => {
            if (res.status === 'success' && res?.data?.length) {
                router.push({ pathname: '/' });
            } else {
                setMessage({ msg: 'Failed to setup account, Please try again', type: 'error' });
            }
        });
    }
    return (
        <DefaultLayout>
            <Loader />
        </DefaultLayout>
    );
}
