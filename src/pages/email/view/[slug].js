import React, { useState, useEffect, useRef } from "react";
import Link from 'next/link';
import DefaultLayout from "@ft/ui-components/admin/Layouts/DefaultLayout";
import Breadcrumb from '@ft/ui-components/admin/breadcrumb';
import { useRouter } from "next/router";
import Alert from "@ft/ui-components/admin/Alert";
import { fetchData } from '@ft/services/apiService';
import AddTemplateForm from '@ft/ui-components/admin/AddTemplateForm';

export default function ViewEmail() {
    const [formData, setFormData] = useState({
        mail_from: '',
        receivers: '',
        subject: '',
        template: ''
    });
    const [message, setMessage] = useState({ msg: '', type: '' });
    const router = useRouter();
    const { slug } = router.query;
    useEffect(() => {
        if (slug) {
            getEmails();
        }
    }, [slug]);
    const getEmails = () => {
        fetchData(`/api/v1/emails?e_id=${slug}`, 'GET').then((res) => {
            if (res.status === 'success' && res.data && res.data[0]) {
                const datat = res.data[0];
                const receiver = datat.prospects.map((val) => {
                    const receiver_data = JSON.parse(val.receiver_data)
                    return receiver_data.label
                })
                setFormData({
                    mail_from: datat['mail_from'],
                    receivers: JSON.stringify(receiver),
                    subject: datat['subject'],
                    template: datat['template']
                })
            } else {
                setMessage({ msg: 'Failed to get prospects please try again', type: 'error' });
            }
        });
    }

    const handleChange = (e) => {
        const formDataTemp = { ...formData }
        formDataTemp[e.target.name] = e.target.value;
        setFormData(formDataTemp)
    }
    const dataChange = (data) => {
        const formDataTemp = { ...formData };
        formDataTemp.template = data;
        setFormData(formDataTemp);
    }
    return (
        <DefaultLayout>
            <div className="mx-auto max-w-screen-2xl p-4 md:p-6 2xl:p-10">
                <Breadcrumb pageName="View  Email" />
                <div className="grid grid-cols-1">
                    <div className="flex flex-col gap-9">
                        <div className="rounded-sm border border-stroke bg-white shadow-default dark:border-strokedark dark:bg-boxdark">
                            <div className="flex flex-col-reverse justify-between gap-6 py-4.5 pl-4 pr-4 sm:flex-row lg:pl-10 lg:pr-7.5 border-b border-stroke">
                                <div className="flex items-center gap-4">
                                    <h3 className="font-medium text-black dark:text-white">
                                        View Email
                                    </h3>
                                </div>
                                <div className="relative">
                                    <Link href="/email" className={`flex rounded-md bg-primary px-5.5 py-2.5 font-medium text-white`}>
                                        Back
                                    </Link>
                                </div>
                            </div>
                            {message.msg ? <Alert message={message} setMessage={setMessage} /> : null}
                            <div className="p-6.5">
                                <div className="mb-4.5">
                                    <label className="mb-3 block text-sm font-medium text-black dark:text-white">From <span className="text-meta-1">*</span></label>
                                    <input
                                        type="email"
                                        placeholder="from email"
                                        className="w-full rounded border-[1.5px] border-stroke bg-transparent px-5 py-3 text-black outline-none transition focus:border-primary active:border-primary disabled:cursor-default disabled:bg-whiter dark:border-form-strokedark dark:bg-form-input dark:text-white dark:focus:border-primary"
                                        name="mail_from"
                                        readOnly
                                        value={formData.mail_from}
                                    />
                                </div>
                                <div className="mb-4.5">
                                    <label className="mb-3 block text-sm font-medium text-black dark:text-white">Receivers <span className="text-meta-1">*</span></label>
                                    <input
                                        type="receivers"
                                        placeholder="receivers"
                                        className="w-full rounded border-[1.5px] border-stroke bg-transparent px-5 py-3 text-black outline-none transition focus:border-primary active:border-primary disabled:cursor-default disabled:bg-whiter dark:border-form-strokedark dark:bg-form-input dark:text-white dark:focus:border-primary"
                                        name="receivers"
                                        readOnly
                                        value={formData.receivers}
                                    />
                                </div>
                                <AddTemplateForm handleChange={handleChange} formData={formData} dataChange={dataChange} />
                            </div>
                        </div>
                    </div>
                </div>

            </div>
        </DefaultLayout>
    );
}
