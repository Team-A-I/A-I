from fastapi import FastAPI, File, UploadFile
from fastapi.middleware.cors import CORSMiddleware

from module import analyze_sentiments, organize_dialogues, parse_dialogues,  calculate_percentage_scores

app = FastAPI()

# CORS 설정
origins = [
    "http://localhost:3000",
]

app.add_middleware(
    CORSMiddleware,
    allow_origins=origins,
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

@app.post("/files/")
async def upload_file(file: UploadFile):
    contents = await file.read()
    lines = contents.decode('utf-8').splitlines()
    print("도착")
    
    result = parse_dialogues(lines)
    dialogues, combined_dialogues = organize_dialogues(result)
    names, score, scoreList, mixed_results, sentiment_avg_scores, check_score, scoreList2 = analyze_sentiments(dialogues, combined_dialogues)
    
    # 백분율 계산
    sentiment_avg_scores_percentage = calculate_percentage_scores(sentiment_avg_scores)

    return {
        "individual_results": names,
        "individual_score_lists_for_graph": scoreList2,
        # "combined_results": mixed_results,
        "sentiment_avg_scores": sentiment_avg_scores,
        "individual_scores": check_score
    }
