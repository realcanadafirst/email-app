import { useState, useEffect } from "react";
const SequenceSetting = ({ id, sequence, saveSettings }) => {
    const [formData, setFormData] = useState({
        name: '',
        mailbox: '',
        replies: '',
        meetings: '',
        sequenceType: ''
    });
    useEffect(() => {
        if (sequence && sequence?.name) {
            setFormData({
                name: sequence.name,
                mailbox: sequence.from_email,
                replies: sequence.replies,
                meetings: sequence.meetings,
                sequenceType: sequence.sequenceType == '0' ? 'Steps by day interval' : ' Steps by exact date/time'
            })
        }

    }, [sequence])
    const handleChange = (e) => {
        const formDataTemp = { ...formData }
        formDataTemp[e.target.name] = e.target.value;
        setFormData(formDataTemp)
    }
    return (
        <>
            <div className="p-6.5 min-w-80 min-w-52">
                <div className="mb-5.5 flex flex-col gap-5.5 sm:flex-row">
                    <div className="w-full sm:w-1/2">
                        <label className="mb-3 block text-sm font-medium text-black dark:text-white" htmlFor="name">Name</label>
                        <div className="relative">
                            <input
                                className="w-full rounded border border-stroke py-3 pr-4.5 text-black focus:border-primary focus-visible:outline-none dark:border-strokedark dark:bg-meta-4 dark:text-white dark:focus:border-primary"
                                type="text"
                                name="name"
                                placeholder="Name"
                                onChange={handleChange}
                                value={formData.name}
                            />
                        </div>
                    </div>
                    <div className="w-full sm:w-1/2">
                        <label className="mb-3 block text-sm font-medium text-black dark:text-white" htmlFor="mailbox">Mail from</label>
                        <div className="relative">
                            <input
                                className="w-full rounded border border-stroke py-3 pr-4.5 text-black focus:border-primary focus-visible:outline-none dark:border-strokedark dark:bg-meta-4 dark:text-white dark:focus:border-primary"
                                type="text"
                                name="mailbox"
                                placeholder="Mailbox"
                                onChange={handleChange}
                                value={formData.mailbox}
                            />
                        </div>
                    </div>
                </div>
                <div className="mb-5.5 flex flex-col gap-5.5 sm:flex-row">
                    <div className="w-full sm:w-1/2">
                        <label className="mb-3 block text-sm font-medium text-black dark:text-white" > When The Primary Prospect Replies </label>
                        <div className="relative">
                            <select
                                value={formData.replies}
                                name="replies"
                                onChange={handleChange}
                                className={`relative z-20 w-full appearance-none rounded border border-stroke px-12 py-3  pl-2.5 outline-none transition focus:border-primary active:border-primary dark:border-form-strokedark dark:bg-form-input`}
                            >
                                <option value="1" className="text-body dark:text-bodydark">Finish Sequence</option>
                                <option value="2" className="text-body dark:text-bodydark">Pause Sequence</option>
                                <option value="3" className="text-body dark:text-bodydark">Continue Sequence</option>
                            </select>
                        </div>
                    </div>
                    <div className="w-full sm:w-1/2">
                        <label className="mb-3 block text-sm font-medium text-black dark:text-white" >When The Primary Prospect Books Meeting </label>
                        <div className="relative">
                            <select
                                value={formData.meetings}
                                name="meetings"
                                onChange={handleChange}
                                className={`relative z-20 w-full appearance-none rounded border border-stroke px-12 py-3  pl-2.5 outline-none transition focus:border-primary active:border-primary dark:border-form-strokedark dark:bg-form-input`}
                            >
                                <option value="1" className="text-body dark:text-bodydark">Finish Sequence</option>
                                <option value="2" className="text-body dark:text-bodydark">Pause Sequence</option>
                                <option value="3" className="text-body dark:text-bodydark">Continue Sequence</option>
                            </select>
                        </div>
                    </div>
                </div>
                <div className="mb-5.5 flex flex-col gap-5.5 sm:flex-row">
                    <div className="w-full sm:w-1/2">
                        <label className="mb-3 block text-sm font-medium text-black dark:text-white" >Sequence Type </label>
                        <div className="relative">
                            <input
                                className="w-full rounded border border-stroke py-3 pr-4.5 text-black"
                                type="text"
                                readOnly={true}
                                value={formData.sequenceType}
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

export default SequenceSetting;
