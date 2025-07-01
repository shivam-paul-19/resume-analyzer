"use client"

import { getAnalysis } from "./server";
import Form from "./ui/fileInput";
import Result from "./ui/result";
import { useState } from "react";
import LoadingScreen from "./ui/loading";

export default function Home() {
  let [result, setResult] = useState({});
  let [page, setPage] = useState(0);

  const handleSubmit = async (event) => {
    event.preventDefault();
    setPage(1);
    
    const job = event.target[0].value;
    const file = event.target[1].files[0];
    let res = await getAnalysis(file, job);
    setResult(res);
    setPage(2);
  }

  return (
    <div className="main">
      <h1 className="text-3xl">Resume analyzer</h1>
      {
        (page == 0)? <Form action={handleSubmit}/> : (page == 1)? <LoadingScreen /> : <Result result={result} setPage={setPage}/>
      }
      
    </div>
  );
}
