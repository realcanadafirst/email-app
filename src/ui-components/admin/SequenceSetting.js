import { useState } from "react";
import Alert from "@ft/ui-components/admin/Alert";
const SequenceSetting = () => {
    const [formData, setFormData] = useState({
        stepType: '',
        intervalTimeDay: '',
        intervalTimeHour: '',
        intervalTimeMin: '',
        taskPriority: 0,
        taskNote: '',
        selectTemplate: '',
        status: 1
    });
    const [message, setMessage] = useState({ msg: '', type: '' });
    const handleChange = (e) => {
        const formDataTemp = { ...formData }
        formDataTemp[e.target.name] = e.target.value;
        setFormData(formDataTemp)
    }
    return (
        <>
            <div className="p-6.5 min-w-80 min-w-52">
                <Alert message={message} setMessage={setMessage} />
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
                    <label className="mb-3 block text-sm font-medium text-black dark:text-white" htmlFor="mailbox">Mail from</label>
                    <input
                        className="w-full rounded border border-stroke bg-gray py-3 pr-4.5 text-black focus:border-primary focus-visible:outline-none dark:border-strokedark dark:bg-meta-4 dark:text-white dark:focus:border-primary"
                        type="text"
                        name="mailbox"
                        placeholder="Mailbox"
                        onChange={handleChange}
                        value={formData.mailbox}
                    />
                </div>

            </div>
        </>
    );
};

export default SequenceSetting;
