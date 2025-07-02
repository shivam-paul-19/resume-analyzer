"use client"

import { useEffect, useState } from "react";

export default function Result({result, setPage}) {
    let [atsColor, setAtsColor] = useState("#70e000");

    useEffect(() => {
        if(result.ats >= 85) {
            setAtsColor("#70e000");
        } else if(result.ats >= 70) {
            setAtsColor("#fcbf49");
        } else if(result.ats >= 50) {
            setAtsColor("#f77f00");
        } else {
            setAtsColor("#d62828");
        }
    }, []);
    
    return (
        <div style={{color: "white", textAlign: "center"}}>
            <h1 className="text-4xl head"><i>Result</i></h1>
            <div className="row">
            <div className="card" style={{backgroundColor: atsColor, color: "black"}}>
                <b>ATS Score</b>
                <div><span className="text-5xl">{result.ats}</span><span>/100</span></div>
            </div>
            <div className="card p-5" style={{backgroundColor: "#fee440", color: "black"}}>
                <b>Analysis summary</b>
                <div><span className="text-sm">{result.summary}</span></div>
            </div>
            </div>
            <div className="row">
                <div className="card p-5" style={{backgroundColor: "#ffb3c6", color: "black"}}>
                <b>Weak or Missing points</b>
                <div><span className="text-sm">{result.weak.map((e) => {
                    return <li>{e}</li>
                })}</span></div>
            </div>
                <div className="card p-5" style={{backgroundColor: "#80ffdb", color: "black"}}>
                <b>Suggestions</b>
                <div><span className="text-sm">{result.sugg.map((e) => {
                    return <li>{e}</li>
                })}</span></div>
            </div>
            </div>
            <div className="row">
                <div className="card p-5" style={{backgroundColor: "#4cc9f0", color: "black"}}>
                <b>Matched Keywords</b>
                <div><span className="text-sm">{result.match}</span></div>
            </div>
                <div className="card p-5" style={{backgroundColor: "#e0aaff", color: "black"}}>
                <b>Missing Keywords</b>
                <div><span className="text-sm">{result.unmatch}</span></div>
            </div>
            </div>
        
            <button className="p-2 rounded-lg" onClick={() => {setPage(0)}} style={{backgroundColor: '#e85d04', color: "white"}}>Upload another resume</button>
        </div>
    )
}