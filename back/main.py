from fastapi import FastAPI, File, UploadFile
from fastapi.middleware.cors import CORSMiddleware
from module import analyze_sentiments, organize_dialogues, parse_dialogues, calculate_percentage_scores, calculate_affinity, calculate_daily_message_counts, chunk_list, summarize
from module_llm import format_summary, llm_summary

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
    try:
        contents = await file.read()
        lines = contents.decode('utf-8').splitlines()

        result = parse_dialogues(lines)
        dialogues, combined_dialogues = organize_dialogues(result)

        names, score, scoreList, mixed_results, sentiment_avg_scores, check_score, scoreList2 = analyze_sentiments(dialogues, combined_dialogues)

        # 백분율 계산
        sentiment_avg_scores_percentage = calculate_percentage_scores(sentiment_avg_scores)

        # 호감도 계산
        affinity_scores = {name: calculate_affinity(scores) for name, scores in sentiment_avg_scores.items()}

        # 일별 메시지량 계산
        average_daily_message_counts = calculate_daily_message_counts(names)
        # print("Average Daily Message Counts:", average_daily_message_counts)  # 로그 추가

        #대화 요약
        chunks = chunk_list(mixed_results,5)
        summary = summarize(chunks)

        #llm요약
        llama_summary = llm_summary(mixed_results)
        final_summary = format_summary(llama_summary)
        # print(f"final_answer:{final_answer}")

        result = {
            "individual_results": names,
            "individual_score_lists_for_graph": scoreList2,
            "sentiment_avg_scores": sentiment_avg_scores,
            "sentiment_avg_scores_percentage": sentiment_avg_scores_percentage,
            "individual_scores": check_score,
            "affinity_scores": affinity_scores,
            "average_daily_message_counts": average_daily_message_counts,  # 추가된 부분
            "summary_mixed_results": final_summary
        }
        return result
    except Exception as e:
        return {"error": str(e)}

#uvicorn main:app --reload --port=5000