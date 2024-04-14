import Header from '@ft/ui-components/admin/header/Header';
export const PageLayout = (props) => {
    return (
        <div className="dark:bg-boxdark-2 dark:text-bodydark">
            <div className="flex h-screen overflow-hidden">
                <div className="relative flex flex-1 flex-col overflow-y-auto overflow-x-hidden">
                    <Header />
                    <main>
                        {props.children}
                    </main>
                </div>
            </div>
        </div>
    );
};
