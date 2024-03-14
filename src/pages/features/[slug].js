'use client'
import { useState } from 'react';
import FormSwitcher from '@ft/ui-components/formSwitcher';
import Alert from '@ft/ui-components/Alert';
import Breadcrumb from '@ft/ui-components/breadcrumb';
import ApplicationList from '@ft/ui-components/ApplicationList';
const data = [
    {
        name: 'Gst no',
        attribute_key: "GST_NO",
        status: true,
    },
    {
        name: 'Pan validation',
        attribute_key: "PAN_VALIDATION",
        status: false,
    },
    {
        name: 'Multiline',
        attribute_key: "MULTILINE",
        status: true,
    }
];

export default function Feature(props) {
    const [envData, setEnvData] = useState(data);
    const [alertStatus, setAlertStatus] = useState(false);
    const [alertMessage, setAlertMessage] = useState({feature:'', status:false});

    const handleConfirmation = (key) => {
        envData[key].status = !envData[key].status;
        setEnvData(envData);
        setAlertStatus(true);
        
        setAlertMessage({feature:envData[key].name, status:envData[key].status} );
        setTimeout(() => {
            setAlertStatus(false);
        }, 7000)
    }
    console.log(props)
    return (
        <div className="mx-auto max-w-screen-2xl p-4 md:p-6 2xl:p-10">

            <div className="mx-auto max-w-270">
                <Breadcrumb pageName="Features List" />
                <div className="rounded-sm border border-stroke bg-white px-5 pt-6 pb-2.5 shadow-default dark:border-strokedark dark:bg-boxdark sm:px-7.5 xl:pb-1">
                    <h4 className="mb-6 text-xl font-semibold text-black dark:text-white">
                        Environment :
                    </h4>
                    {alertStatus && <Alert alertMessage={alertMessage} />}
                    <table className="w-full table-auto">
                        <thead>
                            <tr className="bg-gray-2 text-left dark:bg-meta-4">
                                <th className="min-w-[220px] py-4 px-4 font-medium text-black dark:text-white xl:pl-11">
                                    Feature Name
                                </th>
                                <th className="min-w-[150px] py-4 px-4 font-medium text-black dark:text-white">
                                    Atribute Key
                                </th>
                                <th className="min-w-[150px] py-4 px-4 font-medium text-black dark:text-white">
                                    Applications
                                </th>
                                <th className="py-4 px-4 font-medium text-black dark:text-white">
                                    Actions
                                </th>
                            </tr>
                        </thead>
                        <tbody>
                            {envData.map((env, key) => (
                                <tr key={key}>
                                    <td className="border-b border-[#eee] py-5 px-4 pl-9 dark:border-strokedark xl:pl-11">
                                        <h5 className="font-medium text-black dark:text-white">
                                            {env.name}
                                        </h5>
                                    </td>
                                    <td className="border-b border-[#eee] py-5 px-4 pl-9 dark:border-strokedark xl:pl-11">
                                        <h5 className="font-medium text-black dark:text-white">
                                            {env.attribute_key}
                                        </h5>
                                    </td>

                                    <td className="border-b border-[#eee] py-5 px-4 dark:border-strokedark">
                                        <p
                                            className={`inline-flex rounded-full bg-opacity-10 py-1 px-2 text-sm font-medium bg-success text-success`}
                                        >
                                            PWA
                                        </p>
                                        <p
                                            className={`inline-flex rounded-full bg-opacity-10 py-1 px-2 text-sm font-medium bg-success text-success m-2.5`}
                                        >
                                            C&C Service
                                        </p>
                                        <p
                                            className={`inline-flex rounded-full bg-opacity-10 py-1 px-2 text-sm font-medium bg-success text-success m-2.5`}
                                        >
                                            Payment service
                                        </p>
                                        <br />
                                        <p
                                            className={`inline-flex rounded-full bg-opacity-10 py-1 px-2 text-sm font-medium bg-success text-success m-2.5`}
                                        >
                                            Order service
                                        </p>
                                        {/* <ApplicationList /> */}
                                    </td>
                                    <td className="border-b border-[#eee] py-5 px-4 dark:border-strokedark">
                                        <div className="flex items-center space-x-3.5">
                                            <FormSwitcher
                                                name={env.name} enabled={env.status} id={key} handleConfirmation={handleConfirmation} />
                                        </div>
                                    </td>
                                </tr>
                            ))}
                        </tbody>
                    </table>
                </div>
            </div>
        </div>
    );
}
