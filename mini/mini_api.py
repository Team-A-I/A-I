# backend/main.py
from fastapi import FastAPI, File, UploadFile
from fastapi.middleware.cors import CORSMiddleware
from transformers import pipeline
import nltk
from typing import Dict, List

# nltk 패키지 다운로드 (punkt)
nltk.download('punkt')
from nltk.tokenize import sent_tokenize

# STEP 1. 모듈 임포트

# STEP 2. 감정 분석 파이프라인 생성
classifier = pipeline("sentiment-analysis", model="nlp04/korean_sentiment_analysis_kcelectra")

app = FastAPI()

# CORS 설정
app.add_middleware(
    CORSMiddleware,
    allow_origins=["http://localhost:3000"],
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

def parse_kakaotalk(text: str) -> List[Dict[str, str]]:
    # 카카오톡 대화 내용을 파싱하여 메시지 리스트로 반환하는 함수
    messages = []
    lines = text.split('\n')
    for line in lines:
        if "] [" in line:
            try:
                # 메시지의 이름, 시간, 내용을 파싱
                name, rest = line.split('] [', 1)
                name = name.split('[', 1)[1]
                time, message = rest.split('] ', 1)
                messages.append({"name": name, "time": time, "message": message})
            except ValueError:
                continue
    return messages

@app.post("/text/")
async def text(file: UploadFile = File(...)):
    # STEP 3. 업로드된 파일 읽기
    contents = await file.read()
    text = contents.decode("utf-8")

    # STEP 4. 텍스트를 메시지 단위로 파싱
    messages = parse_kakaotalk(text)

    # STEP 5. 각 메시지에 대해 감정 분석 수행
    results = []
    sentiments = {}
    counts = {}
    for message in messages:
        sentiment_result = classifier(message["message"])[0]
        sentiment = sentiment_result['label']
        score = sentiment_result['score']

        # 감정 분석 결과를 results 리스트에 저장
        results.append({
            "name": message["name"],
            "time": message["time"],
            "message": message["message"],
            "sentiment": sentiment,
            "score": score
        })

        # 사람별로 감정 점수를 누적 계산
        if message["name"] not in sentiments:
            sentiments[message["name"]] = {}
            counts[message["name"]] = 0

        if sentiment not in sentiments[message["name"]]:
            sentiments[message["name"]][sentiment] = 0

        sentiments[message["name"]][sentiment] += 1
        counts[message["name"]] += 1

    # STEP 6. 사람별 감정 비율 계산
    percentages = {}
    for name, sentiment_scores in sentiments.items():
        total_messages = counts[name]
        percentages[name] = {key: (value / total_messages) * 100 for key, value in sentiment_scores.items()}

    # STEP 7. 결과 반환
    return {"percentages": percentages}
