import { useState } from "react";
import Link from 'next/link';
import DefaultLayout from "@ft/ui-components/admin/Layouts/DefaultLayout";
import Breadcrumb from '@ft/ui-components/admin/breadcrumb'
import Alert from "@ft/ui-components/admin/Alert";
import { fetchData } from '@ft/services/apiService';
import { useRouter } from "next/router";

export default function Subscription() {
    const [message, setMessage] = useState({ msg: '', type: '' });
    const [formData, setFormData] = useState({
        name: '',
        b1_value: '',
        b2_value: '',
        b3_value: '',
        status: 1
    });
    const router = useRouter();
    const handleChange = (e) => {
        const formDataTemp = { ...formData }
        formDataTemp[e.target.name] = e.target.value;
        setFormData(formDataTemp)
    }
    const createFeature = () => {
        if ((formData.name && formData.name !== '') || (formData.b1_value && formData.b1_value !== '') || (formData.b2_value && formData.b2_value !== '') || (formData.b3_value && formData.b3_value !== '')) {
            const postData = {
                name: formData.name,
                b1_value: formData.b1_value,
                b2_value: formData.b2_value,
                b3_value: formData.b3_value,
                status: formData.status,
            };
            setMessage({ msg: '', type: '' });
            fetchData('/api/v1/sequences', 'POST', postData).then((res) => {
                if (res.status === 'success') {
                    console.log(res)
                    setMessage({ msg: 'Sequence created successfully!', type: 'success' });
                    setTimeout(() => {
                        router.push({ pathname: `/sequences/view/${res?.data['insertId']}`, query: { status: 'success' } });
                    }, 1000)
                } else {
                    setMessage({ msg: 'Please fill all required fields', type: 'error' });
                }
            });
        } else {
            setMessage({ msg: 'Please fill all required fields', type: 'error' });
        }
    }
    return (
        <DefaultLayout>
            <div className="mx-auto max-w-screen-2xl p-4 md:p-6 2xl:p-10">
                <Breadcrumb pageName="Subscription" />
                <div className="flex flex-col-reverse justify-end gap-6 py-4.5 pl-4 pr-4 sm:flex-row lg:pl-10 lg:pr-7.5">
                    <Link href="/subscriptions" className={`flex rounded-md bg-primary px-5.5 py-2.5 font-medium text-white`}>
                        Back
                    </Link>
                </div>
                <div className="p-6.5 min-w-80 min-w-52">
                    {message.msg ? <Alert message={message} setMessage={setMessage} /> : null}
                    <div className="mb-5.5">
                        <label className="mb-3 block text-sm font-medium text-black dark:text-white" htmlFor="name">Name</label>
                        <input
                            className="w-full rounded border border-stroke bg-gray py-3 pr-4.5 text-black focus:border-primary focus-visible:outline-none dark:border-strokedark dark:bg-meta-4 dark:text-white dark:focus:border-primary"
                            type="text"
                            name="name"
                            placeholder="Name"
                            onChange={handleChange}
                            value={formData.name}
                        />
                    </div>
                    <div className="mb-5.5">
                        <label className="mb-3 block text-sm font-medium text-black dark:text-white" htmlFor="b1_value"> B1 value</label>
                        <input
                            className="w-full rounded border border-stroke bg-gray py-3 pr-4.5 text-black focus:border-primary focus-visible:outline-none dark:border-strokedark dark:bg-meta-4 dark:text-white dark:focus:border-primary"
                            type="text"
                            name="b1_value"
                            placeholder="B1 value"
                            onChange={handleChange}
                            value={formData.b1_value}
                        />
                    </div>
                    <div className="mb-5.5">
                        <label className="mb-3 block text-sm font-medium text-black dark:text-white" htmlFor="b2_value"> B1 value</label>
                        <input
                            className="w-full rounded border border-stroke bg-gray py-3 pr-4.5 text-black focus:border-primary focus-visible:outline-none dark:border-strokedark dark:bg-meta-4 dark:text-white dark:focus:border-primary"
                            type="text"
                            name="b2_value"
                            placeholder="B2 value"
                            onChange={handleChange}
                            value={formData.b2_value}
                        />
                    </div>
                    <div className="mb-5.5">
                        <label className="mb-3 block text-sm font-medium text-black dark:text-white" htmlFor="b3_value"> B1 value</label>
                        <input
                            className="w-full rounded border border-stroke bg-gray py-3 pr-4.5 text-black focus:border-primary focus-visible:outline-none dark:border-strokedark dark:bg-meta-4 dark:text-white dark:focus:border-primary"
                            type="text"
                            name="b3_value"
                            placeholder=" B3 value"
                            onChange={handleChange}
                            value={formData.b3_value}
                        />
                    </div>
                </div>
            </div>
        </DefaultLayout>
    );
}
