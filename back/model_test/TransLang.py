# Use a pipeline as a high-level helper
from transformers import pipeline
from fastapi import FastAPI, Form

pipe = pipeline("translation", model="Helsinki-NLP/opus-mt-ko-en")

# Load model directly
from transformers import AutoTokenizer, AutoModelForSeq2SeqLM

tokenizer = AutoTokenizer.from_pretrained("Helsinki-NLP/opus-mt-ko-en")
model = AutoModelForSeq2SeqLM.from_pretrained("Helsinki-NLP/opus-mt-ko-en")

app = FastAPI()

@app.post("/test/")
async def KoToEng(text: str = Form()):

    result = pipe(text)

    return {"result" : result}
