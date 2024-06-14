# Use a pipeline as a high-level helper
from transformers import pipeline
from fastapi import FastAPI, Form
# Load model directly
from transformers import AutoTokenizer, AutoModelForSequenceClassification

tokenizer = AutoTokenizer.from_pretrained("siebert/sentiment-roberta-large-english")
model = AutoModelForSequenceClassification.from_pretrained("siebert/sentiment-roberta-large-english")

pipe = pipeline("text-classification", model="siebert/sentiment-roberta-large-english")

app = FastAPI()

@app.post("/test/")
async def two_type(text: str = Form()):

    result = pipe(text)

    return {"result" : result}

