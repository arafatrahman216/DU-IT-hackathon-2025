import { PromptTemplate } from '@langchain/core/prompts';
import { StringOutputParser } from '@langchain/core/output_parsers';
import { RunnableSequence } from '@langchain/core/runnables';
import config from '../config/config.js';
import { ChatGoogleGenerativeAI } from '@langchain/google-genai';

console.log(config);

const model = new ChatGoogleGenerativeAI({
    apiKey: config.llm.apiKey,
    model: config.llm.model,
});
const outputParser = new StringOutputParser();

// Step 1: Extract subject and topic
const subjectTopicExtractor = new PromptTemplate({
    template: `
    Extract the subject and topic from the following user input.
    User Input: {query}
    Respond in JSON:
    {{
      "subject": "...",
      "topic": "..."
    }}
    `,
    inputVariables: ["query"]
});

// Step 2: Scrape content (mocked for now)
async function scrapeContent(subject, topic) {
    return {
        textContents: [
            `Introduction to ${topic} in ${subject}`,
            `Key concepts of ${topic}`,
            `Advanced resources for ${topic}`
        ],
        images: [
            "https://example.com/sample-image1.jpg"
        ],
        youtubeVideos: [
            "https://youtube.com/watch?v=sample1"
        ],
        resourceLinks: [
            "https://en.wikipedia.org/wiki/" + encodeURIComponent(topic),
            "https://www.khanacademy.org/search?page_search_query=" + encodeURIComponent(topic)
        ],
        flashcards: [
            {
                key: `Machine Learning`,
                value: `A field of study that gives computers the ability to learn without being explicitly programmed.`
            },
            {
                key: `Neural Network`,
                value: `A series of algorithms that mimic the operations of a human brain to recognize relationships in a set of data.`
            }
        ]
    };
}

// Step 3: Generate learning path
const learningPathGenerator = new PromptTemplate({
    template: `
    You are an expert e-learning content generator.
    Using the resources below, generate a JSON array representing the content structure for a single page learning module.
    Each element in the array must be one of the following types:
      - "header" with a "content"
      - "image" with "content" (URL or base64) and "alt"
      - "text" description with "content" 
      - "description" with "content", this is a detailed description that should elaborate on the topic
      - "flashcard" with "key" and "value" 
      - "video" with "content" (YouTube link) and "title"
      - "link" with "content" (URL) and "label"

    Ensure the array is ordered logically like steps.

    Inputs:
    Subject: {subject}
    Topic: {topic}
    Texts: {texts}
    Images: {images}
    Description: {description}
    YouTube Videos: {youtubeVideos}
    Resource Links: {resourceLinks}
    Flashcards: {flashcards}

    Output JSON array:
    `,
    inputVariables: ["subject", "topic", "texts", "images", "description", "youtubeVideos", "resourceLinks", "flashcards"]
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
        texts: scraped.textContents.join('\n'),
        images: scraped.images.join(','),
        description: `Learn about ${topic} in ${subject}.`, // Added description field
        youtubeVideos: scraped.youtubeVideos.join(','),
        resourceLinks: scraped.resourceLinks.join(','),
        flashcards: scraped.flashcards
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
        const result = await this.chain.invoke({ query });
        return result;
    }
}

(async () => {
    const agent = new LearningAgent();
    const result = await agent.execute("I want to learn about neural networks in machine learning");
    console.log(result);
})();
