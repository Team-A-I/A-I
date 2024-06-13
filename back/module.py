from collections import defaultdict
import re
from transformers import pipeline

classifier = pipeline("sentiment-analysis", model="nlp04/korean_sentiment_analysis_kcelectra")

def parse_dialogues(lines):
    result = []
    current_date = None
    date_pattern = re.compile(r'--------------- (\d{4}년 \d{1,2}월 \d{1,2}일 [가-힣]+) ---------------')
    message_pattern = re.compile(r'\[(.*?)\] \[(오전|오후) (\d{1,2}:\d{2})\] (.*)')

    for line in lines:
        date_match = date_pattern.match(line)
        if date_match:
            current_date = date_match.group(1)
            continue
        
        message_match = message_pattern.match(line)
        if message_match:
            user, am_pm, time, message = message_match.groups()
            if current_date:
                result.append(f'[{user}] [{current_date} {am_pm} {time}] {message}')
            else:
                result.append(f'[{user}] [{am_pm} {time}] {message}')
        else:
            result.append(line.strip())
    return result

def organize_dialogues(parsed_lines):
    pattern = re.compile(r'\[(.*?)\] \[(.*?)\] (.*)')
    dialogues = defaultdict(list)
    combined_dialogues = []
    
    current_name = None
    current_time = None
    current_message = None

    for line in parsed_lines:
        if not line.strip():
            continue
        match = pattern.match(line)
        if match:
            current_name, current_time, current_message = match.groups()
            dialogues[current_name].append((current_name, current_time, current_message))
            combined_dialogues.append((current_name, current_time, current_message))
        else:
            if current_name and current_time and current_message is not None:
                updated_message = dialogues[current_name][-1][2] + " " + line.strip()
                dialogues[current_name][-1] = (current_name, current_time, updated_message)
                combined_dialogues[-1] = (current_name, current_time, updated_message)
    
    return dialogues, combined_dialogues

def analyze_sentiments(dialogues, combined_dialogues):
    sentiment_scores = defaultdict(lambda: defaultdict(list))
    sentiment_message_count = {}
    names = {}
    score = {}
    sumscore = {}
    scoreList = {}
    sumscore2 = {}
    scoreList2 = {}

    for name, dialogues_list in dialogues.items():
        count = 0
        names[name] = []
        score[name] = 0.0
        sumscore[name] = 50
        scoreList[name] = []
        sumscore2[name] = 50
        scoreList2[name] = []

        for dialogue in dialogues_list:
            result = classifier(dialogue[2])[0]
            count += 1
            sentiment_scores[name][result['label']].append(result['score'])

            if result['label'] in ['고마운', '기쁨(행복한)', '즐거운(신나는)', '사랑하는', '설레는(기대하는)']:
                score[name] += 1
                sumscore[name] += 1
            elif result['label'] != '일상적인':
                sumscore[name] -= 1
            scoreList[name].append(sumscore[name])
            names[name].append((dialogue[0], dialogue[1], dialogue[2], result['label'], result['score'], sumscore[name]))

        score[name] = score[name] / count * 100
        sentiment_message_count[name] = count

    sentiment_avg_scores = {name: {sentiment: round(sum(scores) / sentiment_message_count[name] * 100) 
                                   for sentiment, scores in sentiments.items()} 
                            for name, sentiments in sentiment_scores.items()}
    
    check_score = {s: sum(sentiment_avg_scores[s].values()) for s in sentiment_avg_scores}

    all_names = list(dialogues.keys())
    mixed_results = []

    for dialogue in combined_dialogues:
        result = classifier(dialogue[2])[0]
        mixed_results.append((dialogue[0], dialogue[1], dialogue[2], result['label']))

        if dialogue[0] == all_names[0]:
            if result['label'] in ['고마운', '기쁨(행복한)', '즐거운(신나는)', '사랑하는', '설레는(기대하는)']:
                sumscore2[all_names[0]] += 1
            elif result['label'] != '일상적인':
                sumscore2[all_names[0]] -= 1
            scoreList2[all_names[0]].append(sumscore2[all_names[0]])
            scoreList2[all_names[1]].append(sumscore2[all_names[1]])
        elif dialogue[0] == all_names[1]:
            if result['label'] in ['고마운', '기쁨(행복한)', '즐거운(신나는)', '사랑하는', '설레는(기대하는)']:
                sumscore2[all_names[1]] += 1
            elif result['label'] != '일상적인':
                sumscore2[all_names[1]] -= 1
            scoreList2[all_names[0]].append(sumscore2[all_names[0]])
            scoreList2[all_names[1]].append(sumscore2[all_names[1]])

    return names, score, scoreList, mixed_results, sentiment_avg_scores, check_score, scoreList2


# 감정스코어 평균합산에 대한 백분율을 만드는 코드
def calculate_percentage_scores(sentiment_avg_scores):
    percentage_scores = {}
    
    for name, sentiments in sentiment_avg_scores.items():
        total_score = sum(sentiments.values())
        percentage_scores[name] = {sentiment: round((score / total_score) * 100, 2) for sentiment, score in sentiments.items()}
    
    return percentage_scores