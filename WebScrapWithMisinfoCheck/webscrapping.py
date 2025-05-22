import requests
from bs4 import BeautifulSoup
from newspaper import Article
from wikipedia import page, exceptions

def get_text(subject,topic):
    query = f"{subject} {topic}"
    try:
        temp_page = page(query)
        text = temp_page.content
        return text
    except exceptions.DisambiguationError as e:
        print(f"Disambiguation Error: The query '{query}' returned multiple results.")
        print("Options include:", e.options[:5])  
        return None
    except exceptions.PageError:
        print(f"No page found for query: {query}")
        return None
    except Exception as e:
        print(f"Unexpected error: {e}")
        return None
    
def main():
    subject = "Evolution"
    topic = "Human Evolution"
    text = get_text(subject, topic)
    if text:
        with open("wikipedia_text.txt", "w", encoding="utf-8") as file:
            file.write(text[:2000])
    else:
        print("Failed to retrieve text from Wikipedia.")

# main()            
    
   