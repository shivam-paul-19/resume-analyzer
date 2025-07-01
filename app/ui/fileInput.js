"use client";

export default function Form({action}) {
  return (
    <form action={action} className="form">
        <textarea name="job" id="job" style={{
          border: "solid black 1px",
          borderRadius: 10,
          height: 200,
          width: 500,
        }}
        placeholder="Enter the Job description here" 
        required></textarea>
    <div className="flex items-center justify-center w-100">
      <label htmlFor="file">Click to select, or drag and drop</label>
      <input type="file" name="file" id="file_input" required/>
    </div>
        <button className="bg-sky-500 hover:bg-sky-700 p-2 rounded-lg" type="submit">Submit</button>
      </form>
  );
}