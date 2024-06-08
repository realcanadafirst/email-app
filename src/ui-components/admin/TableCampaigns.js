import { format } from 'date-fns';
import { useRouter } from "next/router";
const TableCampaigns = ({ campaigns }) => {
    const formatDateTime = (date) => format(date, 'MMMM d, yyyy');
    const router = useRouter();
    const showCount = (data = '') => {
        if(data){
            const result = JSON.parse(data);
            return result.length
        } else {
            return 0;
        }
    }
    const viewEmail = (id) => {
        router.push({ pathname: `/campaigns/edit`, query: { id } });
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
                                Receivers count
                            </th>
                            <th className="px-4 py-4 font-medium text-white dark:text-white">
                                Created
                            </th>
                        </tr>
                    </thead>
                    <tbody>
                        {campaigns && campaigns.map((campaign, key) => (
                            <tr key={key} onClick={() => viewEmail(campaign.id)} className="cursor-pointer">
                                <td className="border-b border-[#eee] px-4 py-5 pl-9 dark:border-strokedark xl:pl-11 text-black dark:text-white">
                                    <p>{campaign.campaign_name}</p>
                                </td>
                                <td className="border-b border-[#eee] px-4 py-5 dark:border-strokedark">
                                    <p className={`inline-flex rounded-full bg-opacity-10 px-3 py-1 text-sm font-medium text-black dark:text-white`}>
                                        {showCount(campaign?.receiver_data)}
                                    </p>
                                </td>
                                <td className="border-b border-[#eee] px-4 py-5 dark:border-strokedark">
                                    <p className={`inline-flex rounded-full bg-opacity-10 px-3 py-1 text-sm font-medium text-black dark:text-white`}> {campaign.created_at ? formatDateTime(campaign.created_at) : ''}</p>
                                </td>
                            </tr>
                        ))}
                        {(campaigns && campaigns.length < 1) &&
                            <tr>
                                <td className="border-b border-[#eee] px-4 py-5 pl-9 dark:border-strokedark xl:pl-11 text-center text-black dark:text-white" colSpan={6}>
                                    <h5 className="font-medium text-black dark:text-white"> No Record Found </h5>
                                </td>
                            </tr>
                        }
                    </tbody>
                </table>
            </div>
        </div>
    );
};

export default TableCampaigns;
