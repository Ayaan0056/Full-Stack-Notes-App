import React from "react";

import Navbar from "../components/NavBar";

const Dashboard = () => {
    return (
        <>
            <Navbar />
            <div className="h-[calc(100vh-64px)] bg-[#0F0F11]">
                <h1>user dashboard</h1>
            </div>
        </>
    )
}

export default Dashboard;