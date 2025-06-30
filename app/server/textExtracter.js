"use server"

import fs from "fs/promises";
import path from "path";
import { PdfReader } from "pdfreader";

async function uploadFile(file) {
    const bytes = await file.arrayBuffer();
    const buffer = Buffer.from(bytes);

    const uploadsDir = path.join(process.cwd(), "uploads");

    const filePath = path.join(uploadsDir, file.name);
    await fs.writeFile(filePath, buffer);
}

export async function getText(file, job) {
    await uploadFile(file);
    console.log(file);
    console.log(job);
//    new PdfReader().parseFileItems(`./uploads/${file}`, (err, item) => {
//     if(err) console.log(err);
//     else if(!item) console.log("end of file");
//     else console.log(item.text);
//    });
}
