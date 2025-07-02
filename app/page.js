"use client"

import { getAnalysis } from "./server";
import Form from "./ui/fileInput";
import Result from "./ui/result";
import { useState } from "react";
import LoadingScreen from "./ui/loading";
import GitHubIcon from '@mui/icons-material/GitHub';

export default function Home() {
  let [result, setResult] = useState({});
  let [page, setPage] = useState(0);

  const handleSubmit = async (event) => {
    event.preventDefault();
    setPage(1);
    
    const job = event.target[0].value;
    const file = event.target[1].files[0];
    let res = await getAnalysis(file, job);
    if(res == -1) {
      alert("Please upload a \".pdf\" file");
      setPage(0);
    } else {
      setResult(res);
      setPage(2);
    }
  }

  return (
    <div className="main p-10">
      <a href="https://github.com/shivam-paul-19/resume-analyzer" target="_blank"><GitHubIcon sx={{position: "fixed", top: "20px", right: "20px", color: "white", fontSize: "30px"}} /></a>
      <h1 className="text-6xl mb-10 head">Resume Fit<span style={{color: '#e85d04'}}>~</span>Check<span style={{color: '#e85d04'}}>.</span> </h1>
      {
        (page == 0)? <Form action={handleSubmit}/> : (page == 1)? <LoadingScreen /> : <Result result={result} setPage={setPage}/>
      }
    </div>
  );
}
