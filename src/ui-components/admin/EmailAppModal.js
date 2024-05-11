const EmailAppModal = ({ isOpen, onClose, onConfirm, children, confirmMsg = 'Confirm' }) => {
    return (
        <>
            {isOpen && (
                <div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-80 min-w-80 z-50">
                    <div className="bg-white p-8 rounded-lg overflow-auto">
                        {children}
                        <div className="mt-8 flex justify-center">
                            <button className="mr-4 px-4 py-2 bg-red-500 text-white bg-[#F87171] rounded hover:bg-red-600" onClick={onConfirm}>{confirmMsg}</button>
                            <button className="px-4 py-2 bg-gray-300 text-gray-700 rounded hover:bg-gray-400" onClick={() => onClose(false)}>Cancel</button>
                        </div>
                    </div>
                </div>
            )}
        </>
    );
};

export default EmailAppModal;
