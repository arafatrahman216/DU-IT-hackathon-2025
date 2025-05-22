import axios from "axios";
import { parse } from "path";
import { title } from "process";


const scrapConfig = {
  method: 'post',
  maxBodyLength: Infinity,
  url: `https://google.serper.dev/search`,
  headers: { 
    'X-API-KEY': '9aebec0c451cfc34c022b7eeb9231fa37c2f33c9', 
    'Content-Type': 'application/json'
  }
};

const stringify = (data) => {
    let strdata = JSON.stringify({
    "q": data,
    "gl": "bd"
    });
    return strdata;
};

async function makeRequest(topic) {
  try {
    scrapConfig.url = `https://google.serper.dev/search`;
    const response = await axios.request({
      ...scrapConfig,
      data: stringify(topic)
    });
    // console.log(response.data);
    const data = response.data;
    const structuredData = parseSearch(data); 
    scrapConfig.url = `https://google.serper.dev/images`;
    const imageRes= await axios.request({
      ...scrapConfig,
      data: stringify(topic)
    });
    const imageData = imageRes.data;
    // console.log(imageData);
    const imageArray = parseImage(imageData);

    const finalData = {
      search: structuredData,
      images: imageArray
    };

    // console.log(finalData);

    return finalData;
    
  }
  catch (error) {
    console.log(error);
  }
}

// makeRequest();

function structureSerperData(serperResponse) {
  const result = [];
  
  // 1. Add main header from knowledge graph or first organic result
  const mainTitle = serperResponse.knowledgeGraph?.title || 
                   serperResponse.organic[0]?.title || 
                   "Search Results";
  result.push({
    type: "header",
    content: mainTitle
  });

  // 2. Add knowledge graph image if available
  if (serperResponse.knowledgeGraph?.imageUrl) {
    result.push({
      type: "image",
      content: serperResponse.knowledgeGraph.imageUrl,
      alt: mainTitle
    });
  }

  // 3. Add answer box as flashcard or text
  if (serperResponse.answerBox) {
    result.push({
      type: "flashcard",
      key: serperResponse.answerBox.title || "Definition",
      value: serperResponse.answerBox.snippet
    });
  }

  // 4. Add knowledge graph description as text
  if (serperResponse.knowledgeGraph?.description) {
    result.push({
      type: "text",
      content: serperResponse.knowledgeGraph.description
    });
  }

  // 5. Process People Also Ask as Q&A pairs
  if (serperResponse.peopleAlsoAsk?.length) {
    result.push({
      type: "header",
      content: "Common Questions"
    });
    
    serperResponse.peopleAlsoAsk.forEach(item => {
      result.push({
        type: "qna",
        question: item.question,
        answer: item.snippet
      });
    });
  }

  // 6. Add top organic results as links
  if (serperResponse.organic?.length) {
    result.push({
      type: "header",
      content: "Top Resources"
    });

    serperResponse.organic.slice(0, 3).forEach(item => {
      result.push({
        type: "link",
        content: item.link,
        label: item.title
      });
    });
  }

  // 7. Add related searches as flashcards
  if (serperResponse.relatedSearches?.length) {
    result.push({
      type: "header",
      content: "Related Topics"
    });

    serperResponse.relatedSearches.slice(0, 5).forEach(item => {
      result.push({
        type: "flashcard",
        key: "Related Search",
        value: item.query
      });
    });
  }

  return result;
}

// Example usage:


function parseSearch(data) {
    let retstr = '';

    // 1. Top 10 search results
    retstr += '=== Top 10 Search Results ===\n';
  const organicResults = data.organic || [];
    organicResults.slice(0, 10).forEach((item, index) => {
      retstr += `Result ${index + 1}\n`;
      retstr += `Title: ${item.title}\n`;
      retstr += `Link: ${item.link}\n`;
      retstr += `Snippet: ${item.snippet}\n`;
      retstr += '---\n';
    });

    // 2. Image URL from knowledge graph
    if (data.knowledgeGraph && data.knowledgeGraph.imageUrl) {
      retstr += '\n=== Knowledge Graph Image ===\n';
      retstr += `Image URL: ${data.knowledgeGraph.imageUrl}\n`;
    }

    // 3. Descriptions
    retstr += '\n=== Descriptions ===\n';

    // From Knowledge Graph
    if (data.knowledgeGraph && data.knowledgeGraph.description) {
      retstr += `Knowledge Graph Description: ${data.knowledgeGraph.description}\n`;
    }

    // From People Also Ask
    if (data.peopleAlsoAsk && data.peopleAlsoAsk.length > 0) {
      retstr += '\nPeople Also Ask:\n';
      data.peopleAlsoAsk.slice(0, 5).forEach(qa => {
        retstr += `Q: ${qa.question}\n`;
        retstr += `A: ${qa.snippet}\n`;
      });
    }

    // Optional: Images (if any)
    if (data.images_results && data.images_results.length > 0) {
      retstr += '\n=== Some Image URLs ===\n';
      data.images_results.slice(0, 5).forEach(img => {
        retstr += `${img.original || img.thumbnail}\n`;
      });
    }

    return retstr;
}


function parseImage(data){
  var imageArray = [];
  for (let i = 0; i < data.images.length; i++) {
    imageArray.push({
      title: data.images[i].title,
      imageUrl: data.images[i].imageUrl,
      source : data.images[i].source,
    });
  }
  return imageArray;
}

export default makeRequest;