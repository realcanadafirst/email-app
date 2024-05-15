import { useState, useEffect } from "react";
import DefaultLayout from "@ft/ui-components/admin/Layouts/DefaultLayout";
import Breadcrumb from '@ft/ui-components/admin/breadcrumb';
import Alert from "@ft/ui-components/admin/Alert";
import SequenceOverView from "@ft/ui-components/admin/SequenceOverView";
import CreateSequenceStep from '@ft/ui-components/admin/CreateSequenceStep';
import AssignSequenceProspects from '@ft/ui-components/admin/AssignSequenceProspects';
import SequenceSetting from '@ft/ui-components/admin/SequenceSetting';
import SequenceProspects from '@ft/ui-components/admin/SequenceProspects';
import { useRouter } from 'next/router';
import { fetchData } from '@ft/services/apiService';

import EmailAppModal from '@ft/ui-components/admin/EmailAppModal';

export default function SequenceUpdate() {
    const [activeTab, setActiveTab] = useState('styled-overview');
    const [isModalOpen, setIsModalOpen] = useState(false);
    const [message, setMessage] = useState({ msg: '', type: '' });
    const [sequence, setSequence] = useState(null);
    const [prospects, setProspects] = useState([]);
    const [assignedProspects, setAssignedProspects] = useState([]);
    const [selectedProspects, setSelectedProspects] = useState([]);
    const [callApi, setCallApi] = useState(true);
    const [callStepApi, setStepCallApi] = useState(true);
    const [templates, setTemplates] = useState([]);
    const [selectedTemplates, setSelectedTemplates] = useState([]);
    const [formData, setFormData] = useState({
        stepType: '',
        intervalTimeDay: '',
        intervalTimeHour: '',
        intervalTimeMin: '',
        execution_date: new Date(),
        taskPriority: '0',
        taskNote: '',
        subject: '',
        template: '',
        status: 1
    });
    const router = useRouter();
    const { slug } = router.query;
    const handleMultiSelectProspects = (selectedOptions) => setSelectedProspects(selectedOptions);
    const handleMultiSelectTemplates = (selectedOptions) => setSelectedTemplates(selectedOptions);
    const handleModal = (value) => setIsModalOpen(value);
    const handleTabClick = (tabId) => setActiveTab(tabId);
    useEffect(() => {
        if (slug) {
            getSequence();
            getTemplates();
        }
    }, [slug]);

    const getSequence = () => {
        fetchData(`/api/v1/sequences?c_id=${slug}`, 'GET').then((res) => {
            if (res.status === 'success' && res?.data?.length) {
                setSequence(res.data[0]);
            } else {
                setMessage({ msg: 'Failed to get prospects please try again', type: 'error' });
            }
        });
    }

    const getTemplates = () => {
        fetchData(`/api/v1/templates`, 'GET').then((res) => {
            if (res.status === 'success' && res?.data?.length) {
                const templates_t = res.data.map((val) => { return { value: val.id, label: val.subject, data: val.template } });
                setTemplates(templates_t);
            } else {
                setMessage({ msg: 'Failed to get templates please try again', type: 'error' });
            }
        });
    }

    const createSequenceApi = () => {
        if (activeTab === 'styled-prospects') {
            assignProspects();
        } else {
            createSteps();
        }
    }

    const assignProspects = () => {
        if (selectedProspects.length) {
            const postData = {
                prospects: selectedProspects,
            };
            setMessage({ msg: '', type: '' });
            fetchData(`/api/v1/sequence/prospects?s_id=${slug}`, 'POST', postData).then((res) => {
                if (res.status === 'success') {
                    setIsModalOpen(false);
                    setCallApi(true);
                    setMessage({ msg: 'Prospects assigned successfully!', type: 'success' });
                    setTimeout(() => {
                        router.push({ pathname: `/sequences/view/${slug}`, query: { status: 'success' } });
                    }, 1000)
                } else {
                    setMessage({ msg: 'Something went wrong, Please try again.', type: 'error' });
                }
            });
        } else {
            setMessage({ msg: 'Please choose prospects', type: 'error' });
        }
    }

    const createSteps = () => {
        if (formData.stepType && formData.stepType !== '' && ((formData.intervalTimeDay && formData.intervalTimeDay !== '' && formData.intervalTimeHour && formData.intervalTimeHour !== '' && formData.intervalTimeMin && formData.intervalTimeMin !== '') || (formData.execution_date && formData.execution_date !== '')) && formData.taskPriority && formData.taskPriority !== '' && formData.taskNote && formData.taskNote !== '' && selectedTemplates && selectedTemplates.value !== '') {
            const currentTime = new Date().getTime();
            let updatedTime = currentTime;
            if (formData.intervalTimeDay && formData.intervalTimeDay !== '') {
                updatedTime = new Date(currentTime + (formData.intervalTimeDay * 24 * 60 * 60 * 1000) + (formData.intervalTimeHour * 60 * 60 * 1000) + (formData.intervalTimeMin * 60 * 1000)).getTime();
            } else {
                updatedTime = new Date(formData.execution_date).getTime();
            }
            updatedTime = new Date(updatedTime + 19800000);
            const postData = {
                stepType: formData.stepType,
                intervalTime: `${formData.intervalTimeDay}:${formData.intervalTimeHour}:${formData.intervalTimeMin}`,
                execution_date: updatedTime,
                taskPriority: formData.taskPriority,
                taskNote: formData.taskNote,
                subject: selectedTemplates.label,
                template: selectedTemplates.data,
                status: formData.status,
            };
            setMessage({ msg: '', type: '' });
            fetchData(`/api/v1/sequence/steps?s_id=${slug}`, 'POST', postData).then((res) => {
                if (res.status === 'success') {
                    setFormData({
                        stepType: '',
                        intervalTimeDay: '',
                        intervalTimeHour: '',
                        intervalTimeMin: '',
                        execution_date: new Date(),
                        taskPriority: '0',
                        taskNote: '',
                        subject: '',
                        template: '',
                        status: 1
                    });
                    setSelectedTemplates([]);
                    setIsModalOpen(false);
                    setStepCallApi(true);
                    setMessage({ msg: 'Sequence step created successfully!', type: 'success' });
                    setTimeout(() => {
                        router.push({ pathname: `/sequences/view/${slug}`, query: { status: 'success' } });
                    }, 1000)
                } else {
                    setMessage({ msg: 'Please fill all required fields', type: 'error' });
                }
            });
        } else {
            setMessage({ msg: 'Please fill all required fields', type: 'error' });
        }
    }

    const handleChange = (e) => {
        const formDataTemp = { ...formData }
        formDataTemp[e.target.name] = e.target.value;
        setFormData(formDataTemp)
    }

    const saveSettings = (data) => {
        if (data.name && data.name !== '' && data.replies && data.replies !== '' && data.mailbox && data.mailbox !== '' && data.meetings && data.meetings !== '') {
            const postData = {
                id: slug,
                name: data.name,
                replies: data.replies,
                mailbox: data.mailbox,
                meetings: data.meetings,
            };
            setMessage({ msg: '', type: '' });
            fetchData('/api/v1/sequences', 'POST', postData).then((res) => {
                if (res.status === 'success') {
                    setMessage({ msg: 'Sequence created successfully!', type: 'success' });
                    setTimeout(() => {
                        router.push({ pathname: `/sequences/view/${slug}`, query: { status: 'success' } });
                    }, 1000)
                } else {
                    setMessage({ msg: 'Please fill all required fields', type: 'error' });
                }
            });
        } else {
            setMessage({ msg: 'Please fill all required fields', type: 'error' });
        }
    }

    const setSequenceDate = (date) => {
        const formDataTemp = { ...formData };
        formDataTemp['execution_date'] = date;
        setFormData(formDataTemp);
    }

    return (
        <DefaultLayout>
            {slug ? <div className="mx-auto max-w-screen-2xl p-4 md:p-6 2xl:p-10">
                <Breadcrumb pageName={`Sequence: ${sequence?.name}`} />
                {message.msg ? <Alert message={message} setMessage={setMessage} /> : null}
                <div className="mb-4 border-b border-gray-200 dark:border-gray-700 flex justify-between items-center">
                    <ul className="flex flex-wrap -mb-px text-sm font-medium text-center" id="default-styled-tab" data-tabs-toggle="#default-styled-tab-content" data-tabs-active-classes="text-purple-600 hover:text-purple-600 dark:text-purple-500 dark:hover:text-purple-500 border-purple-600 dark:border-purple-500" data-tabs-inactive-classes="dark:border-transparent text-gray-500 hover:text-gray-600 dark:text-gray-400 border-gray-100 hover:border-gray-300 dark:border-gray-700 dark:hover:text-gray-300" role="tablist">
                        <li className="me-2" role="presentation">
                            <button className={`inline-block p-4 border-b-2 rounded-t-lg ${activeTab === 'styled-overview' ? 'border-purple-600 text-purple-600 dark:text-purple-500' : 'hover:text-gray-600 hover:border-gray-300 dark:hover:text-gray-300'
                                }`} id="overview-styled-tab" data-tabs-target="#styled-overview" type="button" role="tab" aria-controls="overview" aria-selected={activeTab === 'styled-overview'} onClick={() => handleTabClick('styled-overview')}>Overview</button>
                        </li>
                        <li className="me-2" role="presentation">
                            <button className={`inline-block p-4 border-b-2 rounded-t-lg ${activeTab === 'styled-insights' ? 'border-purple-600 text-purple-600 dark:text-purple-500' : 'hover:text-gray-600 hover:border-gray-300 dark:hover:text-gray-300'
                                }`} id="insights-styled-tab" data-tabs-target="#styled-insights" type="button" role="tab" aria-controls="profile" aria-selected={activeTab === 'styled-insights'} onClick={() => handleTabClick('styled-insights')}>Insights</button>
                        </li>
                        <li className="me-2" role="presentation">
                            <button className={`inline-block p-4 border-b-2 rounded-t-lg ${activeTab === 'styled-settings' ? 'border-purple-600 text-purple-600 dark:text-purple-500' : 'hover:text-gray-600 hover:border-gray-300 dark:hover:text-gray-300'
                                }`} id="settings-styled-tab" data-tabs-target="#styled-settings" type="button" role="tab" aria-controls="settings" aria-selected={activeTab === 'styled-settings'} onClick={() => handleTabClick('styled-settings')}>Settings</button>
                        </li>
                        <li role="presentation">
                            <button className={`inline-block p-4 border-b-2 rounded-t-lg ${activeTab === 'styled-prospects' ? 'border-purple-600 text-purple-600 dark:text-purple-500' : 'hover:text-gray-600 hover:border-gray-300 dark:hover:text-gray-300'
                                }`} id="prospects-styled-tab" data-tabs-target="#styled-prospects" type="button" role="tab" aria-controls="prospects" aria-selected={activeTab === 'styled-prospects'} onClick={() => handleTabClick('styled-prospects')}>Prospects</button>
                        </li>
                    </ul>
                    {
                        (activeTab === 'styled-overview' || activeTab === 'styled-prospects') ? <button className={`flex rounded-md bg-primary px-2 py-2.5 font-medium text-white`} onClick={() => handleModal(true)}>{activeTab === 'styled-overview' ? 'Add Step' : 'Assign Prospects'}</button> : null
                    }

                </div>
                <div id="default-styled-tab-content">
                    <div className={`p-4 rounded-lg bg-white ${activeTab === 'styled-overview' ? 'block' : 'hidden'
                        }`} id="styled-overview" role="tabpanel" aria-labelledby="overview-tab">
                        {slug ? <SequenceOverView id={slug} callStepApi={callStepApi} setStepCallApi={setStepCallApi} setMessage={setMessage} /> : null}
                    </div>
                    <div className={`p-4 rounded-lg bg-white ${activeTab === 'styled-insights' ? 'block' : 'hidden'
                        }`} id="styled-insights" role="tabpanel" aria-labelledby="insights-tab">
                        <p className="text-sm text-gray-500 dark:text-gray-400"> No records to show </p>
                    </div>
                    <div className={`p-4 rounded-lg bg-white ${activeTab === 'styled-settings' ? 'block' : 'hidden'
                        }`} id="styled-settings" role="tabpanel" aria-labelledby="settings-tab">
                        {slug ? <SequenceSetting id={slug} sequence={sequence} saveSettings={saveSettings} /> : null}
                    </div>
                    <div className={`p-4 rounded-lg bg-white ${activeTab === 'styled-prospects' ? 'block' : 'hidden'
                        }`} id="styled-prospects" role="tabpanel" aria-labelledby="prospects-tab">
                        {slug ? <SequenceProspects id={slug} prospects={prospects} setProspects={setProspects} assignedProspects={assignedProspects} setAssignedProspects={setAssignedProspects} setCallApi={setCallApi} callApi={callApi} setMessage={setMessage} /> : null}
                    </div>
                </div>
                <EmailAppModal
                    isOpen={isModalOpen}
                    onClose={handleModal}
                    confirmMsg={'Save'}
                    onConfirm={() => { createSequenceApi() }}>
                    {
                        activeTab === 'styled-overview' ? <CreateSequenceStep formData={formData} handleChange={handleChange} message={message} setMessage={setMessage} sequence={sequence} templates={templates} selectedTemplates={selectedTemplates} handleMultiSelectTemplates={handleMultiSelectTemplates} setSequenceDate={setSequenceDate} /> : <AssignSequenceProspects prospects={prospects} onChange={handleMultiSelectProspects} selectedProspects={selectedProspects} message={message} setMessage={setMessage} />
                    }
                </EmailAppModal>
            </div> : null}
        </DefaultLayout>
    );
}
