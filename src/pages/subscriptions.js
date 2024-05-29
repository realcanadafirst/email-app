import Link from 'next/link';
import DefaultLayout from "@ft/ui-components/admin/Layouts/DefaultLayout";
import Breadcrumb from '@ft/ui-components/admin/breadcrumb';
import TableFeature from '@ft/ui-components/admin/TableFeature';
export default function Subscription() {
    return (
        <DefaultLayout>
            <div className="mx-auto max-w-screen-2xl p-4 md:p-6 2xl:p-10">
                <Breadcrumb pageName="Subscription" />
                <div className="flex flex-col-reverse justify-end gap-6 py-4.5 pl-4 pr-4 sm:flex-row lg:pl-10 lg:pr-7.5">
                    <Link href="/subscriptions/create" className={`flex rounded-md bg-primary px-5.5 py-2.5 font-medium text-white`}>
                        Add Features
                    </Link>
                </div>
                <TableFeature />
            </div>
        </DefaultLayout>
    );
}
