import google.generativeai as genai
import os
import dotenv
dotenv.load_dotenv()

def misinfo_check_func(prompt):
    # Set the API key
    genai.configure(api_key=os.getenv("GEMINI_API_KEY"))
    model = genai.GenerativeModel("gemini-1.5-flash-latest")
    try:
        response = model.generate_content(prompt)
        return response.text
    except Exception as e:
        print(f"Error generating content: {e}")
        return None
    
def main():
    text = "According to evolution, humans are descended from monkeys."
    prompt = f"Please check the following statement for misinformation: {text}. Explain why it is or is not misinformation. Try to explain it in Bengali language."
    result = misinfo_check_func(prompt)
    if result:
        with open("misinfo_check.txt", "w", encoding="utf-8") as file:
            file.write(result)
    else:
        print("Failed to get a response from the model.")

# main()            