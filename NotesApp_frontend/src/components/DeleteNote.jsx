import axios from "axios";
import React from "react";
import { toast, Toaster } from "react-hot-toast";

import Modal from "./Modal";
import { userNotes } from "../pages/Dashboard";


const DeleteNote = ({ isOpen, onClose, noteId }) => {
    const {note, setNote} = userNotes();

    const handleConfirmDelete  = async () => {
        const accessToken = localStorage.getItem('accessToken')
        try {
            console.log('Note: ', note);
            console.log('setNote', setNote)
            const response = await axios.delete(
                `http://localhost:8000/note/deleteNote/${noteId}`,
                {
                    headers: {
                        Authorization: `Bearer ${accessToken}`,
                    },
                }
            );

            console.log("response: ", response);

            if (response.data.success) {
                toast.success(response.data.message);
                
                onClose()
                
                //setting up the useContext Notes 
                setNote(note.filter((element) =>  element._id !== noteId ))
            }
        } catch (error) {
            console.log("error occured: ", error);
            toast.error(error.response.data.message);
        }
    };

    const DeleteModal = ({ isOpen, onClose }) => {
        return (
            <>
                <Modal isOpen={isOpen} onClose={onClose}>
                    <div className="flex flex-col gap-5">
                        <h2 className="text-lg font-bold mt-5 mx-5">
                            Do You Really want to Delete this note
                        </h2>

                        <div className="flex justify-center">
                            <button onClick={onClose} className="focus:outline-none text-white bg-green-700 hover:bg-green-800 focus:ring-4 focus:ring-green-300 font-medium rounded-lg text-sm px-5 py-2.5 me-2 mb-2 dark:bg-green-600 dark:hover:bg-green-700 dark:focus:ring-green-800">
                                No
                            </button>
                            <button onClick={handleConfirmDelete} className="focus:outline-none text-white bg-red-700 hover:bg-red-800 focus:ring-4 focus:ring-red-300 font-medium rounded-lg text-sm px-5 py-2.5 me-2 mb-2 dark:bg-red-600 dark:hover:bg-red-700 dark:focus:ring-red-900">
                                Yes
                            </button>
                        </div>
                    </div>
                </Modal>
            </>
        );
    };

    return (
        <>
            <DeleteModal isOpen={isOpen} onClose={onClose} />
        </>
    );
};

export default DeleteNote;
