
from fastapi import FastAPI, Form
from transformers import pipeline

pipe = pipeline("text-classification", model="MarieAngeA13/Sentiment-Analysis-BERT")

from transformers import AutoTokenizer, AutoModelForSequenceClassification

tokenizer = AutoTokenizer.from_pretrained("MarieAngeA13/Sentiment-Analysis-BERT")
model = AutoModelForSequenceClassification.from_pretrained("MarieAngeA13/Sentiment-Analysis-BERT")


app = FastAPI()

@app.post("/test/")
async def three_type(text: str = Form()):

    result = pipe(text)

    return {"result" : result}

