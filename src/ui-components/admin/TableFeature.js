import { useEffect, useState } from "react";
import { fetchData } from '@ft/services/apiService';
import { format } from 'date-fns';
import { useRouter } from "next/router";

const TableFeature = () => {
    const [message, setMessage] = useState({ msg: '', type: '' });
    const [features, seFeatures] = useState(null);
    const router = useRouter();
    useEffect(() => {
        getFeatures()
    }, []);
    const getFeatures = () => {
        fetchData('/api/v1/subscriptions', 'GET').then((res) => {
            if (res.status === 'success') {
                seFeatures(res.data)
            } else {
                setMessage({ msg: 'Failed to get features please try again', type: 'error' });
            }
        });
    }
    const formatDateTime = (date) => {
        return format(date, 'MMMM d, yyyy');
    }
    const editTemplate = (id) => {
        router.push({ pathname: `/features/view/${id}` });
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
                                Basic Plan
                            </th>
                            <th className="min-w-[120px] px-4 py-4 font-medium text-white dark:text-white">
                                Standard Plan
                            </th>
                            <th className="min-w-[120px] px-4 py-4 font-medium text-white dark:text-white">
                                Professional Plan
                            </th>
                            <th className="min-w-[150px] px-4 py-4 font-medium text-white dark:text-white">
                                Status
                            </th>
                        </tr>
                    </thead>
                    <tbody>
                        {features && features.map((sequence, key) => (
                            <tr key={key} onClick={() => editTemplate(sequence.id)} className="cursor-pointer">
                                <td className="border-b border-[#eee] px-4 py-5 pl-9 dark:border-strokedark xl:pl-11">
                                    <p>{sequence.name}</p>
                                </td>
                                <td className="border-b border-[#eee] px-4 py-5 dark:border-strokedark">
                                    <p className={`inline-flex rounded-full bg-opacity-10 px-3 py-1 text-sm font-medium`}>0</p>
                                </td>
                                <td className="border-b border-[#eee] px-4 py-5 dark:border-strokedark">
                                    <p className={`inline-flex rounded-full bg-opacity-10 px-3 py-1 text-sm font-medium`}>0</p>
                                </td>
                                <td className="border-b border-[#eee] px-4 py-5 dark:border-strokedark">
                                    <p className={`inline-flex rounded-full bg-opacity-10 px-3 py-1 text-sm font-medium`}>0</p>
                                </td>
                                <td className="border-b border-[#eee] px-4 py-5 dark:border-strokedark">
                                    <p className={`inline-flex rounded-full bg-opacity-10 px-3 py-1 text-sm font-medium`}>0</p>
                                </td>
                            </tr>
                        ))}
                        {(features && features.length < 1) &&
                            <tr>
                                <td className="border-b border-[#eee] px-4 py-5 pl-9 dark:border-strokedark xl:pl-11 text-center" colSpan={6}>
                                    <h5 className="font-medium text-black dark:text-white">
                                        No Record Found
                                    </h5>
                                </td>
                            </tr>
                        }
                    </tbody>
                </table>
            </div>
        </div>
    );
};

export default TableFeature;
