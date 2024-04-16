import Link from 'next/link';
import DefaultLayout from "@ft/ui-components/admin/Layouts/DefaultLayout";
import Breadcrumb from '@ft/ui-components/admin/breadcrumb';
import TableOne from '@ft/ui-components/admin/TableOne';
export default function Contact() {
    return (
        <DefaultLayout>
            <div className="mx-auto max-w-screen-2xl p-4 md:p-6 2xl:p-10">
                <div className="mx-auto max-w-270">
                    <Breadcrumb pageName="Contact list" />
                    <div className="flex flex-col-reverse justify-between gap-6 py-4.5 pl-4 pr-4 sm:flex-row lg:pl-10 lg:pr-7.5">

                        <div className="relative">
                            <div className="px-4 pt-4">
                                <Link href="/email/contact/add" className={`flex w-full rounded-md bg-primary px-5.5 py-2.5 font-medium text-white`}>
                                    Add Contact
                                </Link>
                            </div>
                        </div>
                    </div>
                    <TableOne />
                </div>
            </div>
        </DefaultLayout>
    );
}
