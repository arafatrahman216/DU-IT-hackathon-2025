import fs from 'fs';
import { GoogleGenerativeAI } from '@google/generative-ai';
import dotenv from 'dotenv';
import path from 'path';

dotenv.config({ path: process.cwd() + '/../../.env' });

async function misinfoCheckFunc(text) {
    const apiKey = process.env.LLM_API_KEY;
    if (!apiKey) {
        console.log(apiKey);
        console.error('GEMINI_API_KEY not found in environment variables.');
        return null;
    }
    const prompt = `Please check the following statement for misinformation: ${text}. Explain why it is or is not misinformation. Try to explain it in Bengali language.
    write the answer in a json format. The json should contain the following fields:
    1. statement: the original statement
    2. is_misinformation: true or false
    3. explanation: the explanation of why it is or is not misinformation(first in english and then in Bengali)
    4. sources: a list of sources that support the explanation
    `;
    const genAI = new GoogleGenerativeAI(apiKey);
    const model = genAI.getGenerativeModel({ model: process.env.LLM_MODEL});

    try {
        const result = await model.generateContent(prompt);
        const response = await result.response;
        
        let responseText = response.text();
        // Remove ```json and ``` if present
        responseText = responseText.replace(/^\s*```json\s*/i, '').replace(/\s*```\s*$/i, '');
        const jsonResponse = JSON.parse(responseText);
        console.log(`Parsed JSON: ${jsonResponse}`);
        
        return {
            isMisinfo: jsonResponse.is_misinformation,
            explanation: jsonResponse.explanation,
            sources: jsonResponse.sources,
            statement: jsonResponse.statement,
        };
    } catch (e) {
        console.error(`Error generating content: ${e}`);
        return null;
    }
}

// async function main() {
//     const text = "According to evolution, humans are descended from monkeys.";
    
//     const result = await misinfoCheckFunc(text);
//     if (result) {
//         fs.writeFileSync('misinfo_check.txt', JSON.stringify(result), { encoding: 'utf-8' });
//     } else {
//         console.log('Failed to get a response from the model.');
//     }
// }

// main();

export default misinfoCheckFunc;