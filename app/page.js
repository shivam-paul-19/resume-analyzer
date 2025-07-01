"use client"

import { getText } from "./server/textExtracter";
import Form from "./ui/fileInput";

export default function Home() {
  const handleSubmit = async (e) => {
    let file = e.get("file");
    let job = e.get("job");
    getText(file, job);
  }

  return (
    <div className="main">
      <h1 className="text-3xl">Resume analyzer</h1>
      <Form action={handleSubmit}/>
    </div>
  );
}
