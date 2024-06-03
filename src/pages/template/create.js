'use client' // only in App Router
import React, { useState, useEffect, useRef } from "react";
import Link from 'next/link';
import DefaultLayout from "@ft/ui-components/admin/Layouts/DefaultLayout";
import Breadcrumb from '@ft/ui-components/admin/breadcrumb';
import Alert from "@ft/ui-components/admin/Alert";
import { fetchData } from '@ft/services/apiService';
import { useRouter } from "next/router";
import { useSearchParams } from 'next/navigation'
import AddTemplateForm from '@ft/ui-components/admin/AddTemplateForm';

export default function CreateTemplate() {
    const [formData, setFormData] = useState({
        id: '',
        subject: '',
        template: '<p><br data-cke-filler="true"></p><p><br data-cke-filler="true"></p><p><br data-cke-filler="true"></p><p><br data-cke-filler="true"></p><p><br data-cke-filler="true"></p><p><br data-cke-filler="true"></p><p><br data-cke-filler="true"></p><p><br data-cke-filler="true"></p><p><br data-cke-filler="true"></p><p>Thanks for your time.</p><p><br data-cke-filler="true"></p><p>&nbsp;Cheers,</p><p>&nbsp;{{senderName}}</p>',
        status: 1
    });
    const [message, setMessage] = useState({ msg: '', type: '' });
    const [pageName, setPageName] = useState('Add Template');
    const router = useRouter();
    const searchParams = useSearchParams()
    useEffect(() => {
        const templateId = searchParams.get('templateId')
        if (templateId) {
            setPageName('Update Template')
            gettemplates(templateId);
        }
    }, [searchParams]);

    const gettemplates = (templateId) => {
        fetchData(`/api/v1/templates?c_id=${templateId}`, 'GET').then((res) => {
            if (res.status === 'success' && res?.data && Array.isArray(res.data) && res.data.length && res.data[0]) {
                formData.id = res.data[0].id;
                formData.subject = res.data[0].subject;
                dataChange(res.data[0].template);
            } else {
                setMessage({ msg: 'Failed to get templates please try again', type: 'error' });
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

    const saveContact = () => {
        if (formData.subject && formData.subject !== '' && formData.template && formData.template !== '' && formData.status && formData.status !== '') {
            const postData = {
                id: formData.id,
                subject: formData.subject,
                template: formData.template,
                status: formData.status,
            };
            fetchData('/api/v1/templates', 'POST', postData).then((res) => {
                if (res.status === 'success') {
                    router.push({ pathname: '/templates/', query: { status: 'success' } });
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
                <Breadcrumb pageName={pageName} />
                <div className="grid grid-cols-1">
                    <div className="flex flex-col gap-9">
                        <div className="rounded-sm border border-stroke bg-white shadow-default dark:border-strokedark dark:bg-boxdark">
                            <div className="flex flex-col-reverse justify-between gap-6 py-4.5 pl-4 pr-4 sm:flex-row lg:pl-10 lg:pr-7.5 border-b border-stroke">
                                <div className="flex items-center gap-4">
                                    <h3 className="font-medium text-black dark:text-white">
                                        {pageName}
                                    </h3>

                                </div>
                                <div className="relative">
                                    <Link href="/templates" className={`flex rounded-md bg-primary px-5.5 py-2.5 font-medium text-white`}>
                                        Back
                                    </Link>
                                </div>
                            </div>
                            <Alert message={message} setMessage={setMessage} />
                            <div className="p-6.5">
                                <AddTemplateForm handleChange={handleChange} formData={formData} dataChange={dataChange} />
                                <div className="flex justify-end gap-4.5">
                                    <button className="flex justify-center rounded bg-primary px-6 py-2 font-medium text-gray hover:bg-opacity-90" onClick={saveContact}>
                                        Save
                                    </button>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </DefaultLayout>
    );
}
