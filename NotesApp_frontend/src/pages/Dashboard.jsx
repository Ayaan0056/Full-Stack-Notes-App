import React, { useState, useEffect, createContext, useContext } from "react";
import axios from "axios";

import Navbar from "../components/NavBar";
import CreateNote from "../components/CreateNote";
import NoteCard from "../components/NoteCard"

//creating context API for auto reRender on note creation 
const NotesContext = createContext();

export const userNotes = () => {
    return useContext(NotesContext);
}

const Dashboard = () => {
    const [note, setNote] = useState([]);

    const getUserNote = async () => {
        try {
            const accessToken = localStorage.getItem('accessToken');

            const response = await axios.get("http://localhost:8000/note/getAllNote", {
                headers: {
                    Authorization: `Bearer ${accessToken}`
                }
            });
            setNote(response.data.data);

        } catch (error) {
            console.error("Error occurred: ", error);
            toast.error("Error occurred in fetching user notes");
        }
    }

    useEffect(() => {
        getUserNote();
    }, []);

    return (
        <>
            <NotesContext.Provider value={{ note, setNote }}>
                <Navbar />
                <div className="h-[calc(100vh-64px)] bg-[#0F0F11] overflow-scroll">
                    <div className="w-full h-full p-3 ">
                        <div className="flex flex-col justify-center items-center mb-5">
                            <h1 className="text-white">user dashboard</h1>
                            <CreateNote />
                        </div>
                        <div className="flex  flex-wrap justify-center items-center gap-5">
                            {
                                note.map((element, index) => (
                                    <NoteCard
                                        key={index}
                                        title={element.title}
                                        content={element.content}
                                    />
                                ))
                            }
                        </div>
                    </div>
                </div>
            </NotesContext.Provider>
        </>
    )
}

export default Dashboard;