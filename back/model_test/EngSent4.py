
from fastapi import FastAPI, Form
from transformers import pipeline

pipe = pipeline("text-classification", model="kwang123/bert-sentiment-analysis")

from transformers import AutoTokenizer, AutoModelForSequenceClassification

tokenizer = AutoTokenizer.from_pretrained("kwang123/bert-sentiment-analysis")
model = AutoModelForSequenceClassification.from_pretrained("kwang123/bert-sentiment-analysis")


app = FastAPI()

@app.post("/test/")
async def five_types(text: str = Form()):

    result = pipe(text)

    return {"result" : result}

