from fastapi import FastAPI, Request
from pydantic import BaseModel
from webscrapping import get_text
from misinfo_check import misinfo_check_func

app = FastAPI()

class ScrapRequest(BaseModel):
    subject: str
    topic: str

class MisinfoRequest(BaseModel):
    claim: str

@app.post("/get_text")
def scrapping(request: ScrapRequest):
    sub = request.subject
    topic = request.topic
    text = get_text(sub, topic)
    return {"text": text}

@app.post("/misinfo_check")
def misinfo(request: MisinfoRequest):
    claim = request.claim
    prompt = f"Please check the following statement for misinformation: {claim}. Explain why it is or is not misinformation. Try to explain it in Bengali language."
    result = misinfo_check_func(prompt)
    return {"result": result}