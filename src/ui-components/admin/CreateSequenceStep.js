import { useEffect, useState } from "react";
import flatpickr from "flatpickr";
import Alert from "@ft/ui-components/admin/Alert";
import Select from 'react-select';

const CreateSequenceStep = ({ formData, handleChange, isOptionSelected = false, message, setMessage, sequence, templates, selectedTemplates, handleMultiSelectTemplates }) => {
    useEffect(() => {
        // Init flatpickr
        flatpickr(".form-datepicker", {
            mode: "single",
            static: true,
            monthSelectorType: "static",
            dateFormat: "M j, Y",
            prevArrow: '<svg className="fill-current" width="7" height="11" viewBox="0 0 7 11"><path d="M5.4 10.8l1.4-1.4-4-4 4-4L5.4 0 0 5.4z" /></svg>',
            nextArrow: '<svg className="fill-current" width="7" height="11" viewBox="0 0 7 11"><path d="M1.4 10.8L0 9.4l4-4-4-4L1.4 0l5.4 5.4z" /></svg>',
        });
    }, []);
    return (
        <div className="overflow-auto max-h-96 ">
            <div className="p-6.5 min-w-80 min-w-52">
                <Alert message={message} setMessage={setMessage} />
                <div className="mb-5.5">
                    <label className="mb-3 block text-sm font-medium text-black dark:text-white" htmlFor="options">Step Type</label>
                    <select
                        value={formData.stepType}
                        name="stepType"
                        onChange={handleChange}
                        className={`relative z-20 w-full appearance-none rounded border border-stroke bg-gray px-12 py-3  pl-2.5 outline-none transition focus:border-primary active:border-primary dark:border-form-strokedark dark:bg-form-input ${isOptionSelected ? "text-black dark:text-white" : ""
                            }`}
                    >
                        <option value="" disabled className="text-body dark:text-bodydark">
                            Select Step Type
                        </option>
                        <option value="0" className="text-body dark:text-bodydark">
                            Automatic Email
                        </option>
                        <option value="1" className="text-body dark:text-bodydark">
                            Manual Email
                        </option>
                        <option value="1" className="text-body dark:text-bodydark">
                            Whatsapp
                        </option>
                    </select>
                </div>
                {
                    (sequence?.sequence_type === 0) ? <div className="mb-5.5"><label className="mb-3 block text-sm font-medium text-black dark:text-white">Date/Time</label>                        <div className="relative">
                        <div className="relative">
                            <input
                                className="form-datepicker w-full rounded border-[1.5px] border-stroke bg-transparent px-5 py-3 font-normal outline-none transition focus:border-primary active:border-primary dark:border-form-strokedark dark:bg-form-input dark:focus:border-primary"
                                placeholder="mm/dd/yyyy"
                                data-class="flatpickr-right"
                            />

                            <div className="pointer-events-none absolute inset-0 left-auto right-5 flex items-center">
                                <svg
                                    width="18"
                                    height="18"
                                    viewBox="0 0 18 18"
                                    fill="none"
                                    xmlns="http://www.w3.org/2000/svg"
                                >
                                    <path
                                        d="M15.7504 2.9812H14.2879V2.36245C14.2879 2.02495 14.0066 1.71558 13.641 1.71558C13.2754 1.71558 12.9941 1.99683 12.9941 2.36245V2.9812H4.97852V2.36245C4.97852 2.02495 4.69727 1.71558 4.33164 1.71558C3.96602 1.71558 3.68477 1.99683 3.68477 2.36245V2.9812H2.25039C1.29414 2.9812 0.478516 3.7687 0.478516 4.75308V14.5406C0.478516 15.4968 1.26602 16.3125 2.25039 16.3125H15.7504C16.7066 16.3125 17.5223 15.525 17.5223 14.5406V4.72495C17.5223 3.7687 16.7066 2.9812 15.7504 2.9812ZM1.77227 8.21245H4.16289V10.9968H1.77227V8.21245ZM5.42852 8.21245H8.38164V10.9968H5.42852V8.21245ZM8.38164 12.2625V15.0187H5.42852V12.2625H8.38164V12.2625ZM9.64727 12.2625H12.6004V15.0187H9.64727V12.2625ZM9.64727 10.9968V8.21245H12.6004V10.9968H9.64727ZM13.8379 8.21245H16.2285V10.9968H13.8379V8.21245ZM2.25039 4.24683H3.71289V4.83745C3.71289 5.17495 3.99414 5.48433 4.35977 5.48433C4.72539 5.48433 5.00664 5.20308 5.00664 4.83745V4.24683H13.0504V4.83745C13.0504 5.17495 13.3316 5.48433 13.6973 5.48433C14.0629 5.48433 14.3441 5.20308 14.3441 4.83745V4.24683H15.7504C16.0316 4.24683 16.2566 4.47183 16.2566 4.75308V6.94683H1.77227V4.75308C1.77227 4.47183 1.96914 4.24683 2.25039 4.24683ZM1.77227 14.5125V12.2343H4.16289V14.9906H2.25039C1.96914 15.0187 1.77227 14.7937 1.77227 14.5125ZM15.7504 15.0187H13.8379V12.2625H16.2285V14.5406C16.2566 14.7937 16.0316 15.0187 15.7504 15.0187Z"
                                        fill="#64748B"
                                    />
                                </svg>
                            </div>
                        </div>
                    </div>
                    </div> : <div className="mb-5.5">
                        <label className="mb-3 block text-sm font-medium text-black dark:text-white" htmlFor="intervalTime">Time Interval to Wait</label>
                        <div className="mb-5.5 flex flex-col gap-2.5 sm:flex-row">
                            <div className="w-full sm:w-1/3">
                                <input
                                    className="w-16 rounded border border-stroke bg-gray py-3 pr-4.5 text-black focus:border-primary focus-visible:outline-none dark:border-strokedark dark:bg-meta-4 dark:text-white dark:focus:border-primary"
                                    type="text"
                                    name="intervalTimeDay"
                                    onChange={handleChange}
                                    value={formData.intervalTimeDay}
                                /> Day(s)
                            </div>
                            <div className="w-full sm:w-1/3">
                                <input
                                    className="w-16 rounded border border-stroke bg-gray py-3 pr-4.5 text-black focus:border-primary focus-visible:outline-none dark:border-strokedark dark:bg-meta-4 dark:text-white dark:focus:border-primary"
                                    type="text"
                                    name="intervalTimeHour"
                                    onChange={handleChange}
                                    value={formData.intervalTimeHour}
                                /> Hour(s)
                            </div>
                            <div className="w-full sm:w-1/3">
                                <input
                                    className="w-16 rounded border border-stroke bg-gray py-3 pr-4.5 text-black focus:border-primary focus-visible:outline-none dark:border-strokedark dark:bg-meta-4 dark:text-white dark:focus:border-primary"
                                    type="text"
                                    name="intervalTimeMin"
                                    onChange={handleChange}
                                    value={formData.intervalTimeMin}
                                /> Minute(s)
                            </div>
                        </div>
                    </div>
                }
                <div className="mb-5.5">
                    <label className="mb-3 block text-sm font-medium text-black dark:text-white" htmlFor="taskPriority">Task Priority</label>
                    <select
                        value={formData.taskPriority}
                        name="taskPriority"
                        onChange={handleChange}
                        className={`relative z-20 w-full appearance-none rounded border border-stroke bg-gray px-12 py-3  pl-2.5 outline-none transition focus:border-primary active:border-primary dark:border-form-strokedark dark:bg-form-input ${isOptionSelected ? "text-black dark:text-white" : ""
                            }`}
                    >
                        <option value="" disabled className="text-body dark:text-bodydark">
                            Select Task Priority
                        </option>
                        <option value="0" className="text-body dark:text-bodydark">
                            Low
                        </option>
                        <option value="1" className="text-body dark:text-bodydark">
                            Normal
                        </option>
                        <option value="1" className="text-body dark:text-bodydark">
                            High
                        </option>
                    </select>
                </div>
                <div className="mb-5.5">
                    <label className="mb-3 block text-sm font-medium text-black dark:text-white" htmlFor="taskNote">Task Note</label>
                    <input
                        className="w-full rounded border border-stroke bg-gray py-3 pr-4.5 text-black focus:border-primary focus-visible:outline-none dark:border-strokedark dark:bg-meta-4 dark:text-white dark:focus:border-primary"
                        type="text"
                        name="taskNote"
                        placeholder="Task Note"
                        onChange={handleChange}
                        value={formData.taskNote}
                    />
                </div>
                <div className="mb-5.5">
                    <label className="mb-3 block text-sm font-medium text-black dark:text-white" htmlFor="selectTemplate">Select Template</label>
                    <Select
                        isMulti={false}
                        options={templates}
                        value={selectedTemplates}
                        onChange={handleMultiSelectTemplates}
                    />
                </div>
            </div>
        </div>
    );
};

export default CreateSequenceStep;
