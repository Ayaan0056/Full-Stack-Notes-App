import React, { useEffect, useState } from "react";
import axios from "axios";
import { toast, Toaster } from "react-hot-toast";
import { useForm } from "react-hook-form";

import Modal from "./Modal";
import { userNotes } from "../pages/Dashboard";

const EditNote = ({ isOpen, onClose, noteId }) => {
    const { register, handleSubmit, setValue } = useForm()
    const {note, setNote} = userNotes();
    const [oldNote, setOldNote] = useState(null)
    const accessToken = localStorage.getItem('accessToken')


    //Fetching old note
    const getOldNote = async () => {
        try {
            const response = await axios.get(`http://localhost:8000/note/getOneNote/${noteId}`, {
                headers: {
                    Authorization: `Bearer ${accessToken}`
                }
            })
            console.log('response: ', response)
            setOldNote(response);

            const title = response.data.data.title;
            const content = response.data.data.content
            

            //Setting edit modal initial values 
            setValue('title', title)
            setValue('content', content)

        }
        catch (error) {
            console.log("error occured: ", error)
            toast.error(error.response.data.message)
        }
    }

    const handleEdit = async (data) => {
        try {
            
            const response = await axios.put(`http://localhost:8000/note/updateNote/${noteId}`, data, {
                headers: {
                    Authorization: `Bearer ${accessToken}`
                }
            })

            if(response.data.success === true){
                toast.success(response.data.message || 'Note Successfully updated');
                
                onClose();

                const updatedNotes = note.map(item => 
                    item._id === noteId ? response.data.data : item
                );

                setNote(updatedNotes);
            }
            else {
                toast.error('Note Not Updated');
            }
        }
        catch (error) {
            console.log("error occured: ", error)
            toast.error(error.response.data.message)
        }
    }

    useEffect(() => {
        if (isOpen) {
            getOldNote()
        }
    }, [isOpen])

    const EditModal = ({ isOpen, onClose }) => {


        return (
            <>
                <Modal isOpen={isOpen} onClose={onClose}>
                    <div className="flex flex-col gap-5">
                        <h2 className="text-lg font-bold">Edit Note</h2>
                        <form action="#" onSubmit={handleSubmit(handleEdit)}>
                            <div className="flex flex-col gap-5">
                                <input
                                    type="text"
                                    className="ps-2 min-w-[28vw] min-h-[5vh]"
                                    {...register("title")}
                                />

                                <textarea
                                    aria-label="Post Content"
                                    type="text"
                                    className="min-h-[20vh] min-w-[28vw] p-5 placeholder:text-2xl text-2xl"
                                    {...register("content")}
                                />
                            </div>
                            <div className="flex justify-center items-center">
                                <button
                                    className="mt-4 px-4 py-2 bg-blue-500 text-white rounded-lg"
                                    type="submit"
                                >
                                    Edit Note
                                </button>
                            </div>
                        </form>
                    </div>
                </Modal>
            </>
        )
    }



    return (
        <>
            <EditModal
                isOpen={isOpen}
                onClose={onClose}
            />
            <Toaster />
        </>
    )
}

export default EditNote;