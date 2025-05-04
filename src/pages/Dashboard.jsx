import React from "react";
import SideBar from "../components/sideBar";
import { useParams } from "react-router-dom";

function Dashboard() {
    
    const { id } = useParams();

    console.log(id)
    
    return (
        <>
        <SideBar/>
        </>
    );
}

export default Dashboard;