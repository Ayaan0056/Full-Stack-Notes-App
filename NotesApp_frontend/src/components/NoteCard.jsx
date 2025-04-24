import React, { useState } from "react";

import GetNote from "./GetNote";
import DeleteNote from "./DeleteNote";
import EditNote from "./EditNote";

const NoteCard = ({ noteId, title, content }) => {
    const [isModalOpen, setModalOpen] = useState(false);
    const [isDeleteModalOpen, setDeleteModalOpen] = useState(false);
    const [isEditModalOpen, setEditModalOpen] = useState(false)

    async function editNote(e) {
        // Stopping from bubbling up to the parent div
        e.stopPropagation();

        setEditModalOpen(true);
    }

    async function deleteNote(e) {
        // Stopping from bubbling up to the parent div
        e.stopPropagation();

        setDeleteModalOpen(true);

    }

    const handleCardClick = () => {
        setModalOpen(true)
    }

    return (
        <>
            <div onClick={handleCardClick} className="flex flex-col bg-white rounded-lg shadow-lg  w-[257px] p-[30px] h-[220px] justify-between items-center transition-transform duration-300 ease-in-out hover:scale-105 cursor-pointer">
                <div className="w-full">
                    <p className="text-center font-semibold font-man text-md cursor-default line-clamp-1 overflow-hidden break-words text-ellipsis mb-2">
                        {title}
                    </p>

                    <p className="text-center  font-semibold font-man text-md cursor-default line-clamp-3 overflow-hidden break-words text-ellipsis">
                        {content}
                    </p>
                </div>
                <div className="w-full flex justify-between">
                    <button
                        onClick={editNote}
                        className="text-white bg-gradient-to-r from-blue-500 via-blue-600 to-blue-700 hover:bg-gradient-to-br focus:ring-4 focus:outline-none focus:ring-blue-300 dark:focus:ring-blue-800 font-medium rounded-lg text-sm px-5 py-2 text-center cursor-pointer"
                    >
                        Edit
                    </button>
                    <button
                        onClick={deleteNote}
                        className="text-white bg-gradient-to-r from-red-400 via-red-500 to-red-600 hover:bg-gradient-to-br focus:ring-4 focus:outline-none focus:ring-red-300 dark:focus:ring-red-800 font-medium rounded-lg text-sm px-5 py-2 text-center cursor-pointer"
                    >
                        Delete
                    </button>
                </div>
            </div>

            <GetNote
                isOpen={isModalOpen}
                onClose={() => setModalOpen(false)}
                noteId={noteId}
                title={title}
                content={content}
            />

            <DeleteNote
                isOpen={isDeleteModalOpen}
                onClose={() => setDeleteModalOpen(false)}
                noteId={noteId}
            />

            < EditNote
                isOpen={isEditModalOpen}
                onClose={() => setEditModalOpen(false)}
                noteId={noteId}
            />
        </>
    );
};

export default NoteCard;
