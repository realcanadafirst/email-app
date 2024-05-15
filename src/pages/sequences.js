import { useState } from "react";
import DefaultLayout from "@ft/ui-components/admin/Layouts/DefaultLayout";
import Breadcrumb from '@ft/ui-components/admin/breadcrumb';
import TableSequence from '@ft/ui-components/admin/TableSequence';
import EmailAppModal from '@ft/ui-components/admin/EmailAppModal';
import CreateSequence from '@ft/ui-components/admin/CreateSequence';
import { fetchData } from '@ft/services/apiService';
import { useRouter } from "next/router";
export default function Sequences() {
    const [formData, setFormData] = useState({
        name: '',
        options: '',
        schedule: '',
        mailbox: 'devops.mailbox1@gmail.com',
        status: 1
    });
    const [message, setMessage] = useState({ msg: '', type: '' });
    const router = useRouter();
    const handleChange = (e) => {
        const formDataTemp = { ...formData }
        formDataTemp[e.target.name] = e.target.value;
        setFormData(formDataTemp)
    }

    const createSequenceApi = () => {
        if (formData.name && formData.name !== '' && formData.options && formData.options !== '' && formData.mailbox && formData.mailbox !== '' && formData.status && formData.status !== '') {
            const postData = {
                name: formData.name,
                options: formData.options,
                mailbox: formData.mailbox,
                status: formData.status,
            };
            setMessage({ msg: '', type: '' });
            fetchData('/api/v1/sequences', 'POST', postData).then((res) => {
                if (res.status === 'success') {
                    console.log(res)
                    setMessage({ msg: 'Sequence created successfully!', type: 'success' });
                    setTimeout(() => {
                        router.push({ pathname: `/sequences/view/${res?.data['insertId']}`, query: { status: 'success' } });
                    }, 1000)
                } else {
                    setMessage({ msg: 'Please fill all required fields', type: 'error' });
                }
            });
        } else {
            setMessage({ msg: 'Please fill all required fields', type: 'error' });
        }
    }
    const [isModalOpen, setIsModalOpen] = useState(false);
    const handleModal = (value) => setIsModalOpen(value);
    return (
        <DefaultLayout>
            <div className="mx-auto max-w-screen-2xl p-4 md:p-6 2xl:p-10">
                <Breadcrumb pageName="Sequences" />
                <div className="flex flex-col-reverse justify-end gap-6 py-4.5 pl-4 pr-4 sm:flex-row lg:pl-10 lg:pr-7.5">
                    <button className={`flex rounded-md bg-primary px-5.5 py-2.5 font-medium text-white`} onClick={() => { handleModal(true) }}>
                        Create Sequence
                    </button>
                </div>
                <TableSequence setMessage={setMessage} />
                <EmailAppModal
                    isOpen={isModalOpen}
                    onClose={handleModal}
                    confirmMsg="Create"
                    onConfirm={() => { createSequenceApi() }}>
                    <CreateSequence formData={formData} handleChange={handleChange} message={message} setMessage={setMessage} />
                </EmailAppModal>
            </div>
        </DefaultLayout>
    );
}
