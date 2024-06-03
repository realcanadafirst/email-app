'use client' // only in App Router
import dynamic from 'next/dynamic';
import { CopyToClipboard } from 'react-copy-to-clipboard';
const CustomEditor = dynamic(() => { return import('@ft/ui-components/custom-editor'); }, { ssr: false });

export default function AddTemplateForm({ formData, handleChange, dataChange }) {
    return (
        <>
            <div className="mb-5.5 flex flex-col gap-5.5 sm:flex-row">
                <div className="w-full">
                    <label className="mb-3 block text-sm font-medium text-black dark:text-white" htmlFor="subject">
                        Subject
                    </label>
                    <div className="relative">
                        <input
                            placeholder="Subject"
                            className="w-full rounded border border-stroke bg-gray py-3 pr-4.5 text-black focus:border-primary focus-visible:outline-none dark:border-strokedark dark:bg-meta-4 dark:text-white dark:focus:border-primary"
                            type="text"
                            name="subject"
                            onChange={handleChange}
                            value={formData.subject}
                        />
                    </div>
                </div>
            </div>

            <div className="mb-5.5">
                <label className="mb-3 block text-sm font-medium text-black dark:text-white">Content <span className="text-meta-1">*</span> </label>
                <p className="mb-3">
                    Note: Click to Copy Varriables
                    <CopyToClipboard text={'{{senderCompany}}'}>
                        <button className="px-3"> {'{{senderCompany}}'} </button>
                    </CopyToClipboard>
                    <CopyToClipboard text={'{{senderName}}'}>
                        <button className="px-3"> {'{{senderName}}'} </button>
                    </CopyToClipboard>
                    <CopyToClipboard text={'{{firstName}}'}>
                        <button className="px-3"> {'{{firstName}}'} </button>
                    </CopyToClipboard>
                    <CopyToClipboard text={'{{lastName}}'}>
                        <button className="px-3"> {'{{lastName}}'} </button>
                    </CopyToClipboard>
                    <CopyToClipboard text={'{{mobileNumber}}'}>
                        <button className="px-3"> {'{{mobileNumber}}'} </button>
                    </CopyToClipboard>
                    <CopyToClipboard text={'{{email}}'}>
                        <button className="px-3"> {'{{email}}'} </button>
                    </CopyToClipboard>
                    <CopyToClipboard text={'{{orgName}}'}>
                        <button className="px-3"> {'{{orgName}}'} </button>
                    </CopyToClipboard>
                </p>
                <CustomEditor
                    initialData={formData.template}
                    dataChange={dataChange}
                />
            </div>
        </>
    );
}
