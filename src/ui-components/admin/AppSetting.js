import { useState, useEffect } from "react";
import { fetchData } from '@ft/services/apiService';
import Alert from "@ft/ui-components/admin/Alert";

const AppSetting = () => {
    const [formData, setFormData] = useState({
        email: '',
        smtp_host: '',
        smtp_port: '',
        smtp_password: '',
        sender_name: '',
        sender_company: '',
    });
    const [message, setMessage] = useState({ msg: '', type: '' });
    useEffect(() => {
        getSettings();
    }, []);
    const getSettings = () => {
        fetchData(`/api/v1/settings`, 'GET').then((res) => {
            if (res.status === 'success' && res?.data?.length) {
                const data = res?.data[0];
                setFormData({
                    email: data['email'],
                    smtp_host: data['smtp_host'],
                    smtp_port: data['smtp_port'],
                    smtp_password: data['smtp_password'],
                    sender_name: data['sender_name'],
                    sender_company: data['sender_company'],
                });
            } else {
                setMessage({ msg: 'Failed to get settings please try again', type: 'error' });
            }
        });
    }

    const handleChange = (e) => {
        const formDataTemp = {...formData};
        formDataTemp[e.target.name] = e.target.value;
        setFormData(formDataTemp);
    }

    const saveSettings = (formData) => {
        fetchData(`/api/v1/settings`, 'POST', formData).then((res) => {
            if (res.status === 'success') {
                setMessage({ msg: 'Settings updated successfully!', type: 'success' });
            } else {
                setMessage({ msg: 'Please fill all required fields', type: 'error' });
            }
        });
    }
    return (
        <>
            <div className="min-w-80 lg:min-w-52">
                {message.msg ? <Alert message={message} setMessage={setMessage} /> : null}
                <div className="mb-5.5 flex flex-col gap-5.5 sm:flex-row">
                    <div className="w-full sm:w-1/2">
                        <label className="mb-3 block text-sm font-medium text-black dark:text-white" htmlFor={'email'}>Email From</label>
                        <div className="relative">
                            <input
                                className="w-full rounded border border-stroke py-3 pr-4.5 text-black focus:border-primary focus-visible:outline-none dark:border-strokedark dark:bg-meta-4 dark:text-white dark:focus:border-primary"
                                type="text"
                                name="email"
                                value={`${formData['email']}`}
                                onChange={(e) => handleChange(e)}
                            />
                        </div>
                    </div>
                    <div className="w-full sm:w-1/2">
                        <label className="mb-3 block text-sm font-medium text-black dark:text-white" htmlFor={'smtp_password'}>Email Password</label>
                        <div className="relative">
                            <input
                                className="w-full rounded border border-stroke py-3 pr-4.5 text-black focus:border-primary focus-visible:outline-none dark:border-strokedark dark:bg-meta-4 dark:text-white dark:focus:border-primary"
                                type="text"
                                name="smtp_password"
                                value={`${formData['smtp_password']}`}
                                onChange={(e) => handleChange(e)}
                            />
                        </div>
                    </div>
                </div>
                <div className="mb-5.5 flex flex-col gap-5.5 sm:flex-row">
                    <div className="w-full sm:w-1/2">
                        <label className="mb-3 block text-sm font-medium text-black dark:text-white" htmlFor={'smtp_host'}>Smtp host</label>
                        <div className="relative">
                            <input
                                className="w-full rounded border border-stroke py-3 pr-4.5 text-black focus:border-primary focus-visible:outline-none dark:border-strokedark dark:bg-meta-4 dark:text-white dark:focus:border-primary"
                                type="text"
                                name="smtp_host"
                                value={`${formData['smtp_host']}`}
                                onChange={(e) => handleChange(e)}
                            />
                        </div>
                    </div>
                    <div className="w-full sm:w-1/2">
                        <label className="mb-3 block text-sm font-medium text-black dark:text-white" htmlFor={'smtp_port'}>Smtp port</label>
                        <div className="relative">
                            <input
                                className="w-full rounded border border-stroke py-3 pr-4.5 text-black focus:border-primary focus-visible:outline-none dark:border-strokedark dark:bg-meta-4 dark:text-white dark:focus:border-primary"
                                type="text"
                                name="smtp_port"
                                value={`${formData['smtp_port']}`}
                                onChange={(e) => handleChange(e)}
                            />
                        </div>
                    </div>
                </div>
                <div className="mb-5.5 flex flex-col gap-5.5 sm:flex-row">
                    <div className="w-full sm:w-1/2">
                        <label className="mb-3 block text-sm font-medium text-black dark:text-white" htmlFor={'sender_name'}>Sender name</label>
                        <div className="relative">
                            <input
                                className="w-full rounded border border-stroke py-3 pr-4.5 text-black focus:border-primary focus-visible:outline-none dark:border-strokedark dark:bg-meta-4 dark:text-white dark:focus:border-primary"
                                type="text"
                                name="sender_name"
                                value={`${formData['sender_name']}`}
                                onChange={(e) => handleChange(e)}
                            />
                        </div>
                    </div>
                    <div className="w-full sm:w-1/2">
                        <label className="mb-3 block text-sm font-medium text-black dark:text-white" htmlFor={'sender_company'}>Sender company</label>
                        <div className="relative">
                            <input
                                className="w-full rounded border border-stroke py-3 pr-4.5 text-black focus:border-primary focus-visible:outline-none dark:border-strokedark dark:bg-meta-4 dark:text-white dark:focus:border-primary"
                                type="text"
                                name="sender_company"
                                value={`${formData['sender_company']}`}
                                onChange={(e) => handleChange(e)}
                            />
                        </div>
                    </div>
                </div>

                <div className="flex justify-center gap-4.5">
                    <button className="flex justify-center rounded bg-primary px-6 py-2 font-medium text-gray hover:bg-opacity-90" onClick={() => { saveSettings(formData) }}>
                        Save
                    </button>
                </div>
            </div>
        </>
    );
};

export default AppSetting;
