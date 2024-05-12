import React, { useState, useEffect, useRef } from "react";
import Link from 'next/link';
import DefaultLayout from "@ft/ui-components/admin/Layouts/DefaultLayout";
import Breadcrumb from '@ft/ui-components/admin/breadcrumb';
import { useRouter } from "next/router";
import Alert from "@ft/ui-components/admin/Alert";
import Select from 'react-select';
import { fetchData } from '@ft/services/apiService';
import AddTemplateForm from '@ft/ui-components/admin/AddTemplateForm';

export default function ComposeEmail() {

    const [prospects, setProspects] = useState([]);
    const [selectedOptions, setSelectedOptions] = useState([]);
    const [formData, setFormData] = useState({
        mail_from: 'devops.mailbox1@gmail.com',
        receivers: '',
        subject: '',
        template: ''
    });
    const [message, setMessage] = useState({ msg: '', type: '' });
    const router = useRouter();
    useEffect(() => {
        getProspects();
    }, []);
    const getProspects = () => {
        fetchData(`/api/v1/prospects`, 'GET').then((res) => {
            if (res.status === 'success') {
                const options_t = res.data;
                const options_temp = options_t.map((val) => { return { value: val.id, label: val.email, firstName: val.firstName } });
                setProspects([...options_temp]);
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
    const sendMail = () => {
        if (formData.mail_from && formData.mail_from !== '' && selectedOptions && selectedOptions.length && formData.template && formData.template !== '' && formData.subject && formData.subject !== '') {
            const postData = {
                mail_from: formData.mail_from,
                receivers: JSON.stringify(selectedOptions),
                subject: formData.subject,
                template: formData.template,
            };
            setMessage({ msg: '', type: '' });
            fetchData('/api/v1/emails', 'POST', postData).then((res) => {
                if (res.status === 'success') {
                    console.log(res)
                    setMessage({ msg: 'Email created successfully!', type: 'success' });
                    setTimeout(()=>{
                      router.push({ pathname: `/email`, query: { status: 'success' } });
                    },1000)
                } else {
                    setMessage({ msg: 'Please fill all required fields', type: 'error' });
                }
            });
        } else {
            setMessage({ msg: 'Please fill all required fields.', type: 'error' });
        }
    }
    const handleMultiSelectProspects = (selectedOptions) => setSelectedOptions(selectedOptions);
    console.log(message)
    return (
        <DefaultLayout>
            <div className="mx-auto max-w-screen-2xl p-4 md:p-6 2xl:p-10">
                <div className="mx-auto max-w-270">
                    <Breadcrumb pageName="Send Email" />
                    <div className="grid grid-cols-1">
                        <div className="flex flex-col gap-9">
                            <div className="rounded-sm border border-stroke bg-white shadow-default dark:border-strokedark dark:bg-boxdark">
                                <div className="flex flex-col-reverse justify-between gap-6 py-4.5 pl-4 pr-4 sm:flex-row lg:pl-10 lg:pr-7.5 border-b border-stroke">
                                    <div className="flex items-center gap-4">
                                        <h3 className="font-medium text-black dark:text-white">
                                            Send Email
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
                                            onChange={handleChange}
                                            value={formData.mail_from}
                                        />
                                    </div>
                                    <div className="mb-4.5">
                                        <label className="mb-3 block text-sm font-medium text-black dark:text-white">Receivers <span className="text-meta-1">*</span></label>
                                        <Select
                                            isMulti
                                            options={prospects}
                                            value={selectedOptions}
                                            onChange={handleMultiSelectProspects}
                                        />
                                    </div>
                                    <AddTemplateForm handleChange={handleChange} formData={formData} dataChange={dataChange} />

                                    <button className="flex w-full justify-center rounded bg-primary p-3 font-medium text-gray hover:bg-opacity-90" onClick={sendMail}>
                                        Send
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
