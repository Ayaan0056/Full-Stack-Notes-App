import React, { useState } from "react";
import { useForm } from "react-hook-form";

const CreateNote = () => {
    const [isModalOpen, setModalOpen] = useState(false);
    const {register, handleSubmit} = useForm()
    async function newNote(){
        console.log("reached")
    }

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
                    src="src/assets/closeIcon.jpg"
                    alt="Close"
                  />
                </button>
                {children}
              </div>
            </div>
          </>
        );
      };
    
      const CreateModal = ({ isOpen, onClose }) => {
        return (
          <Modal isOpen={isOpen} onClose={onClose}>
            <div className="flex flex-col gap-5">
              <h2 className="text-lg font-bold">Create Note</h2>
              <form action="#" onSubmit={handleSubmit(newNote)}>
                <div className="flex flex-col gap-5">
                  <input
                    type="text"
                    className="ps-2 min-w-[28vw] min-h-[5vh]"
                    placeholder="Enter Title"
                    {...register("title")}
                  />
    
                  <textarea
                    aria-label="Post Content"
                    type="text"
                    placeholder="Start Typing. . ."
                    id="content"
                    className="min-h-[20vh] min-w-[28vw] p-5 placeholder:text-2xl text-2xl"
                    {...register("content")}
                  />
                </div>
                <div className="flex justify-center items-center">
                  <button
                    className="mt-4 px-4 py-2 bg-blue-500 text-white rounded-lg"
                    type="submit"
                  >
                    Save Note
                  </button>
                </div>
              </form>
            </div>
          </Modal>
        );
      };

    return (
        <>
            <button onClick={() => setModalOpen(true)} className="relative inline-flex items-center justify-center p-0.5 overflow-hidden text-sm font-medium text-gray-900 rounded-lg group bg-gradient-to-br from-teal-300 to-lime-300 group-hover:from-teal-300 group-hover:to-lime-300 dark:text-white dark:hover:text-gray-900 focus:ring-4 focus:outline-none focus:ring-lime-200 dark:focus:ring-lime-800">
                <span className="font-man relative px-5 py-2.5 transition-all ease-in duration-75 bg-white dark:bg-gray-900 rounded-md group-hover:bg-transparent group-hover:dark:bg-transparent">
                    Create Note
                </span>
            </button>
            <CreateModal isOpen={isModalOpen} onClose={() => setModalOpen(false)} />
        </>
    )
}

export default CreateNote;