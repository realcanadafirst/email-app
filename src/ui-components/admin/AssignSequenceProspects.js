import Alert from "@ft/ui-components/admin/Alert";
import React from 'react';
import Select from 'react-select';
const AssignSequenceProspects = ({prospects, selectedOptions, onChange, message, setMessage }) => {
    const handleChange = (selectedOptions) => onChange(selectedOptions);
    return (
        <div>
            <div className="p-6.5 min-w-80 min-w-52">
                <Alert message={message} setMessage={setMessage} />
                <div className="mb-5.5">
                    <label className="mb-3 block text-sm font-medium text-black dark:text-white" htmlFor="options">Choose  Prospects</label>
                    <Select
                        isMulti
                        options={prospects}
                        value={selectedOptions}
                        onChange={handleChange}
                    />
                </div>
            </div>
        </div>
    );
};

export default AssignSequenceProspects;
