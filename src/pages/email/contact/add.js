import Link from 'next/link';
import DefaultLayout from "@ft/ui-components/admin/Layouts/DefaultLayout";
import Breadcrumb from '@ft/ui-components/admin/breadcrumb';
export default function AddContact() {
    return (
        <DefaultLayout>
            <div className="mx-auto max-w-screen-2xl p-4 md:p-6 2xl:p-10">
                <div className="mx-auto max-w-270">
                    <Breadcrumb pageName="Add Contact" />

                    <div className="grid grid-cols-1">
                        <div className="flex flex-col gap-9">
                            <div className="rounded-sm border border-stroke bg-white shadow-default dark:border-strokedark dark:bg-boxdark">
                                <div className="flex flex-col-reverse justify-between gap-6 py-4.5 pl-4 pr-4 sm:flex-row lg:pl-10 lg:pr-7.5 border-b border-stroke">
                                    <div className="flex items-center gap-4">
                                        <h3 className="font-medium text-black dark:text-white">
                                            Add Contact
                                        </h3>

                                    </div>
                                    <div className="relative">
                                        <Link href="/email/contact" className={`flex rounded-md bg-primary px-5.5 py-2.5 font-medium text-white`}>
                                            Back
                                        </Link>
                                    </div>
                                </div>
                                <div className="p-6.5">
                                    <div className="mb-4.5">
                                        <label className="mb-3 block text-sm font-medium text-black dark:text-white">Name <span className="text-meta-1"></span></label>
                                        <input
                                            type="text"
                                            placeholder="Enter your Name"
                                            className="w-full rounded border-[1.5px] border-stroke bg-transparent px-5 py-3 text-black outline-none transition focus:border-primary active:border-primary disabled:cursor-default disabled:bg-whiter dark:border-form-strokedark dark:bg-form-input dark:text-white dark:focus:border-primary"
                                        />
                                    </div>

                                    <div className="mb-4.5">
                                        <label className="mb-3 block text-sm font-medium text-black dark:text-white">Email <span className="text-meta-1">*</span></label>
                                        <input
                                            type="email"
                                            placeholder="Enter your email address"
                                            className="w-full rounded border-[1.5px] border-stroke bg-transparent px-5 py-3 text-black outline-none transition focus:border-primary active:border-primary disabled:cursor-default disabled:bg-whiter dark:border-form-strokedark dark:bg-form-input dark:text-white dark:focus:border-primary"
                                        />
                                    </div>

                                    <div className="mb-4.5">
                                        <label className="mb-3 block text-sm font-medium text-black dark:text-white">Number</label>
                                        <input
                                            type="number"
                                            placeholder="Select subject"
                                            className="w-full rounded border-[1.5px] border-stroke bg-transparent px-5 py-3 text-black outline-none transition focus:border-primary active:border-primary disabled:cursor-default disabled:bg-whiter dark:border-form-strokedark dark:bg-form-input dark:text-white dark:focus:border-primary"
                                        />
                                    </div>

                                    <button className="flex w-full justify-center rounded bg-primary p-3 font-medium text-gray hover:bg-opacity-90">
                                        Save
                                    </button>
                                </div>
                            </div>
                        </div>
                    </div>

                </div>
            </div>
        </DefaultLayout>
    );
}
