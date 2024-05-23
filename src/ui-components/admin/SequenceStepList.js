import { useState, useEffect } from "react";
import EmailAppModal from '@ft/ui-components/admin/EmailAppModal';
import MoreIcon from '@ft/ui-components/ions/EmailIcon';
import AddTemplateForm from '@ft/ui-components/admin/AddTemplateForm';
import { fetchData } from '@ft/services/apiService';
import { format } from 'date-fns';

const SequenceStepList = ({ stepData, setStepCallApi, setMessage }) => {
    const formatDateTime = (date) => {
        return format(date, 'MMMM d, yyyy');
      }
    const [formData, setFormData] = useState({
        id: stepData.id,
        subject: stepData.subject,
        template: stepData.template,
    });
    const [sendTestEmailStatus, setSendTestEmailStatus] = useState(false);
    const [isModalOpen, setIsModalOpen] = useState(false);
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
                subject: formData.subject,
                template: formData.template,
            };
            setMessage({ msg: '', type: '' });
            let url = `/api/v1/sequence/steps?step=${stepData.id}`;
            if(sendTestEmailStatus){
                url = `/api/v1/sequence/steps?s_id=${stepData.sequence_id}&step=${stepData.id}&test=true`;
            }
            fetchData(url, 'POST', postData).then((res) => {
                if (res.status === 'success') {
                    setIsModalOpen(false);
                    setStepCallApi(true);
                    if(sendTestEmailStatus){
                        setMessage({ msg: 'Email sent successfully!', type: 'success' });
                    } else {
                        setMessage({ msg: 'Sequence step updated successfully!', type: 'success' });
                    }
                } else {
                    if(sendTestEmailStatus){
                        setMessage({ msg: 'Unable to send email!', type: 'error' });
                    } else {
                        setMessage({ msg: 'Unable to updated sequence!', type: 'error' });
                    }
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
    const sendTestEmail = (value, issendEmail= '') => {
        if(issendEmail !== ''){
            setSendTestEmailStatus(true);
        }
        if(!value){
            setSendTestEmailStatus(false);
        }
        setIsModalOpen(value);
    }
    return (
        <>
            {
                stepData ? <div className="col-span-12 mb-9 rounded-sm border border-stroke bg-white drop-shadow-1 dark:border-strokedark dark:bg-boxdark xl:col-span-4">
                    <div className="flex justify-between px-7.5 py-3">
                        <div className="inline-flex items-center justify-center gap-2.5 text-center font-medium text-sm">
                            <span className="text-primary"> <MoreIcon /> </span> {getStepTitle()} <span className="text-xs"> - {formatDateTime(stepData.execution_date)} </span>
                        </div>
                        <button className="text-sm text-primary" onClick={()=> {sendTestEmail(true, 'sendEmail'); }}> Send Test email</button>
                    </div>
                    <div className="px-7.5 py-3 hover:bg-gray-3 dark:hover:bg-meta-4 cursor-pointer" onClick={() => sendTestEmail(true)}>
                        <div className="flex flex-1 items-center justify-between">
                            <p className="text-sm"> Subject :<span className="text-sm"> {stepData.subject}</span></p>
                        </div>
                        <div className="flex flex-1 items-center justify-between py-2">
                            <span className="text-xs line-clamp-3">
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
                onClose={sendTestEmail}
                confirmMsg={sendTestEmailStatus ? "Send Test Email": "Save"}
                onConfirm={() => { updateSequenceApi() }}>
                <AddTemplateForm handleChange={handleChange} formData={formData} dataChange={dataChange} sendTestEmailStatus={sendTestEmailStatus} />
            </EmailAppModal>
        </>
    );
};

export default SequenceStepList;
