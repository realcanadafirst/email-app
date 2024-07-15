'use client' // only in App Router
import React, { useRef } from 'react';
import dynamic from 'next/dynamic';
import { CopyToClipboard } from 'react-copy-to-clipboard';
const CustomEditor = dynamic(() => { return import('@ft/ui-components/custom-editor'); }, { ssr: false });

const suggestionText = ['{{senderCompany}}', '{{senderName}}', '{{firstName}}', '{{lastName}}', '{{mobileNumber}}', '{{email}}', '{{orgName}}'];
export default function AddTemplateForm({ formData, handleChange, dataChange, readonly = false }) {
    const editorRef = useRef(null);
    const inputRef = useRef(null);

    const handleButtonClick = (val) => {
        if (editorRef.current) {
            const editor = editorRef.current.editor;
            const model = editor.model;
            const selection = model.document.selection;
            const insertContent = val;
            model.change(writer => {
                const viewFragment = editor.data.processor.toView(insertContent);
                const modelFragment = editor.data.toModel(viewFragment);
                model.insertContent(modelFragment, selection.getFirstPosition());
            });
        }
    };

    const handleButtonClickSubject = (val) => {
        if (inputRef.current) {
            const input = inputRef.current;
            const start = input.selectionStart;
            const end = input.selectionEnd;
            const text = input.value;
            input.value = text.slice(0, start) + val + text.slice(end);
            const newCursorPosition = start + val.length;
            input.setSelectionRange(newCursorPosition, newCursorPosition);
        }
    }

    return (
        <>
            <div className="mb-5.5 flex flex-col gap-5.5 sm:flex-row">
                <div className="w-full">
                    <label className="mb-3 block text-sm font-medium text-black dark:text-white" htmlFor="subject">
                        Subject
                    </label>
                    <p className="mb-3 text-black dark:text-white">
                        {
                            suggestionText.map((val) => {
                                return <CopyToClipboard text={val} >
                                    <button className="px-3" onClick={() => handleButtonClickSubject(val)}> {val} </button>
                                </CopyToClipboard>
                            })
                        }
                    </p>
                    <div className="relative">
                        <input
                            placeholder="Subject"
                            className="w-full rounded border border-stroke bg-gray py-3 pr-4.5 text-black focus:border-primary focus-visible:outline-none dark:border-strokedark dark:bg-meta-4 dark:text-white dark:focus:border-primary"
                            type="text"
                            name="subject"
                            ref={inputRef}
                            readOnly={readonly}
                            onChange={handleChange}
                            value={formData.subject}
                        />
                    </div>
                </div>
            </div>

            <div className="mb-5.5 text-black dark:text-white">
                <label className="mb-3 block text-sm font-medium text-black dark:text-white">Content <span className="text-meta-1">*</span>
                    <span className="mb-3 text-black dark:text-white"> Note: Click To Copy Below</span>
                </label>
                <p className="mb-3 text-black dark:text-white">
                    {
                        suggestionText.map((val) => {
                            return <CopyToClipboard text={val} >
                                <button className="px-3" onClick={() => handleButtonClick(val)}> {val} </button>
                            </CopyToClipboard>
                        })
                    }
                </p>
                <CustomEditor
                    initialData={formData.template}
                    onReady={editor => {
                        editorRef.current = { editor };
                    }}
                    dataChange={dataChange}
                />
            </div>
        </>
    );
}
