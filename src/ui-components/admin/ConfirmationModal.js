import { useState } from 'react';

const ConfirmationModal = ({ isOpen, onClose, onConfirm, name, status }) => {
    return (
        <>
            {isOpen && (
                <div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-50">
                    <div className="bg-white p-8 rounded-lg">
                        <p>Are you sure you want to {status ? 'Disable' : 'Enable'} {name} .</p>
                        <div className="mt-8 flex justify-center">
                            <button
                                className="mr-4 px-4 py-2 bg-red-500 text-white rounded hover:bg-red-600"
                                onClick={onConfirm}
                            >
                                Confirm
                            </button>
                            <button
                                className="px-4 py-2 bg-gray-300 text-gray-700 rounded hover:bg-gray-400"
                                onClick={onClose}
                            >
                                Cancel
                            </button>
                        </div>
                    </div>
                </div>
            )}
        </>
    );
};

export default ConfirmationModal;
