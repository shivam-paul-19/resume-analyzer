// This module is responsible for fetching response from Google Gemini API

import { GoogleGenerativeAI } from "@google/generative-ai";
import dotenv from "dotenv";

dotenv.config();

function makePrompt(resume, job) {
  const prompt = `
        You are an AI resume evaluator.

        You will receive two inputs:
        1. Resume text (extracted from a PDF, formatting might be missing)
        2. Job description text

        Your task is to simulate an ATS (Applicant Tracking System) and evaluate the resume’s compatibility with the given job description. Assume standard resume structure (like Education, Skills, Experience, Projects, etc.).

        Please return the result in the exact format below:

        ---
        ATS Score: <Score out of 100>

        Relevance Summary:
        <Brief summary>

        Missing or Weak Points:
        - ...
        - ...

        Improvement Suggestions:
        - ...
        - ...

        Matched Keywords:
        ...

        Unmatched Keywords:
        ...
        ---

        Resume:
        ${resume}

        Job Description:
        ${job}`;

  return prompt;
}

export async function getResponse(resume, job) {
  const genAI = new GoogleGenerativeAI(process.env.GEMINI_API_KEY);
  const model = genAI.getGenerativeModel({ model: "gemini-1.5-flash" });

  const result = await model.generateContent(makePrompt(resume, job));
  let response = result.response.text();
  console.log(response);
}
