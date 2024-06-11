from fastapi import FastAPI, Form

# STEP 1. import modules
from transformers import pipeline

# STEP 2. creaete inference instance
classifier = pipeline("sentiment-analysis", model="nlp04/korean_sentiment_analysis_kcelectra")

app = FastAPI()

@app.post("/text/")
async def text(text: str = Form()):

    # STEP 3. prepare input data
    # text = "싫어"

    # STEP 4. inference
    result = classifier(text)

    # STEP 55. visualrize
    return {"result": result}