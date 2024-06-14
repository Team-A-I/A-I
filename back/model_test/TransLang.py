"""
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
"""

"""
CORS Error 발생
from fastapi import FastAPI, UploadFile, File
from io import BytesIO
from transformers import pipeline

app = FastAPI()

# Define translation pipeline
translator = pipeline("translation", model="Helsinki-NLP/opus-mt-ko-en")

@app.post("/translate/")
async def translate_file(file: UploadFile = File(...)):
    # Read the uploaded file as bytes
    contents = await file.read()
    
    # Decode the bytes to string assuming utf-8 encoding
    text = contents.decode("utf-8")

    # Translate the text
    translated_text = translator(text)
    
    return {"translated_text": translated_text}
"""

"""
text내 1줄만 해석
from fastapi import FastAPI, UploadFile, File
from fastapi.middleware.cors import CORSMiddleware
from io import BytesIO
from transformers import pipeline

app = FastAPI()

# CORS 설정
origins = [
    "http://localhost:8000",
]

app.add_middleware(
    CORSMiddleware,
    allow_origins=origins,
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

# Define translation pipeline
translator = pipeline("translation", model="Helsinki-NLP/opus-mt-ko-en")

@app.post("/translate/")
async def translate_file(file: UploadFile = File(...)):
    # Read the uploaded file as bytes
    contents = await file.read()
    
    # Decode the bytes to string assuming utf-8 encoding
    text = contents.decode("utf-8")

    # Translate the text
    translated_text = translator(text)
    
    return {"translated_text": translated_text}
"""

from fastapi import FastAPI, UploadFile, File
from fastapi.middleware.cors import CORSMiddleware
from io import BytesIO
from transformers import pipeline

app = FastAPI()

# CORS 설정
origins = [
    "http://localhost:8000",
]

app.add_middleware(
    CORSMiddleware,
    allow_origins=origins,
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

# Define translation pipeline
translator = pipeline("translation", model="Helsinki-NLP/opus-mt-ko-en")

@app.post("/translate/")
async def translate_file(file: UploadFile = File(...)):
    # Read the uploaded file as bytes
    contents = await file.read()
    
    # Decode the bytes to string assuming utf-8 encoding
    text = contents.decode("utf-8")
    
    # Split the text into sentences
    sentences = text.split('\n')
    
    # Translate each sentence
    translated_sentences = [translator(sentence) for sentence in sentences]
    
    return {"translated_sentences": translated_sentences}

