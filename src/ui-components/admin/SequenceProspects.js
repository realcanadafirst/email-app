import { useEffect, useState } from "react";
import { fetchData } from '@ft/services/apiService';
import MoreIcon from '@ft/ui-components/ions/MoreIcon';

const SequenceProspects = ({ id, assignedProspects, setAssignedProspects, callApi, setProspects, setCallApi, setMessage }) => {
    const [prospectsId, setProspectsId] = useState(null);
    useEffect(() => {
        if (callApi) {
            setCallApi(false);
            getProspects();
        }
    }, [callApi]);
    const getProspects = () => {
        fetchData(`/api/v1/sequence/prospects?s_id=${id}`, 'GET').then((res) => {
            if (res.status === 'success') {
                const prospects_t = res.data['prospects'];
                const prospects_a = res.data['assigned_prospects'];
                const assignedProspectsTemp = prospects_a.map(mainItem => {
                    const pros_data = JSON.parse(mainItem.prospects);
                    return {...pros_data, prospects_id: mainItem.id, id:mainItem.id, sequence_id:mainItem.sequence_id};
                });
                const options_t = prospects_t.filter(mainItem => !prospects_a.some(filterItem => {
                    const pros_data = JSON.parse(filterItem.prospects)
                    return pros_data.value === mainItem.id
                }));
                setAssignedProspects([...assignedProspectsTemp]);
                const options_temp = options_t.map((val) => { return { value: val.id, label: val.email, email: val.email, firstName: val.firstName, lastName: val.lastName, phoneNumber: val.phoneNumber } });
                setProspects([...options_temp]);
            } else {
                setMessage({ msg: 'Failed to get prospects please try again', type: 'error' });
            }
        });
    }
    const updateSequenceProspects = (prospectsId, status) => {
        fetchData(`/api/v1/sequence/prospects?c_id=${prospectsId}&status=${status}`, 'PUT').then((res) => {
            if (res.status === 'success') {
                getProspects();
                setMessage({ msg: 'Prospects deleted successfully!', type: 'success' });
            } else {
                setMessage({ msg: 'Failed to get prospects please try again', type: 'error' });
            }
        });
    }
    const handleMore = (value, event) => {
        event.stopPropagation()
        if (value === prospectsId) {
            setProspectsId(null);
        } else {
            setProspectsId(value);
        }
    };    
    return (
        <table className="w-full table-auto">
            <thead>
                <tr className="bg-gray-2 text-left dark:bg-meta-4">
                    <th className="min-w-[220px] px-4 py-4 font-medium text-black dark:text-white xl:pl-11">
                        Name
                    </th>
                    <th className="min-w-[150px] px-4 py-4 font-medium text-black dark:text-white">
                        Status
                    </th>
                    <th className="min-w-[120px] px-4 py-4 font-medium text-black dark:text-white">
                        Seuence Activity
                    </th>
                    <th className="px-4 py-4 font-medium text-black dark:text-white">
                        Actions
                    </th>
                </tr>
            </thead>
            <tbody>
                {assignedProspects && assignedProspects.map((contact, key) => (
                    <tr key={key} onClick={(e) => handleMore(null, event)}>
                        <td className="border-b border-[#eee] px-4 py-5 pl-9 dark:border-strokedark xl:pl-11">
                            <p className="text-black dark:text-white">
                                {contact.firstName} {contact.lastName}
                            </p>
                        </td>
                        <td className="border-b border-[#eee] px-4 py-5 dark:border-strokedark">
                            <p className="text-black dark:text-white">
                                -
                            </p>
                        </td>
                        <td className="border-b border-[#eee] px-4 py-5 dark:border-strokedark">
                            <p className={`inline-flex rounded-full bg-opacity-10 px-3 py-1 text-sm font-medium`}>
                                -
                            </p>
                        </td>
                        <td className="border-b border-[#eee] px-4 py-5 dark:border-strokedark flex">
                            <div className="relative flex rounded-full bg-opacity-10 px-3 py-1 text-sm font-medium">
                                <button className="hover:text-primary" onClick={(event) => handleMore(contact.id, event)}>
                                    <MoreIcon />
                                </button>
                                <div className={`absolute right-0 top-full z-40 w-40 space-y-1 rounded-sm border border-stroke bg-white p-1.5 shadow-default dark:border-strokedark dark:bg-boxdark ${prospectsId === contact.id ? 'block' : 'hidden'} `}>
                                    <button className="flex w-full items-center gap-2 rounded-sm px-4 py-1.5 text-left text-sm hover:bg-gray dark:hover:bg-meta-4 border-b border-stroke" onClick={() => updateSequenceProspects(contact.prospects_id, 2)}>
                                        Finish Sequence
                                    </button>
                                    <button className="flex w-full items-center gap-2 rounded-sm px-4 py-1.5 text-left text-sm hover:bg-gray dark:hover:bg-meta-4 border-b border-stroke" onClick={() => updateSequenceProspects(contact.prospects_id, 3)}>
                                        Remove From Sequence
                                    </button>
                                </div>
                            </div>

                        </td>
                    </tr>
                ))}
                {(assignedProspects && assignedProspects.length < 1) &&
                    <tr>
                        <td className="border-b border-[#eee] px-4 py-5 pl-9 dark:border-strokedark xl:pl-11 text-center" colSpan={4}>
                            <h5 className="font-medium text-black dark:text-white">
                                No Record Found
                            </h5>
                        </td>
                    </tr>
                }
            </tbody>
        </table>
    );
};

export default SequenceProspects;
