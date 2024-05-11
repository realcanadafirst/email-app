import React, { useState, useEffect, useRef } from "react";
import Link from 'next/link';
import DefaultLayout from "@ft/ui-components/admin/Layouts/DefaultLayout";
import Breadcrumb from '@ft/ui-components/admin/breadcrumb';
import Image from "next/image";

export default function SendMessage({ id = 'multiSelect' }) {

    return (
        <DefaultLayout>
            <Breadcrumb pageName="Send Template" />

            <div className="rounded-sm border border-stroke bg-white shadow-default dark:border-strokedark dark:bg-boxdark">
                <div className="flex flex-col-reverse justify-between gap-6 py-4.5 pl-4 pr-4 sm:flex-row lg:pl-10 lg:pr-7.5 border-b border-stroke">
                    <div className="flex items-center gap-4">
                        <h3 className="font-medium text-black dark:text-white">
                            Send Template
                        </h3>
                    </div>
                    <div className="relative">
                        <Link href="/email/list" className={`flex rounded-md bg-primary px-5.5 py-2.5 font-medium text-white`}>
                            Back
                        </Link>
                    </div>
                </div>
                <div className="grid grid-cols-12 gap-4 md:gap-6 2xl:gap-7.5">
                    <div className="col-span-12 rounded-sm border border-stroke bg-white px-5 pb-5 pt-7.5 shadow-default dark:border-strokedark dark:bg-boxdark sm:px-7.5 xl:col-span-5">
                        <div className="mb-3 justify-between gap-4 sm:flex">
                            <div>
                                <h5 className="text-xl font-semibold text-black dark:text-white">
                                    Tempalte 1
                                </h5>
                            </div>
                        </div>
                        <div style={{ color: "#000000", fontFamily: 'Arial, sans-serif' }}>

                            <table style={{ maxWidth: '600px', margin: '0 auto', padding: '20px', borderCollapse: 'collapse' }}>
                                <tr>
                                    <td style={{ textAlign: 'center', padding: '20px', display: 'flex', alignItems: 'center', justifyContent: 'center'}}>
                                        <Image
                                            width={225}
                                            height={50}
                                            src={"/images/logo-no-background.png"}
                                            alt="Logo"
                                        />
                                    </td>
                                </tr>
                                <tr>
                                    <td>
                                        <p>Hello username,</p>
                                        <p style={{ lineHeight: 2, marginTop: '0.5rem' }}>We are thrilled to have you join our community. Thank you for signing up.</p>
                                        <p style={{ lineHeight: 2 }}> Message  </p>
                                    </td>
                                </tr>
                                <tr>
                                    <td>
                                        <p style={{ marginTop: '1rem' }}>Best regards,<br />The Team</p>
                                    </td>
                                </tr>
                            </table>

                            <footer style={{ textAlign: 'center' }}>

                                <p style={{ marginTop: '1.5rem', textAlign: 'center' }}>
                                    This email was sent to <a href="#" style={{ color: 'rgb(37 99 235)' }} target="_blank">contact@email-app.com</a>.
                                    If you&apos;d rather not receive this kind of email, you can <a href="#" style={{ color: 'rgb(37 99 235)' }}>unsubscribe</a> or <a href="#" style={{ color: 'rgb(37 99 235)' }}>manage your email preferences</a>.
                                </p>

                                <p style={{ maxWidth: '600px', margin: '0 auto', padding: '20px', borderCollapse: 'collapse' }}>© 2024 Email app. All Rights Reserved.</p>
                            </footer>
                        </div>

                    </div>


                    <div className="col-span-12 rounded-sm border border-stroke bg-white px-5 pb-5 pt-7.5 shadow-default dark:border-strokedark dark:bg-boxdark sm:px-7.5 xl:col-span-5">
                        <div className="mb-3 justify-between gap-4 sm:flex">
                            <div>
                                <h5 className="text-xl font-semibold text-black dark:text-white">
                                    Tempalte 2
                                </h5>
                            </div>
                        </div>


                        <div className="-mx-8 flex flex-wrap items-center justify-center gap-y-3">
                            <section className="max-w-2xl px-6 py-8 mx-auto bg-white dark:bg-gray-900">
                                <header>
                                    <Link href="/">
                                        <Image
                                            className="w-auto mx-auto h-7 sm:h-8"
                                            width={50}
                                            height={50}
                                            src={"/images/logo-no-background.png"}
                                            alt="Logo"
                                        />
                                    </Link>
                                </header>

                                <main className="mt-8">
                                    <h2 className="mt-6 text-gray-700 dark:text-gray-200">Hi Olivia,</h2>

                                    <p className="mt-2 leading-loose text-gray-600 dark:text-gray-300">
                                        Welcome to Email App! You&apos;re already on your way to creating beautiful visual products.
                                        We&apos;ve created a quick intro video to get you up and running as soon as possible.
                                        If you have any questions, <a href="#" className="underline transition-colors duration-200 hover:text-blue-600 dark:hover:text-blue-400">please get in touch</a>.
                                    </p>



                                    <p className="mt-2 text-gray-600 dark:text-gray-300">
                                        Thanks, <br />
                                        Email App
                                    </p>
                                </main>


                                <footer className="mt-8 text-center">

                                    <p className="mt-6 text-gray-500 dark:text-gray-400">
                                        This email was sent to <a href="#" className="text-blue-600 hover:underline dark:text-blue-400" target="_blank">contact@email-app.com</a>.
                                        If you&apos;d rather not receive this kind of email, you can <a href="#" className="text-blue-600 hover:underline dark:text-blue-400">unsubscribe</a> or <a href="#" className="text-blue-600 hover:underline dark:text-blue-400">manage your email preferences</a>.
                                    </p>

                                    <p className="mt-3 text-gray-500 dark:text-gray-400">© 2024 Meraki UI. All Rights Reserved.</p>
                                </footer>
                            </section>
                        </div>
                    </div>


                </div>
            </div>
        </DefaultLayout>
    );
}
