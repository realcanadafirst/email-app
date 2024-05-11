import React, { useState, useEffect, useRef } from "react";
import Link from 'next/link';
import DefaultLayout from "@ft/ui-components/admin/Layouts/DefaultLayout";
import Breadcrumb from '@ft/ui-components/admin/breadcrumb';
import { useRouter } from "next/router";

export default function SendMessage({ id = 'multiSelect' }) {

    const [options, setOptions] = useState([]);
    const [selected, setSelected] = useState([]);
    const [show, setShow] = useState(false);
    const dropdownRef = useRef(null);
    const trigger = useRef(null);
    const [isOptionSelected, setIsOptionSelected] = useState(false);

    const [formData, setFormData] = useState({
        from: 'devops.mailbox1@gmail.com',
        to: '',
        template: '',
        message: ''
    });
    const [message, setMessage] = useState({ msg: '', type: '' });
    const router = useRouter();
    const changeTextColor = () => {
        setIsOptionSelected(true);
    };

    useEffect(() => {
        const loadOptions = () => {
            const select = document.getElementById(id);
            if (select) {
                const newOptions = [];
                for (let i = 0; i < select.options.length; i++) {
                    newOptions.push({
                        value: select.options[i].value,
                        text: select.options[i].innerText,
                        selected: select.options[i].hasAttribute("selected"),
                    });
                }
                setOptions(newOptions);
            }
        };

        loadOptions();
    }, [id]);

    const open = () => {
        setShow(true);
    };

    const isOpen = () => {
        return show === true;
    };

    const select = (index, event) => {
        const newOptions = [...options];

        if (!newOptions[index].selected) {
            newOptions[index].selected = true;
            newOptions[index].element = event.currentTarget;
            setSelected([...selected, index]);
        } else {
            const selectedIndex = selected.indexOf(index);
            if (selectedIndex !== -1) {
                newOptions[index].selected = false;
                setSelected(selected.filter((i) => i !== index));
            }
        }

        setOptions(newOptions);
    };

    const remove = (index) => {
        const newOptions = [...options];
        const selectedIndex = selected.indexOf(index);

        if (selectedIndex !== -1) {
            newOptions[index].selected = false;
            setSelected(selected.filter((i) => i !== index));
            setOptions(newOptions);
        }
    };

    const selectedValues = () => {
        return selected.map((option) => options[option].value);
    };

    useEffect(() => {
        const clickHandler = ({ target }) => {
            if (!dropdownRef.current) return;
            if (
                !show ||
                dropdownRef.current.contains(target) ||
                trigger.current.contains(target)
            )
                return;
            setShow(false);
        };
        document.addEventListener("click", clickHandler);
        return () => document.removeEventListener("click", clickHandler);
    });

    const handleChange = (e) => {
        const formDataTemp = { ...formData }
        formDataTemp[e.target.name] = e.target.value;
        setFormData(formDataTemp)
    }

    const sendMail = () => {
        if (formData.from && formData.from !== '' && formData.to && formData.to !== '' && formData.template && formData.template !== '' && formData.message && formData.message !== '') {
            const postData = {
                // Add any data you need to send in the request body
                from: formData.from,
                to: formData.to,
                template: formData.template,
                message: formData.message,
            };

            // Options for the fetch request
            const requestOptions = {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json', // Specify content type as JSON
                },
                body: JSON.stringify(postData), // Convert data to JSON string
            };
            const response = fetch('http://localhost:3000/api/email/send', requestOptions);

            //setMessage({ msg: 'sent', type: '' });
            //router.push('/email/list')
        } else {
            setMessage({ msg: 'Please fill all required fields', type: 'error' });
        }
    }

    return (
        <DefaultLayout>
            <div className="mx-auto max-w-screen-2xl p-4 md:p-6 2xl:p-10">
                <div className="mx-auto max-w-270">
                    <Breadcrumb pageName="Send Email" />
                    <div className="grid grid-cols-1">
                        <div className="flex flex-col gap-9">
                            <div className="rounded-sm border border-stroke bg-white shadow-default dark:border-strokedark dark:bg-boxdark">
                                <div className="flex flex-col-reverse justify-between gap-6 py-4.5 pl-4 pr-4 sm:flex-row lg:pl-10 lg:pr-7.5 border-b border-stroke">
                                    <div className="flex items-center gap-4">
                                        <h3 className="font-medium text-black dark:text-white">
                                            Send Email
                                        </h3>
                                    </div>
                                    <div className="relative">
                                        <Link href="/email/list" className={`flex rounded-md bg-primary px-5.5 py-2.5 font-medium text-white`}>
                                            Back
                                        </Link>
                                    </div>
                                </div>
                                {
                                    message.msg && <div className="flex w-full border-l-6 border-[#F87171] bg-[#F87171] bg-opacity-[15%] px-5 py-3 shadow-md dark:bg-[#1B1B24] dark:bg-opacity-30 md:p-5">
                                        <div className="mr-5 flex h-9 w-full max-w-[36px] items-center justify-center rounded-lg bg-[#F87171]">
                                            <svg
                                                width="13"
                                                height="13"
                                                viewBox="0 0 13 13"
                                                fill="none"
                                                xmlns="http://www.w3.org/2000/svg"
                                            >
                                                <path
                                                    d="M6.4917 7.65579L11.106 12.2645C11.2545 12.4128 11.4715 12.5 11.6738 12.5C11.8762 12.5 12.0931 12.4128 12.2416 12.2645C12.5621 11.9445 12.5623 11.4317 12.2423 11.1114C12.2422 11.1113 12.2422 11.1113 12.2422 11.1113C12.242 11.1111 12.2418 11.1109 12.2416 11.1107L7.64539 6.50351L12.2589 1.91221L12.2595 1.91158C12.5802 1.59132 12.5802 1.07805 12.2595 0.757793C11.9393 0.437994 11.4268 0.437869 11.1064 0.757418C11.1063 0.757543 11.1062 0.757668 11.106 0.757793L6.49234 5.34931L1.89459 0.740581L1.89396 0.739942C1.57364 0.420019 1.0608 0.420019 0.740487 0.739944C0.42005 1.05999 0.419837 1.57279 0.73985 1.89309L6.4917 7.65579ZM6.4917 7.65579L1.89459 12.2639L1.89395 12.2645C1.74546 12.4128 1.52854 12.5 1.32616 12.5C1.12377 12.5 0.906853 12.4128 0.758361 12.2645L1.1117 11.9108L0.758358 12.2645C0.437984 11.9445 0.437708 11.4319 0.757539 11.1116C0.757812 11.1113 0.758086 11.111 0.75836 11.1107L5.33864 6.50287L0.740487 1.89373L6.4917 7.65579Z"
                                                    fill="#ffffff"
                                                    stroke="#ffffff"
                                                ></path>
                                            </svg>
                                        </div>
                                        <div className="w-full">
                                            <h5 className="mb-3 font-semibold text-[#B45454]">
                                                {message.msg}
                                            </h5>
                                        </div>
                                    </div>
                                }

                                <div className="p-6.5">
                                    <div className="mb-4.5">
                                        <label className="mb-3 block text-sm font-medium text-black dark:text-white">From <span className="text-meta-1">*</span></label>
                                        <input
                                            type="email"
                                            placeholder="from email"
                                            className="w-full rounded border-[1.5px] border-stroke bg-transparent px-5 py-3 text-black outline-none transition focus:border-primary active:border-primary disabled:cursor-default disabled:bg-whiter dark:border-form-strokedark dark:bg-form-input dark:text-white dark:focus:border-primary"
                                            name="from"
                                            onChange={handleChange}
                                            value={formData.from}
                                        />
                                    </div>

                                    <div className="mb-4.5">
                                        <label className="mb-3 block text-sm font-medium text-black dark:text-white">Receivers <span className="text-meta-1">*</span></label>
                                        <input
                                            type="text"
                                            placeholder="Receivers email"
                                            className="w-full rounded border-[1.5px] border-stroke bg-transparent px-5 py-3 text-black outline-none transition focus:border-primary active:border-primary disabled:cursor-default disabled:bg-whiter dark:border-form-strokedark dark:bg-form-input dark:text-white dark:focus:border-primary"
                                            name="to"
                                            onChange={handleChange}
                                            value={formData.to}
                                        />
                                    </div>
                                    {/* 
                                    <div className="mb-4.5">
                                        <label className="mb-3 block text-sm font-medium text-black dark:text-white">Receivers <span className="text-meta-1">*</span></label>
                                        <div>
                                            <select className="hidden" id={id}>
                                                <option value="1">devops.mailbox1@gmail.com</option>
                                                <option value="2">manish.mailbox94@gmail.com</option>
                                                <option value="3">user2devops@gmail.com</option>
                                                <option value="4">manish@yopmail.com 5</option>
                                            </select>

                                            <div className="flex flex-col items-center">
                                                <input name="values" type="hidden" defaultValue={selectedValues()} />
                                                <div className="relative z-20 inline-block w-full">
                                                    <div className="relative flex flex-col items-center">
                                                        <div ref={trigger} onClick={open} className="w-full">
                                                            <div className="mb-2 flex rounded border border-stroke py-2 pl-3 pr-3 outline-none transition focus:border-primary active:border-primary dark:border-form-strokedark dark:bg-form-input">
                                                                <div className="flex flex-auto flex-wrap gap-3">
                                                                    {selected.map((index) => (
                                                                        <div
                                                                            key={index}
                                                                            className="my-1.5 flex items-center justify-center rounded border-[.5px] border-stroke bg-gray px-2.5 py-1.5 text-sm font-medium dark:border-strokedark dark:bg-white/30"
                                                                        >
                                                                            <div className="max-w-full flex-initial">
                                                                                {options[index].text}
                                                                            </div>
                                                                            <div className="flex flex-auto flex-row-reverse">
                                                                                <div
                                                                                    onClick={() => remove(index)}
                                                                                    className="cursor-pointer pl-2 hover:text-danger"
                                                                                >
                                                                                    <svg
                                                                                        className="fill-current"
                                                                                        role="button"
                                                                                        width="12"
                                                                                        height="12"
                                                                                        viewBox="0 0 12 12"
                                                                                        fill="none"
                                                                                        xmlns="http://www.w3.org/2000/svg"
                                                                                    >
                                                                                        <path
                                                                                            fillRule="evenodd"
                                                                                            clipRule="evenodd"
                                                                                            d="M9.35355 3.35355C9.54882 3.15829 9.54882 2.84171 9.35355 2.64645C9.15829 2.45118 8.84171 2.45118 8.64645 2.64645L6 5.29289L3.35355 2.64645C3.15829 2.45118 2.84171 2.45118 2.64645 2.64645C2.45118 2.84171 2.45118 3.15829 2.64645 3.35355L5.29289 6L2.64645 8.64645C2.45118 8.84171 2.45118 9.15829 2.64645 9.35355C2.84171 9.54882 3.15829 9.54882 3.35355 9.35355L6 6.70711L8.64645 9.35355C8.84171 9.54882 9.15829 9.54882 9.35355 9.35355C9.54882 9.15829 9.54882 8.84171 9.35355 8.64645L6.70711 6L9.35355 3.35355Z"
                                                                                            fill="currentColor"
                                                                                        ></path>
                                                                                    </svg>
                                                                                </div>
                                                                            </div>
                                                                        </div>
                                                                    ))}
                                                                    {selected.length === 0 && (
                                                                        <div className="flex-1">
                                                                            <input
                                                                                placeholder="Select an option"
                                                                                className="h-full w-full appearance-none bg-transparent p-1 px-2 outline-none"
                                                                                defaultValue={selectedValues()}
                                                                            />
                                                                        </div>
                                                                    )}
                                                                </div>
                                                                <div className="flex w-8 items-center py-1 pl-1 pr-1">
                                                                    <button
                                                                        type="button"
                                                                        onClick={open}
                                                                        className="h-6 w-6 cursor-pointer outline-none focus:outline-none"
                                                                    >
                                                                        <svg
                                                                            width="24"
                                                                            height="24"
                                                                            viewBox="0 0 24 24"
                                                                            fill="none"
                                                                            xmlns="http://www.w3.org/2000/svg"
                                                                        >
                                                                            <g opacity="0.8">
                                                                                <path
                                                                                    fillRule="evenodd"
                                                                                    clipRule="evenodd"
                                                                                    d="M5.29289 8.29289C5.68342 7.90237 6.31658 7.90237 6.70711 8.29289L12 13.5858L17.2929 8.29289C17.6834 7.90237 18.3166 7.90237 18.7071 8.29289C19.0976 8.68342 19.0976 9.31658 18.7071 9.70711L12.7071 15.7071C12.3166 16.0976 11.6834 16.0976 11.2929 15.7071L5.29289 9.70711C4.90237 9.31658 4.90237 8.68342 5.29289 8.29289Z"
                                                                                    fill="#637381"
                                                                                ></path>
                                                                            </g>
                                                                        </svg>
                                                                    </button>
                                                                </div>
                                                            </div>
                                                        </div>
                                                        <div className="w-full px-4">
                                                            <div
                                                                className={`max-h-select absolute left-0 top-full z-40 w-full overflow-y-auto rounded bg-white shadow dark:bg-form-input ${isOpen() ? "" : "hidden"
                                                                    }`}
                                                                ref={dropdownRef}
                                                                onFocus={() => setShow(true)}
                                                                onBlur={() => setShow(false)}
                                                            >
                                                                <div className="flex w-full flex-col">
                                                                    {options.map((option, index) => (
                                                                        <div key={index}>
                                                                            <div
                                                                                className="w-full cursor-pointer rounded-t border-b border-stroke hover:bg-primary/5 dark:border-form-strokedark"
                                                                                onClick={(event) => select(index, event)}
                                                                            >
                                                                                <div
                                                                                    className={`relative flex w-full items-center border-l-2 border-transparent p-2 pl-2 ${option.selected ? "border-primary" : ""
                                                                                        }`}
                                                                                >
                                                                                    <div className="flex w-full items-center">
                                                                                        <div className="mx-2 leading-6">
                                                                                            {option.text}
                                                                                        </div>
                                                                                    </div>
                                                                                </div>
                                                                            </div>
                                                                        </div>
                                                                    ))}
                                                                </div>
                                                            </div>
                                                        </div>
                                                    </div>
                                                </div>
                                            </div>
                                        </div>

                                    </div> */}

                                    <div className="mb-4.5">
                                        <label className="mb-3 block text-sm font-medium text-black dark:text-white">Template <span className="text-meta-1">*</span> </label>
                                        <select
                                            value={formData.template}
                                            onChange={(e) => {
                                                handleChange(e);
                                                changeTextColor();
                                            }}
                                            className={`relative z-20 w-full appearance-none rounded border border-stroke bg-transparent px-12 py-3 outline-none transition focus:border-primary active:border-primary dark:border-form-strokedark dark:bg-form-input ${isOptionSelected ? "text-black dark:text-white" : ""
                                                }`}
                                            name="template"
                                        >
                                            <option value="" disabled className="text-body dark:text-bodydark">
                                                Select Template
                                            </option>
                                            <option value="1" className="text-body dark:text-bodydark">
                                                Welcome Template
                                            </option>

                                        </select>
                                    </div>

                                    <div className="mb-4.5">
                                        <label className="mb-3 block text-sm font-medium text-black dark:text-white">Content <span className="text-meta-1">*</span> </label>
                                        <textarea
                                            rows={6}
                                            name="message"
                                            placeholder="write your content"
                                            className="w-full rounded-lg border-[1.5px] border-stroke bg-transparent px-5 py-3 text-black outline-none transition focus:border-primary active:border-primary disabled:cursor-default disabled:bg-whiter dark:border-form-strokedark dark:bg-form-input dark:text-white dark:focus:border-primary"
                                            value={formData.message}
                                            onChange={handleChange}
                                        ></textarea>
                                    </div>

                                    <button className="flex w-full justify-center rounded bg-primary p-3 font-medium text-gray hover:bg-opacity-90" onClick={sendMail}>
                                        Send
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
