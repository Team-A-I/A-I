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