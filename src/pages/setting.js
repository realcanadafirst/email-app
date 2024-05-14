import { useState } from "react";
import DefaultLayout from "@ft/ui-components/admin/Layouts/DefaultLayout";
import Breadcrumb from '@ft/ui-components/admin/breadcrumb';
import Alert from "@ft/ui-components/admin/Alert";
export default function AppSetting() {
    const [message, setMessage] = useState({ msg: '', type: '' });
    return (
        <DefaultLayout>
            <div className="mx-auto max-w-screen-2xl p-4 md:p-6 2xl:p-10">
                <div className="mx-auto max-w-270">
                    <Breadcrumb pageName="App setings" />
                    <Alert message={message} setMessage={setMessage} />
                    hjhg
                </div>
            </div>
        </DefaultLayout>
    );
}
