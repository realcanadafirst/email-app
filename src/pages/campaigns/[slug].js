import React, { useState, useEffect, useRef } from "react";
import Link from 'next/link';
import DefaultLayout from "@ft/ui-components/admin/Layouts/DefaultLayout";
import Breadcrumb from '@ft/ui-components/admin/breadcrumb';
import { useRouter } from "next/router";
import Alert from "@ft/ui-components/admin/Alert";
import { fetchData } from '@ft/services/apiService';
import Select from 'react-select';

export default function CreateUpdateCampaign() {
    const [formData, setFormData] = useState({ campaigns_name: '' });
    const [message, setMessage] = useState({ msg: '', type: '' });
    const [prospects, setProspects] = useState([]);
    const [selectedOptions, setSelectedOptions] = useState([]);
    const router = useRouter();
    const { slug, id } = router.query;
    const pageName = slug === 'create' ? 'Create Campaign' : 'Update Campaign';
    useEffect(() => {
        if (slug === 'create') {
            getProspects();
        } else if (id) {
            getCampaigns();
        }
    }, [slug]);
    const getProspects = () => {
        fetchData(`/api/v1/prospects`, 'GET').then((res) => {
            if (res.status === 'success') {
                const prospects_t = res.data;
                const options_temp = prospects_t.map((val) => { return { value: val.id, label: val.email, ...val } });
                setProspects([...options_temp]);
            } else {
                setMessage({ msg: 'Failed to get prospects please try again', type: 'error' });
            }
        });
    }
    const getCampaigns = () => {
        fetchData(`/api/v1/campaigns?c_id=${id}`, 'GET').then((res) => {
            if (res.status === 'success' && res.data['prospects'] && res.data['campaign'] && res.data['campaign'].length) {
                const prospects_t = res.data['prospects'];
                const campaign_t = res.data['campaign'][0];
                setSelectedOptions(JSON.parse(campaign_t['receiver_data']));
                setFormData({ campaigns_name: campaign_t.campaign_name });
                const options_temp = prospects_t.map((val) => { return { value: val.id, label: val.email, ...val } });
                setProspects([...options_temp]);
            } else {
                setMessage({ msg: 'Failed to get prospects please try again', type: 'error' });
            }
        });
    }
    const onChange = (selectedOptions) => setSelectedOptions(selectedOptions);

    const handleChange = (e) => {
        const formDataTemp = { ...formData }
        formDataTemp[e.target.name] = e.target.value;
        setFormData(formDataTemp)
    }

    const saveContact = () => {
        if (formData.campaigns_name && formData.campaigns_name !== '' && selectedOptions.length) {
            const postData = {
                campaigns_name: formData.campaigns_name,
                prospects: JSON.stringify(selectedOptions),
                c_id: id
            };
            setMessage({ msg: '', type: '' });
            fetchData(`/api/v1/campaigns`, 'POST', postData).then((res) => {
                if (res.status === 'success') {
                    router.push({ pathname: '/campaigns/', query: { status: 'success' } });
                } else if (res.data) {
                    setMessage({ msg: res.data, type: 'error' });
                } else {
                    setMessage({ msg: 'Something went wrong, Please try again', type: 'error' });
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
                                    <Link href="/campaigns" className={`flex rounded-md bg-primary px-5.5 py-2.5 font-medium text-white`}>
                                        Back
                                    </Link>
                                </div>
                            </div>
                            {message.msg ? <Alert message={message} setMessage={setMessage} /> : null}
                            <div className="p-6.5">
                                <div className="mb-4.5">
                                    <label className="mb-3 block text-sm font-medium text-black dark:text-white">Campaigns name <span className="text-meta-1">*</span></label>
                                    <input
                                        type="text"
                                        placeholder="campaigns name"
                                        className="w-full rounded border-[1.5px] border-stroke bg-transparent px-5 py-3 text-black outline-none transition focus:border-primary active:border-primary disabled:cursor-default disabled:bg-whiter dark:border-form-strokedark dark:bg-form-input dark:text-white dark:focus:border-primary"
                                        name="campaigns_name"
                                        value={formData.campaigns_name}
                                        onChange={handleChange}
                                    />
                                </div>
                                <div className="mb-5.5">
                                    <label className="mb-3 block text-sm font-medium text-black dark:text-white" htmlFor="options">Choose  Prospects</label>
                                    <Select
                                        isMulti
                                        options={prospects}
                                        value={selectedOptions}
                                        onChange={onChange}
                                    />
                                </div>

                                <div className="flex justify-center gap-4.5">
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
