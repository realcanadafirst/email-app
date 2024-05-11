import React, { useState, useEffect, useRef } from "react";
import Link from 'next/link';
import DefaultLayout from "@ft/ui-components/admin/Layouts/DefaultLayout";
import Breadcrumb from '@ft/ui-components/admin/breadcrumb';
import Alert from "@ft/ui-components/admin/Alert";
import { fetchData } from '@ft/services/apiService';
import { useRouter } from "next/router";

export default function CreateContact() {
    const [formData, setFormData] = useState({
        firstName: '',
        lastName: '',
        email: '',
        phoneNumber: '',
        organization_name: '',
        status: 1
    });
    const [message, setMessage] = useState({ msg: '', type: '' });
    const [file, setFile] = useState(null);
    const handleFileChange = (event) => {
        const uploadedFile = event.target.files[0];
        setFile(uploadedFile);
    };
    const router = useRouter();
    const handleChange = (e) => {
        const formDataTemp = { ...formData }
        formDataTemp[e.target.name] = e.target.value;
        setFormData(formDataTemp)
    }

    const saveContact = () => {
        if (formData.firstName && formData.firstName !== '' && formData.lastName && formData.lastName !== '' && formData.email && formData.email !== '' && formData.phoneNumber && formData.phoneNumber !== '' && formData.status && formData.status !== '') {
            const postData = {
                firstName: formData.firstName,
                lastName: formData.lastName,
                email: formData.email,
                phoneNumber: formData.phoneNumber,
                status: formData.status,
                organization_name: formData.organization_name
            };
            setMessage({ msg: '', type: '' });
            fetchData('/api/v1/prospects', 'POST', postData).then((res) => {
                if (res.status === 'success') {
                    router.push({ pathname: '/prospects/', query: { status: 'success' } });
                } else if(res.data){
                    setMessage({ msg: res.data, type: 'error' });
                } else {
                    setMessage({ msg: 'Please fill all required fields', type: 'error' });
                }
            });
        } else {
            setMessage({ msg: 'Please fill all required fields', type: 'error' });
        }
    }

    const handleSubmit = async (event) => {
        event.preventDefault();
        const formData = new FormData();
        formData.append('file', file);
        formData.append('actionType', 'contact');
        fetchData('/api/v1/uploads', 'POST', formData, true).then((res) => {
            if (res.status === 'success') {
                router.push({ pathname: '/prospects/', query: { status: 'success' } });
            } else {
                setMessage({ msg: 'Please choose valid file', type: 'error' });
            }
        });
    };

    return (
        <DefaultLayout>
            <div className="mx-auto max-w-screen-2xl p-4 md:p-6 2xl:p-10">
                <div className="mx-auto max-w-270">
                    <Breadcrumb pageName="Add Prospects" />

                    <div className="grid grid-cols-1">
                        <div className="flex flex-col gap-9">
                            <div className="rounded-sm border border-stroke bg-white shadow-default dark:border-strokedark dark:bg-boxdark">
                                <div className="flex flex-col-reverse justify-between gap-6 py-4.5 pl-4 pr-4 sm:flex-row lg:pl-10 lg:pr-7.5 border-b border-stroke">
                                    <div className="flex items-center gap-4">
                                        <h3 className="font-medium text-black dark:text-white">
                                            Add Prospects
                                        </h3>

                                    </div>
                                    <div className="relative">
                                        <Link href="/prospects" className={`flex rounded-md bg-primary px-5.5 py-2.5 font-medium text-white`}>
                                            Back
                                        </Link>
                                    </div>
                                </div>
                                <Alert message={message} setMessage={setMessage} />
                                <div className="p-6.5">
                                    <div className="mb-5.5 flex flex-col gap-5.5 sm:flex-row">
                                        <div className="w-full sm:w-1/2">
                                            <label className="mb-3 block text-sm font-medium text-black dark:text-white" htmlFor="firstName">
                                                First Name
                                            </label>
                                            <div className="relative">
                                                <input
                                                    placeholder="Enter First Name"
                                                    className="w-full rounded border border-stroke bg-gray py-3 pr-4.5 text-black focus:border-primary focus-visible:outline-none dark:border-strokedark dark:bg-meta-4 dark:text-white dark:focus:border-primary"
                                                    type="text"
                                                    name="firstName"
                                                    onChange={handleChange}
                                                    value={formData.firstName}
                                                />
                                            </div>
                                        </div>
                                        <div className="w-full sm:w-1/2">
                                            <label className="mb-3 block text-sm font-medium text-black dark:text-white" htmlFor="lastName">
                                                Last Name
                                            </label>
                                            <div className="relative">
                                                <input
                                                    placeholder="Enter Last Name"
                                                    className="w-full rounded border border-stroke bg-gray py-3 pr-4.5 text-black focus:border-primary focus-visible:outline-none dark:border-strokedark dark:bg-meta-4 dark:text-white dark:focus:border-primary"
                                                    type="text"
                                                    name="lastName"
                                                    onChange={handleChange}
                                                    value={formData.lastName}
                                                />
                                            </div>
                                        </div>
                                    </div>

                                    <div className="mb-5.5 flex flex-col gap-5.5 sm:flex-row">
                                        <div className="w-full sm:w-1/2">
                                            <label className="mb-3 block text-sm font-medium text-black dark:text-white" htmlFor="phoneNumber">
                                                Phone Number
                                            </label>
                                            <input
                                                className="w-full rounded border border-stroke bg-gray py-3 pr-4.5 text-black focus:border-primary focus-visible:outline-none dark:border-strokedark dark:bg-meta-4 dark:text-white dark:focus:border-primary"
                                                type="text"
                                                name="phoneNumber"
                                                placeholder="Phone Number"
                                                onChange={handleChange}
                                                value={formData.phoneNumber}
                                            />
                                        </div>
                                        <div className="w-full sm:w-1/2">
                                            <label className="mb-3 block text-sm font-medium text-black dark:text-white" htmlFor="email">
                                                Email Address
                                            </label>
                                            <input
                                                className="w-full rounded border border-stroke bg-gray py-3 pr-4.5 text-black focus:border-primary focus-visible:outline-none dark:border-strokedark dark:bg-meta-4 dark:text-white dark:focus:border-primary"
                                                type="email"
                                                name="email"
                                                placeholder="Enter email"
                                                onChange={handleChange}
                                                value={formData.email}
                                            />
                                        </div>
                                    </div>

                                    <div className="mb-5.5">
                                        <label className="mb-3 block text-sm font-medium text-black dark:text-white" htmlFor="organization_name">
                                            Organization name
                                        </label>
                                        <input
                                            className="w-full rounded border border-stroke bg-gray py-3 pr-4.5 text-black focus:border-primary focus-visible:outline-none dark:border-strokedark dark:bg-meta-4 dark:text-white dark:focus:border-primary"
                                            type="text"
                                            name="organization_name"
                                            placeholder="Organization Name"
                                            onChange={handleChange}
                                            value={formData.organization_name}
                                        />
                                    </div>

                                    <div className="flex justify-end gap-4.5">

                                        <button className="flex justify-center rounded bg-primary px-6 py-2 font-medium text-gray hover:bg-opacity-90" onClick={saveContact}>
                                            Save
                                        </button>
                                    </div>

                                </div>

                                <div className="rounded-sm  px-6.5 py-4 border border-stroke bg-white shadow-default dark:border-strokedark dark:bg-boxdark">
                                    <div className="border-b border-stroke py-4 dark:border-strokedark flex justify-between">
                                        <h3 className="font-medium text-black dark:text-white">
                                            File upload
                                        </h3>

                                        <div className="flex cursor-pointer items-center justify-center gap-2 rounded bg-primary px-2 py-1 text-sm font-medium text-white hover:bg-opacity-80 xsm:px-4">
                                            <Link href="/files/ContactSample.xlsx" download>
                                                <span>Download Sample</span>
                                            </Link>
                                        </div>

                                    </div>
                                    <div className="mb-4.5 flex flex-col gap-6 xl:flex-row">
                                        <div className="w-full xl:w-1/2">
                                            <label className="mb-3 mt-4.5 block text-sm font-medium text-black dark:text-white">
                                                Attach file
                                            </label>
                                            <input
                                                type="file"
                                                onChange={handleFileChange}
                                                className="w-full cursor-pointer rounded-lg border-[1.5px] border-stroke bg-transparent outline-none transition file:mr-5 file:border-collapse file:cursor-pointer file:border-0 file:border-r file:border-solid file:border-stroke file:bg-whiter file:px-5 file:py-3 file:hover:bg-primary file:hover:bg-opacity-10 focus:border-primary active:border-primary disabled:cursor-default disabled:bg-whiter dark:border-form-strokedark dark:bg-form-input dark:file:border-form-strokedark dark:file:bg-white/30 dark:file:text-white dark:focus:border-primary"
                                            />
                                        </div>

                                        <div className="w-full xl:w-1/2">
                                            <label className="mb-3 mt-4.5 block text-sm font-medium text-black dark:text-white">&nbsp;</label>
                                            <button className="flex justify-center rounded bg-primary p-3 font-medium text-gray hover:bg-opacity-90" onClick={handleSubmit}>
                                                Upload
                                            </button>
                                        </div>
                                    </div>

                                </div>
                            </div>
                        </div>
                    </div>

                </div>
            </div>
        </DefaultLayout>
    );
}
