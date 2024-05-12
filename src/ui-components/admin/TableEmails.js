import { format } from 'date-fns';
const TableEmails = ({ emails }) => {
    const formatDateTime = (date) => format(date, 'MMMM d, yyyy');
    return (
        <div className="rounded-sm border border-stroke bg-white px-5 pb-2.5 pt-6 shadow-default dark:border-strokedark dark:bg-boxdark sm:px-7.5 xl:pb-1">
            <div className="max-w-full overflow-x-auto">
                <table className="w-full table-auto">
                    <thead>
                        <tr className="bg-gray-2 text-left dark:bg-meta-4">
                            <th className="min-w-[220px] px-4 py-4 font-medium text-black dark:text-white xl:pl-11">
                                Name
                            </th>
                            <th className="min-w-[120px] px-4 py-4 font-medium text-black dark:text-white">
                                Contacted
                            </th>
                            <th className="min-w-[150px] px-4 py-4 font-medium text-black dark:text-white">
                                Opened
                            </th>
                            <th className="min-w-[150px] px-4 py-4 font-medium text-black dark:text-white">
                                Clicked
                            </th>
                            <th className="px-4 py-4 font-medium text-black dark:text-white">
                                Replied
                            </th>
                            <th className="px-4 py-4 font-medium text-black dark:text-white">
                                Created
                            </th>
                        </tr>
                    </thead>
                    <tbody>
                        {emails && emails.map((sequence, key) => (
                            <tr key={key}>
                                <td className="border-b border-[#eee] px-4 py-5 pl-9 dark:border-strokedark xl:pl-11">
                                    <p>{sequence.subject}</p>
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
                                <td className="border-b border-[#eee] px-4 py-5 dark:border-strokedark">
                                    <p className={`inline-flex rounded-full bg-opacity-10 px-3 py-1 text-sm font-medium`}>{formatDateTime(sequence.created_at)}</p>
                                </td>
                            </tr>
                        ))}
                        {(emails && emails.length < 1) &&
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

export default TableEmails;
