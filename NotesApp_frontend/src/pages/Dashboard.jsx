import React from "react";

import Navbar from "../components/NavBar";
import CreateNote from "../components/CreateNote";

const Dashboard = () => {
    return (
        <>
            <Navbar />
            <div className="h-[calc(100vh-64px)] bg-[#0F0F11]">
                <h1 className="text-white">user dashboard</h1>
            <CreateNote/>
            </div>
        </>
    )
}

export default Dashboard;