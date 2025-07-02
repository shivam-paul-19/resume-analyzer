// This module has methods to upload the resume and get the text out of it

"use server"

import fs from "fs/promises";
import path from "path";
import os from "os";
import { PdfReader } from "pdfreader";

async function uploadFile(file) {
    const bytes = await file.arrayBuffer();
    const buffer = Buffer.from(bytes);

    const tmpDir = os.tmpdir();
    const filePath = path.join(tmpDir, file.name);
    await fs.writeFile(filePath, buffer);
    return filePath;
}

async function extract(filePath) {
    return new Promise((resolve, reject) => {
        let resumeText = "";

        // text extractor
        new PdfReader().parseFileItems(filePath, (err, item) => {
        if(err) reject(err);
        else if(!item) resolve(resumeText);
        else resumeText += item.text;
       });
    });
}

export async function getText(file) {
    // the file will be uploaded to the uploads folder
    let filePath = await uploadFile(file);

    let data = await extract(filePath);

    // removing the extra undefined string
    data = data.replaceAll("undefined", "");
    return data;
}