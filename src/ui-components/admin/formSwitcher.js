import { useState } from 'react';
import ConfirmationModal from '@ft/ui-components/admin/ConfirmationModal';

const FormSwitcher = ({ name, enabled, id, handleConfirmation }) => {
    const [isModalOpen, setIsModalOpen] = useState(false);
    const handleOpenModal = () => {
        setIsModalOpen(true);
    };
    const handleCloseModal = () => {
        setIsModalOpen(false);
    };
    const handleConfirmAction = (status, name) => {
        handleConfirmation(id, status, name);
        setIsModalOpen(false);
    }
    return (
        <div>
            <label
                htmlFor={`toggle_${id}`}
                className="flex cursor-pointer select-none items-center"
            >
                <div className="relative">
                    <input
                        type="checkbox"
                        id={`toggle_${id}`}
                        className="sr-only"
                        onChange={() => {
                            handleOpenModal();
                        }}
                    />
                    <div className={`block h-8 w-14 rounded-full ${enabled ? 'bg-success' : 'bg-danger'}`}></div>
                    <div
                        className={`absolute left-1 top-1 flex h-6 w-6 items-center justify-center rounded-full bg-white transition ${enabled && '!right-1 !translate-x-full'
                            }`}
                    ></div>
                </div>
            </label>
            <p
                className={`inline-flex rounded-full bg-opacity-10 py-1 text-sm font-medium ${enabled ? 'text-success' : 'text-danger'
                    }`}
            >
                {enabled ? 'Enabled' : 'Disabled'}
            </p>
            <ConfirmationModal
                isOpen={isModalOpen}
                enabled={enabled}
                name={name}
                onClose={handleCloseModal}
                onConfirm={()=> {handleConfirmAction(enabled, name)} }
            />
        </div>
    );
};

export default FormSwitcher;
