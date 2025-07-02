"use client";

export default function Form({action}) {
  return (
    <form onSubmit={action} method="POST" className="form">
        <textarea name="job" id="job"
        placeholder="Enter the Job description here" 
        required></textarea>
    <div className="flex flex-col items-center w-100">
      <label htmlFor="file" className="text-white mb-2">Click to select your resume, or drag and drop<br /><i>max size: 1mb, file format: only .pdf</i></label>
      <input type="file" name="file" id="file_input" required/>
    </div>
        <button className="p-2 rounded-lg" type="submit" style={{backgroundColor: "#e85d04", color: "white"}}>Submit</button>
      </form>
  );
}