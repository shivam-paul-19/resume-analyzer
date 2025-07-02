"use client"

import CircularProgress from "@mui/material/CircularProgress";

export default function LoadingScreen() {
    return (
        <div style={{display: "flex", flexDirection: "column", alignItems: "center", paddingTop: "100px"}}>
            <CircularProgress sx={{color: "#e85d04"}}/> <br />
            <h1 className="text-2xl text-white">Analyzing your resume...</h1>
        </div>
    )
}