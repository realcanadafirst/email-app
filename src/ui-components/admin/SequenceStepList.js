import { useState, useEffect } from "react";
import EmailAppModal from '@ft/ui-components/admin/EmailAppModal';
import MoreIcon from '@ft/ui-components/ions/EmailIcon';
import AddTemplateForm from '@ft/ui-components/admin/AddTemplateForm';
import { fetchData } from '@ft/services/apiService';

const SequenceStepList = ({ stepData, setStepCallApi, setMessage }) => {
    const [formData, setFormData] = useState({
        id: stepData.id,
        subject: stepData.template_name,
        template: stepData.template,
    });
    const [isModalOpen, setIsModalOpen] = useState(false);
    const handleModal = (value) => setIsModalOpen(value);
    const handleChange = (e) => {
        const formDataTemp = { ...formData }
        formDataTemp[e.target.name] = e.target.value;
        setFormData(formDataTemp)
    }
    const dataChange = (data) => {
        const formDataTemp = { ...formData };
        formDataTemp.template = data;
        setFormData(formDataTemp);
    }
    const getStepTitle = () => stepData?.step_type == 0 ? ' Send an automatic email' : ' Send an manual email';
    const updateSequenceApi = () => {
        if (formData.subject && formData.subject !== '' && formData.template && formData.template !== '') {
            const postData = {
                template_name: formData.subject,
                template: formData.template,
            };
            setMessage({ msg: '', type: '' });
            fetchData(`/api/v1/sequence/steps?step=${stepData.id}`, 'POST', postData).then((res) => {
                if (res.status === 'success') {
                    setIsModalOpen(false);
                    setStepCallApi(true);
                    setMessage({ msg: 'Sequence step updated successfully!', type: 'success' });
                } else {
                    setMessage({ msg: 'Please fill all required fields', type: 'error' });
                }
            });
        } else {
            setMessage({ msg: 'Please fill all required fields', type: 'error' });
        }
    }
    const removeTag = (template) => {
        try {
            const result = template.replace(/(<([^>]+)>)/ig, '');
            return result.replace(/&nbsp;/ig, ' ');
        } catch (error) {
            return <div
                id="show-template"
                dangerouslySetInnerHTML={{
                    __html: `${template}`,
                }}
            />
        }
    }
    return (
        <>
            {
                stepData ? <div className="col-span-12 mb-9 rounded-sm border border-stroke bg-white drop-shadow-1 dark:border-strokedark dark:bg-boxdark xl:col-span-4">
                    <div className="flex px-7.5 py-3">
                        <div className="inline-flex items-center justify-center gap-2.5 text-center font-medium text-sm">
                            <span className="text-primary"> <MoreIcon /> </span> {getStepTitle()}
                        </div>
                    </div>
                    <div className="px-7.5 py-3 hover:bg-gray-3 dark:hover:bg-meta-4 cursor-pointer" onClick={() => handleModal(true)}>
                        <div className="flex flex-1 items-center justify-between">
                            <p className="text-sm"> Subject :<span className="text-sm"> {stepData.template_name}</span></p>
                        </div>
                        <div className="flex flex-1 items-center justify-between py-2">
                            <span className="text-xs">
                                {removeTag(stepData.template)}
                            </span>
                        </div>
                    </div>
                    <div className="flex px-7.5 py-3">
                        <span className="font-medium text-black">Note : &nbsp;</span> <span> {stepData.note} </span>
                    </div>
                </div> : null
            }
            <EmailAppModal
                isOpen={isModalOpen}
                onClose={handleModal}
                confirmMsg="Save"
                onConfirm={() => { updateSequenceApi() }}>
                <AddTemplateForm handleChange={handleChange} formData={formData} dataChange={dataChange} />
            </EmailAppModal>
        </>
    );
};

export default SequenceStepList;
