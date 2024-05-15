import { useState, useEffect } from "react";
import { fetchData } from '@ft/services/apiService';
import Alert from "@ft/ui-components/admin/Alert";

const AppSetting = () => {
    const [settingData, setSettingData] = useState(null);
    const [formData, setFormData] = useState(null);
    const [message, setMessage] = useState({ msg: '', type: '' });
    useEffect(() => {
        getSettings();
    }, []);
    const getSettings = () => {
        fetchData(`/api/v1/settings`, 'GET').then((res) => {
            if (res.status === 'success' && res?.data?.length) {
                let formdatatemp = [];
                res.data.map((val) => formdatatemp.push({ attribute: val.attribute, value: val.value }));
                setFormData(formdatatemp);
                setSettingData(res.data);
            } else {
                setMessage({ msg: 'Failed to get settings please try again', type: 'error' });
            }
        });
    }

    const handleChange = (index, e) => {
        const formDataTemp = [...formData];
        formDataTemp[index]['value'] = e.target.value;
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
            <div className="p-6.5 min-w-80 min-w-52">
                {message.msg ? <Alert message={message} setMessage={setMessage} /> : null}

                {
                    (settingData && Array.isArray(settingData) && settingData.length) ? <>
                        {
                            settingData.map((val, index) => {
                                return <div className="mb-5.5 flex flex-col gap-5.5 sm:flex-row" key={index}>
                                    <div className="w-full sm:w-1/2">
                                        <label className="mb-3 block text-sm font-medium text-black dark:text-white" htmlFor={`${val.attribute}`}>{val.name}</label>
                                        <div className="relative">
                                            <input
                                                className="w-full rounded border border-stroke py-3 pr-4.5 text-black focus:border-primary focus-visible:outline-none dark:border-strokedark dark:bg-meta-4 dark:text-white dark:focus:border-primary"
                                                type="text"
                                                name={`${val.attribute}`}
                                                value={`${formData[index].value}`}
                                                onChange={(e) => handleChange(index, e)}
                                            />
                                        </div>
                                    </div>
                                </div>
                            })
                        }
                    </> : null
                }

                {settingData ? <div className="flex justify-end gap-4.5">
                    <button className="flex justify-center rounded bg-primary px-6 py-2 font-medium text-gray hover:bg-opacity-90" onClick={() => { saveSettings(formData) }}>
                        Save
                    </button>
                </div> : null}
            </div>
        </>
    );
};

export default AppSetting;
