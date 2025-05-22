import { PromptTemplate } from '@langchain/core/prompts';
import { StringOutputParser } from '@langchain/core/output_parsers';
import { RunnableSequence } from '@langchain/core/runnables';
import config from '../config/config.js';
import { ChatGoogleGenerativeAI } from '@langchain/google-genai';

import makeRequest from '../scrapping/scrapGoogle.js'; 

console.log(config);

const model = new ChatGoogleGenerativeAI({
    apiKey: config.llm.apiKey,
    model: config.llm.model,
});
const outputParser = new StringOutputParser();

// Step 1: Extract subject and topic
const subjectTopicExtractor = new PromptTemplate({
    template: `
    Extract the subject, topic and a crafted search query for resource scrapping from the following user input.
    User Input: {query}
    Respond in JSON:
    {{
      "subject": "...",
      "topic": "...",
      "searchQuery": "..."
    }}
    `,
    inputVariables: ["query"]
});

// Step 2: Scrape content (mocked for now)
async function scrapeContent(subject, topic) {
    console.log("Scraping content for subject:", subject, "and topic:", topic);

    const scrapedData = await makeRequest(topic);

    return {
        textContents: scrapedData.search,
        images: scrapedData.images
    };
}

// Step 3: Generate learning path
const learningPathGenerator = new PromptTemplate({
    template: `
    You are an expert e-learning content generator. On the basis of the following resources, elaborate a learning path for a single page learning module.
    In case of multiple resources, place it sequentially in the learning path. Flashcards and Q&A should be placed at the end of the learning path. 
    Flashcards should be placed in a way that they are easy to understand and remember, and Q&A should be placed at the end of the learning path.
    Flashcards and Q&A should be at least 10 to 15.from the scrapped content, classify the content into different types.
    Using the resources below, generate a JSON array representing the content structure for a single page learning module. 
    Each element in the array should have a "type".
    "header"-> "content", "image"-> "content" (URL or base64), "text"-> "content", "flashcard"-> "key" and "value", "video"-> "content" (YouTube link) and "title", "link"-> "content" (URL) and "label", and "qna"-> "question" and "answer".
    The "type" field should be one of the following: "header", "image", "text", "flashcard", "video", "link", or "qna".

    Each element in the array must be one of the following types:
      - "header" with a "content"
      - "image" with "content" (URL or base64) and "alt"
      - "text" description with "content" , this is a detailed description that should elaborate on the topic
      - "flashcard" with "key" and "value" 
      - "video" with "content" (YouTube link) and "title"
      - "link" with "content" (URL) and "label"
        - "qna" with "question" and "answer"

    Ensure the array is ordered logically like steps.

    Inputs:
    Subject: {subject}
    Topic: {topic}
    scrappedContent: {scrappedContent}

    Output JSON array:
    `,
    inputVariables: ["subject", "topic", "scrappedContent"]
});

// Step 4: Chain
const analyzeQuery = async (input) => {
    const extraction = await subjectTopicExtractor.pipe(model).pipe(outputParser).invoke({ query: input.query });
    let subject, topic;
    try {
        const parsed = JSON.parse(extraction);
        subject = parsed.subject;
        topic = parsed.topic;
    } catch (e) {
        subject = "General";
        topic = input.query;
    }

    const scraped = await scrapeContent(subject, topic);

    return {
        subject,
        topic,
        scrappedContent: scraped,
        qna: scraped.qna,

    };
};

const chain = RunnableSequence.from([
    analyzeQuery,
    learningPathGenerator,
    model,
    outputParser
]);

class LearningAgent {
    constructor() {
        this.chain = chain;
    }

    async execute(query) {
        let result = await this.chain.invoke({ query });
        // Remove leading/trailing code block markers if present
        if (typeof result === "string") {
            result = result.trim();
            if (result.startsWith("```json")) {
                result = result.slice(7);
            } else if (result.startsWith("```")) {
                result = result.slice(3);
            }
            if (result.endsWith("```")) {
                result = result.slice(0, -3);
            }
            result = result.trim();
        }
        return result;
    }
}

// (async () => {
//     const agent = new LearningAgent();
//     const result = await agent.execute("I want to learn about neural networks in machine learning");
//     console.log(result);
// })();

export default LearningAgent;
