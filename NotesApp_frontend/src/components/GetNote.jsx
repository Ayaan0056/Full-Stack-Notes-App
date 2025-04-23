import React, { useEffect, useState } from "react";
import axios from "axios";
import { toast, Toaster } from "react-hot-toast";

import Modal from "./Modal";

const GetNote = ({ isOpen, onClose, noteId, title, content }) => {
    console.log('onclose: ', onClose)
    const fetchNote = async () => {
        const accessToken = localStorage.getItem('accessToken')

        try {
            const response = await axios.get(`http://localhost:8000/note/getOneNote/${noteId}`, {
                headers: {
                    Authorization: `Bearer ${accessToken}`
                }
            })
            console.log('response: ', response)

        }
        catch (error) {
            console.log("error occured: ", error)
            toast.error(error.response.data.message)
        }
    }

    if (isOpen) {
        fetchNote()
    }

    const GetModal = ({ isOpen, onClose }) => {
        return (
            <Modal isOpen={isOpen} onClose={onClose}>
                <div className="flex flex-col gap-5">
                    <h2 className="text-lg font-bold">Note</h2>
                    <form action="#">
                        <div className="flex flex-col gap-5">
                            <input
                                type="text"
                                className="ps-2 min-w-[28vw] min-h-[5vh]"
                                defaultValue={title}
                                readOnly
                            />

                            <textarea
                                aria-label="Post Content"
                                type="text"
                                className="min-h-[20vh] min-w-[28vw] p-5 placeholder:text-2xl text-2xl"
                                defaultValue={content}
                                readOnly
                            />
                        </div>
                    </form>
                </div>
            </Modal>
        );
    };

    return (
        <>
            <GetModal isOpen={isOpen} onClose={onClose} />
            <Toaster />
        </>
    );
}

export default GetNote;