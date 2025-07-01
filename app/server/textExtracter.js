// This module has methods to upload the resume and get the text out of it

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

async function extract(file) {
    return new Promise((resolve, reject) => {
        let resumeText = "";

        // text extractor
        new PdfReader().parseFileItems(`./uploads/${file}`, (err, item) => {
        if(err) reject(err);
        else if(!item) resolve(resumeText);
        else resumeText += item.text;
       });
    });
}

export async function getText(file, job) {
    // the file will be uploaded to the uploads folder
    await uploadFile(file);

    let data = await extract(file.name);

    // removing the extra undefined string
    console.log(data.replaceAll("undefined", ""));
}
