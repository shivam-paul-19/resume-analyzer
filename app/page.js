"use client"

import FileInput from "./ui/fileInput";
import { getText } from "./server/textExtracter";

export default function Home() {
  const handleSubmit = async (e) => {
    let file = e.get("file");
    let job = e.get("job");
    getText(file, job);
  }

  return (
    <div className="main">
      <h1 className="text-3xl">Resume analyzer</h1>
      <form action={handleSubmit} className="form">
        <textarea name="job" id="job" style={{
          border: "solid black 1px",
          borderRadius: 10,
          height: 200,
          width: 500,
        }}
        placeholder="Enter the Job description here" 
        required></textarea>
        <FileInput />
        <button className="bg-sky-500 hover:bg-sky-700 p-2 rounded-lg" type="submit">Submit</button>
      </form>
    </div>
  );
}
