"use client";

export default function FileInput() {
  return (
    <div className="flex items-center justify-center w-100">
      <label htmlFor="file">Upload Your resume</label>
      <input type="file" name="file" required style={{
        backgroundColor: "gray",
        height: 100
      }}/>
    </div>
  );
}