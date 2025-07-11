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

function parseResponse(response) {
  let last = response.indexOf("Relevance Summary");
  let first = 15;
  const ats = Number(response.substring(first, last));

  first = 37;
  last = response.indexOf("Missing or Weak Points:");

  const summary = response.substring(first, last).trim();

  first = last + 24;
  last = response.indexOf("Improvement Suggestions:");

  let weak = response.substring(first, last).trim().split("-");
  weak.shift(0);

  first = last + 25;
  last = response.indexOf("Matched Keywords:");

  let sugg =  response.substring(first, last).trim().split("-");
  sugg.shift(0);

  first = last + 18;
  last = response.indexOf("Unmatched Keywords:");

  const match = response.substring(first, last).trim();

  first = last + 20;
  last = response.lastIndexOf("---")-1;

  const unmatch = response.substring(first, last).trim();

  return {
    ats: ats,
    summary: summary,
    weak: weak,
    sugg: sugg,
    match: match,
    unmatch: unmatch
  }
}

export async function getResponse(resume, job) {
  const genAI = new GoogleGenerativeAI(process.env.GEMINI_API_KEY);
  const model = genAI.getGenerativeModel({ model: "gemini-1.5-flash" });

  const result = await model.generateContent(makePrompt(resume, job));
  let response = result.response.text();
  return parseResponse(response);
}