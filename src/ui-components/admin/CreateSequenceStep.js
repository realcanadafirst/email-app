import React, { useState } from 'react';
import Alert from "@ft/ui-components/admin/Alert";
import Select from 'react-select';
import DatePicker from "@ft/ui-components/admin/Datepicker";
const CreateSequenceStep = ({ formData, handleChange, isOptionSelected = false, message, setMessage, sequence, templates, selectedTemplates, handleMultiSelectTemplates, setSequenceDate }) => {
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
                        className={`relative z-20 w-full appearance-none rounded border border-stroke px-12 py-3  pl-2.5 outline-none transition focus:border-primary active:border-primary dark:border-form-strokedark dark:bg-form-input ${isOptionSelected ? "text-black dark:text-white" : ""
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
                        <option value="2" className="text-body dark:text-bodydark">
                            Whatsapp
                        </option>
                    </select>
                </div>
                {
                    (sequence?.sequence_type === '1') ? <div className="mb-5.5">
                        <label className="mb-3 block text-sm font-medium text-black dark:text-white" htmlFor="intervalTime">Time Interval to Wait</label>
                        <div className="mb-5.5 flex flex-col gap-2.5 sm:flex-row">
                            <DatePicker startDate={formData.execution_date} setSequenceDate={setSequenceDate} />
                        </div>
                    </div> : <div className="mb-5.5">
                        <label className="mb-3 block text-sm font-medium text-black dark:text-white" htmlFor="intervalTime">Time Interval to Wait</label>
                        <div className="mb-5.5 flex flex-col gap-2.5 sm:flex-row">
                            <div className="w-full sm:w-1/3">
                                <input
                                    className="w-16 rounded border border-stroke py-3 pr-4.5 text-black focus:border-primary focus-visible:outline-none dark:border-strokedark dark:bg-meta-4 dark:text-white dark:focus:border-primary"
                                    type="text"
                                    name="intervalTimeDay"
                                    onChange={handleChange}
                                    value={formData.intervalTimeDay}
                                /> Day(s)
                            </div>
                            <div className="w-full sm:w-1/3">
                                <input
                                    className="w-16 rounded border border-stroke py-3 pr-4.5 text-black focus:border-primary focus-visible:outline-none dark:border-strokedark dark:bg-meta-4 dark:text-white dark:focus:border-primary"
                                    type="text"
                                    name="intervalTimeHour"
                                    onChange={handleChange}
                                    value={formData.intervalTimeHour}
                                /> Hour(s)
                            </div>
                            <div className="w-full sm:w-1/3">
                                <input
                                    className="w-16 rounded border border-stroke py-3 pr-4.5 text-black focus:border-primary focus-visible:outline-none dark:border-strokedark dark:bg-meta-4 dark:text-white dark:focus:border-primary"
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
                        className={`z-20 w-full appearance-none rounded border border-stroke px-12 py-3  pl-2.5 outline-none transition focus:border-primary active:border-primary dark:border-form-strokedark dark:bg-form-input ${isOptionSelected ? "text-black dark:text-white" : ""
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
                        className="w-full rounded border border-stroke py-3 pr-4.5 text-black focus:border-primary focus-visible:outline-none dark:border-strokedark dark:bg-meta-4 dark:text-white dark:focus:border-primary"
                        type="text"
                        name="taskNote"
                        placeholder="Task Note"
                        onChange={handleChange}
                        value={formData.taskNote}
                    />
                </div>
                {
                    formData.stepType === '2' ? <div className="mb-5.5">
                        <label className="mb-3 block text-sm font-medium text-black dark:text-white" htmlFor="whatsapp_message">Write Message</label>
                        <textarea
                            className="w-full rounded border border-stroke py-3 pr-4.5 text-black focus:border-primary focus-visible:outline-none dark:border-strokedark dark:bg-meta-4 dark:text-white dark:focus:border-primary"
                            type="text"
                            name="whatsapp_message"
                            placeholder="Message"
                            onChange={handleChange}
                            value={formData.whatsapp_message}
                        />
                    </div> : <div className="mb-5.5">
                        <label className="mb-3 block text-sm font-medium text-black dark:text-white" htmlFor="selectTemplate">Select Template</label>
                        <Select
                            isMulti={false}
                            options={templates}
                            value={selectedTemplates}
                            onChange={handleMultiSelectTemplates}
                        />
                    </div>
                }

            </div>
        </div>
    );
};

export default CreateSequenceStep;
