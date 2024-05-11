import Alert from "@ft/ui-components/admin/Alert";
const CreateSequence = ({ formData, handleChange, isOptionSelected = false, message, setMessage }) => {
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
                    <label className="mb-3 block text-sm font-medium text-black dark:text-white" htmlFor="options">Sequence Type</label>
                    <select
                        value={formData.options}
                        name="options"
                        onChange={handleChange}
                        className={`relative z-20 w-full appearance-none rounded border border-stroke bg-gray px-12 py-3  pl-2.5 outline-none transition focus:border-primary active:border-primary dark:border-form-strokedark dark:bg-form-input ${isOptionSelected ? "text-black dark:text-white" : ""
                            }`}
                    >
                        <option value="" disabled className="text-body dark:text-bodydark">
                            Select Sequence Type
                        </option>
                        <option value="0" className="text-body dark:text-bodydark">
                            Steps by day interval
                        </option>
                        <option value="1" className="text-body dark:text-bodydark">
                            Steps by exact date/time
                        </option>
                    </select>
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

export default CreateSequence;
