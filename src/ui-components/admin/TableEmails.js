import { useState } from "react";
import { format } from 'date-fns';
import { useRouter } from "next/router";
import EmailAppModal from '@ft/ui-components/admin/EmailAppModal';
import DeleteIcon from '@ft/ui-components/ions/DeleteIcon';
const TableEmails = ({ emails, deleteProspects }) => {
    const [isModalOpen, setIsModalOpen] = useState(false);
    const [emailId, setEmailId] = useState(null);
    const formatDateTime = (date) => format(date, 'MMMM d, yyyy');
    const router = useRouter();
    const showCount = (data = [], type) => {
        const datar = data.filter((val) => !(val[type] === '0' || val[type] === null));
        return datar ? (type === 'email_sent' ? (data.length - datar.length) : datar.length) : 0;
    }
    const viewEmail = (id) => {
        router.push({ pathname: `/email/view/${id}` });
    }
    const handleModal = (value) => setIsModalOpen(value);
    const handleConfirmAction = () => {
        setIsModalOpen(false);
        deleteProspects(emailId);
    }
    return (
        <div className="rounded-sm border border-stroke bg-white shadow-default rounded-[10px] dark:border-strokedark dark:bg-boxdark">
            <div className="max-w-full overflow-x-auto rounded-[10px]">
                <table className="w-full table-auto">
                    <thead>
                        <tr className="bg-primary text-left dark:bg-meta-4">
                            <th className="min-w-[220px] px-4 py-4 font-medium text-white dark:text-white xl:pl-11">
                                Name
                            </th>
                            <th className="min-w-[120px] px-4 py-4 font-medium text-white dark:text-white">
                                Receivers
                            </th>
                            <th className="min-w-[150px] px-4 py-4 font-medium text-white dark:text-white">
                                Failed
                            </th>
                            <th className="min-w-[150px] px-4 py-4 font-medium text-white dark:text-white">
                                Opened
                            </th>
                            <th className="min-w-[150px] px-4 py-4 font-medium text-white dark:text-white">
                                Clicked
                            </th>
                            <th className="px-4 py-4 font-medium text-white dark:text-white">
                                Replied
                            </th>
                            <th className="px-4 py-4 font-medium text-white dark:text-white">
                                Created
                            </th>
                            <th className="px-4 py-4 font-medium text-white dark:text-white">
                                Action
                            </th>
                        </tr>
                    </thead>
                    <tbody>
                        {emails && emails.map((sequence, key) => (
                            <tr key={key} className="cursor-pointer">
                                <td className="border-b border-[#eee] px-4 py-5 pl-9 dark:border-strokedark xl:pl-11" onClick={() => viewEmail(sequence.id)} >
                                    <p>{sequence.subject}</p>
                                </td>
                                <td className="border-b border-[#eee] px-4 py-5 dark:border-strokedark">
                                    <p className={`inline-flex rounded-full bg-opacity-10 px-3 py-1 text-sm font-medium`}>
                                        {sequence?.prospects ? `${sequence.prospects.length}` : '0'}
                                    </p>
                                </td>
                                <td className="border-b border-[#eee] px-4 py-5 dark:border-strokedark">
                                    <p className={`inline-flex rounded-full bg-opacity-10 px-3 py-1 text-sm font-medium`}>{showCount(sequence.prospects, 'email_sent')}</p>
                                </td>
                                <td className="border-b border-[#eee] px-4 py-5 dark:border-strokedark">
                                    <p className={`inline-flex rounded-full bg-opacity-10 px-3 py-1 text-sm font-medium`}>{showCount(sequence.prospects, 'opened')}</p>
                                </td>
                                <td className="border-b border-[#eee] px-4 py-5 dark:border-strokedark">
                                    <p className={`inline-flex rounded-full bg-opacity-10 px-3 py-1 text-sm font-medium`}>{showCount(sequence.prospects, 'clicked')}</p>
                                </td>
                                <td className="border-b border-[#eee] px-4 py-5 dark:border-strokedark">
                                    <p className={`inline-flex rounded-full bg-opacity-10 px-3 py-1 text-sm font-medium`}>{showCount(sequence.prospects, 'replied')}</p>
                                </td>
                                <td className="border-b border-[#eee] px-4 py-5 dark:border-strokedark">
                                    <p className={`inline-flex rounded-full bg-opacity-10 px-3 py-1 text-sm font-medium`}> {sequence.created_at ? formatDateTime(sequence.created_at) : ''}</p>
                                </td>
                                <td className="border-b border-[#eee] px-4 py-5 dark:border-strokedark">
                                    <div className="flex items-center space-x-3.5">
                                        <button className="hover:text-primary text-black dark:text-white" onClick={() => {
                                            setEmailId(sequence.id)
                                            handleModal(true);
                                        }}>
                                            <DeleteIcon />
                                        </button>
                                    </div>
                                </td>
                            </tr>
                        ))}
                        {(emails && emails.length < 1) &&
                            <tr>
                                <td className="border-b border-[#eee] px-4 py-5 pl-9 dark:border-strokedark xl:pl-11 text-center" colSpan={6}>
                                    <h5 className="font-medium text-black dark:text-white"> No Record Found </h5>
                                </td>
                            </tr>
                        }
                    </tbody>
                </table>
            </div>
            <EmailAppModal
                isOpen={isModalOpen}
                onClose={handleModal}
                onConfirm={() => { handleConfirmAction() }}>
                <p className="text-black dark:text-white"> Are you sure you want to delete email. </p>
            </EmailAppModal>
        </div>
    );
};

export default TableEmails;
