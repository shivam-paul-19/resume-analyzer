"use server"

import { getText } from "./textExtracter";
import { getResponse } from "./response";

export const getAnalysis = async (file, job) => {
    if(!file.name.endsWith(".pdf")) {
        // making sure the resume is in pdf only
        return -1;
    }
    
    // firstly getting the text from the pdf file
    const resumeText = await getText(file);
    
    // get the analysis
    const analysis = await getResponse(resumeText, job);

    return analysis;
}