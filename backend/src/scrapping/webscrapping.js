import fs from 'fs';
import axios from 'axios';
import wiki from 'wikipedia';


async function getText(subject, topic) {
    const query = `${subject} ${topic}`;
    try {
        const page = await wiki.page(query);
        const text = await page.content();
        return text;
    } catch (e) {
        if (e.name === 'DisambiguationError') {
            console.log(`Disambiguation Error: The query '${query}' returned multiple results.`);
            console.log('Options include:', e.options ? e.options.slice(0, 5) : []);
            return null;
        } else if (e.name === 'PageError') {
            console.log(`No page found for query: ${query}`);
            return null;
        } else {
            console.log(`Unexpected error: ${e}`);
            return null;
        }
    }
}

async function main() {
    const subject = "evolution";
    const topic = "human evolution";
    const text = await getText(subject, topic);
    if (text) {
        fs.writeFileSync("wikipedia_text.txt", text.slice(0, 2000), { encoding: "utf-8" });
    } else {
        console.log("Failed to retrieve text from Wikipedia.");
    }
}


main();
