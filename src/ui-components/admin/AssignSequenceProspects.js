import Alert from "@ft/ui-components/admin/Alert";
import React from 'react';
import Select from 'react-select';
const AssignSequenceProspects = ({ prospects, selectedOptions, onChange, message, setMessage, campaigns, setSelectedCampaign, selectedCampaign }) => {
    const handleChange = (selectedOptions) => onChange(selectedOptions);
    return (
        <div>
            <div className="p-6.5 min-w-80 min-w-52">
                {message.msg ? <Alert message={message} setMessage={setMessage} /> : null}
                <div className="mb-5.5">
                    <label className="mb-3 block text-sm font-medium text-black dark:text-white" htmlFor="options">Choose  Prospects</label>
                    <Select
                        isMulti
                        options={prospects}
                        value={selectedOptions}
                        onChange={handleChange}
                    />
                </div>
                <div className="mt-5 flex justify-center">
                    <label className="mb-3 block text-sm font-medium text-black dark:text-white">Or</label>
                </div>
                <div className="mb-5.5">
                    <label className="mb-3 block text-sm font-medium text-black dark:text-white" htmlFor="Campaign">Choose Campaign</label>
                    <Select
                        options={campaigns}
                        value={selectedCampaign}
                        onChange={(val)=>setSelectedCampaign(val)}
                    />
                </div>
            </div>
        </div>
    );
};

export default AssignSequenceProspects;
