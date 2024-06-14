"""
from fastapi import FastAPI, Form
# Use a pipeline as a high-level helper
from transformers import pipeline

pipe = pipeline("text2text-generation", model="SnypzZz/Llama2-13b-Language-translate")

# Load model directly
# from transformers import AutoTokenizer, AutoModelForSeq2SeqLM

# tokenizer = AutoTokenizer.from_pretrained("SnypzZz/Llama2-13b-Language-translate")
# model = AutoModelForSeq2SeqLM.from_pretrained("SnypzZz/Llama2-13b-Language-translate")


from transformers import MBartForConditionalGeneration, MBart50TokenizerFast
#article_en = "The head of the United Nations says there is no military solution in Syria"
model = MBartForConditionalGeneration.from_pretrained("SnypzZz/Llama2-13b-Language-translate")
tokenizer = MBart50TokenizerFast.from_pretrained("SnypzZz/Llama2-13b-Language-translate", src_lang="en_XX")

# model_inputs = tokenizer(article_en, return_tensors="pt")

# # translate from English to Korean
# generated_tokens = model.generate(
#     **model_inputs,
#     forced_bos_token_id=tokenizer.lang_code_to_id["ko_KR"]
# )
# result = tokenizer.batch_decode(generated_tokens, skip_special_tokens=True)
# print(result)


app = FastAPI()

@app.post("/test/")
async def MultiLang(text: str = Form()):

    model_inputs = tokenizer(text, return_tensors="pt")

    # translate from English to Korean
    generated_tokens = model.generate(
        **model_inputs,
        forced_bos_token_id=tokenizer.lang_code_to_id["ko_KR"]
    )
    result = tokenizer.batch_decode(generated_tokens, skip_special_tokens=True)

    return {"result" : result}


# # translate from English to Hindi
# generated_tokens = model.generate(
#     **model_inputs,
#     forced_bos_token_id=tokenizer.lang_code_to_id["hi_IN"]
# )
# result = tokenizer.batch_decode(generated_tokens, skip_special_tokens=True)
# # => 'संयुक्त राष्ट्र के नेता कहते हैं कि सीरिया में कोई सैन्य समाधान नहीं है'
# print(result)
"""


"""
원본 - 1줄 테스트
from fastapi import FastAPI, Form
# Use a pipeline as a high-level helper
from transformers import pipeline

pipe = pipeline("text2text-generation", model="SnypzZz/Llama2-13b-Language-translate")

from transformers import MBartForConditionalGeneration, MBart50TokenizerFast
#article_en = "The head of the United Nations says there is no military solution in Syria"
model = MBartForConditionalGeneration.from_pretrained("SnypzZz/Llama2-13b-Language-translate")
tokenizer = MBart50TokenizerFast.from_pretrained("SnypzZz/Llama2-13b-Language-translate", src_lang="en_XX")


app = FastAPI()

@app.post("/test/")
async def MultiLang(text: str = Form()):

    model_inputs = tokenizer(text, return_tensors="pt")

    # translate from English to Korean
    generated_tokens = model.generate(
        **model_inputs,
        forced_bos_token_id=tokenizer.lang_code_to_id["ko_KR"]
    )
    result = tokenizer.batch_decode(generated_tokens, skip_special_tokens=True)

    return {"result" : result}
"""

"""
전체 번역
from fastapi import FastAPI, File, UploadFile
from typing import List
from io import StringIO
import pandas as pd

# Use a pipeline as a high-level helper
from transformers import pipeline

pipe = pipeline("text2text-generation", model="SnypzZz/Llama2-13b-Language-translate")

from transformers import MBartForConditionalGeneration, MBart50TokenizerFast

model = MBartForConditionalGeneration.from_pretrained("SnypzZz/Llama2-13b-Language-translate")
tokenizer = MBart50TokenizerFast.from_pretrained("SnypzZz/Llama2-13b-Language-translate", src_lang="en_XX")

app = FastAPI()

@app.post("/translate/")
async def translate_text(text: str):
    model_inputs = tokenizer(text, return_tensors="pt")
    generated_tokens = model.generate(
        **model_inputs,
        forced_bos_token_id=tokenizer.lang_code_to_id["ko_KR"]
    )
    result = tokenizer.batch_decode(generated_tokens, skip_special_tokens=True)
    return {"result": result}

@app.post("/upload-file/")
async def translate_uploaded_file(file: UploadFile = File(...)):
    contents = await file.read()
    text = contents.decode("utf-8")
    return await translate_text(text)
"""

from fastapi import FastAPI, File, UploadFile
from io import StringIO
from transformers import MBartForConditionalGeneration, MBart50TokenizerFast

app = FastAPI()

model = MBartForConditionalGeneration.from_pretrained("SnypzZz/Llama2-13b-Language-translate")
tokenizer = MBart50TokenizerFast.from_pretrained("SnypzZz/Llama2-13b-Language-translate", src_lang="en_XX")

def translate_sentence(sentence):
    model_inputs = tokenizer(sentence, return_tensors="pt")
    generated_tokens = model.generate(
        **model_inputs,
        forced_bos_token_id=tokenizer.lang_code_to_id["ko_KR"]
    )
    result = tokenizer.batch_decode(generated_tokens, skip_special_tokens=True)
    return result[0] if result else ""

@app.post("/translate/")
async def translate_text(text: str):
    translated_sentences = [translate_sentence(sentence) for sentence in text.split("\n") if sentence.strip()]
    return {"result": translated_sentences}

@app.post("/upload-file/")
async def translate_uploaded_file(file: UploadFile = File(...)):
    contents = await file.read()
    text = contents.decode("utf-8")
    return await translate_text(text)

