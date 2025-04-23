import React from "react";

import closeIcon from "../assets/closeIcon.jpg";

const Modal = ({ isOpen, onClose, children }) => {
    if (!isOpen) {
        return null;
    }

    return (
        <>
            <div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-50">
                <div className="bg-white rounded-lg shadow-lg p-6    relative">
                    <button
                        className="absolute top-2 right-2 text-gray-500 hover:text-gray-700"
                        onClick={onClose}>

                        <img
                            className="h-8 w-8"
                            src={closeIcon}
                            alt="Close"
                        />
                    </button>
                    {children}
                </div>
            </div>
        </>
    );
};

export default Modal;