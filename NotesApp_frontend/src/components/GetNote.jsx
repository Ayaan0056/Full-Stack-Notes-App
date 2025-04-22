import React, { useEffect, useState } from "react";
import axios from "axios";
import { toast, Toaster } from "react-hot-toast";

import NoteCard from "./NoteCard";

const GetNote = () => {
    // const [note, setNote] = useState([]);

    // const getUserNote = async () => {
    //     try {
    //         const accessToken = localStorage.getItem('accessToken');

    //         const response = await axios.get("http://localhost:8000/note/getAllNote", {
    //             headers: {
    //                 Authorization: `Bearer ${accessToken}`
    //             }
    //         });
    //         setNote(response.data.data);

    //     } catch (error) {
    //         console.error("Error occurred: ", error);
    //         toast.error("Error occurred in fetching user notes");
    //     }
    // }

    // useEffect(() => {
    //     getUserNote();
    // }, []);

    return (
        <>
            {
                note.map((element, index) => (
                    <NoteCard
                        key={index}
                        title={element.title}
                        content={element.content}
                    />
                ))
            }
            <Toaster />
        </>
    );
}

export default GetNote;