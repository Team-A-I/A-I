from collections import defaultdict # defaultdict를 사용하여 딕셔너리를 초기화
from datetime import datetime
import re  # 정규 표현식 라이브러리를 가져옴
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
        # print(f"dialogue[0]:{dialogue[0]}, dialogue[1]:{dialogue[1]}, dialogue[2]:{dialogue[2]}")
        mixed_results.append(dialogue[2])

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

    # print(f"len(mixed_results){len(mixed_results)}")
    return names, score, scoreList, mixed_results, sentiment_avg_scores, check_score, scoreList2


# 모든 대화를 넣은 리스트를 지정된 개수의 청크로 나누는 함수
def chunk_list(lst, num_chunks):
    avg = len(lst) / float(num_chunks)  # 리스트의 평균 청크 크기를 계산
    chunks = []  # 청크를 저장할 리스트 초기화
    last = 0.0  # 청크의 시작 인덱스 초기화

    while last < len(lst):
        chunks.append(lst[int(last):int(last + avg)])  # 현재 위치에서 평균 크기만큼 잘라서 청크에 추가
        last += avg   # 다음 청크의 시작 인덱스를 갱신 

    return chunks

# 각 청크를 순회하며 문장을 요약하는 함수
def summarize(chunks):
    result = [] # 요약된 문장을 저장할 리스트 초기화
    for chunk in chunks:
        chunk = " ".join(chunk)  # 청크의 문장을 하나의 문자열로 결합
        inputs = ["summarize: " + chunk]  # 요약할 입력 데이터 생성
        inputs = tokenizer(inputs, max_length=1000, truncation=True, return_tensors="pt")  # 입력 데이터를 토크나이즈하고 텐서로 변환
        output = model.generate(**inputs, num_beams=3, do_sample=True, min_length=10, max_length=32) # 요약 모델을 사용해 출력 생성
        decoded_output = tokenizer.batch_decode(output, skip_special_tokens=True)[0] # 출력 데이터를 디코딩
        result.append(nltk.sent_tokenize(decoded_output.strip())[0]) # 첫 번째 문장만 선택해 결과 리스트에 추가
    return result 



# 감정스코어 평균합산에 대한 백분율을 만드는 코드
def calculate_percentage_scores(sentiment_avg_scores):
    percentage_scores = {}  # 백분율 스코어를 저장할 딕셔너리 초기화
    
    # 각 사용자의 감정 점수를 순회
    for name, sentiments in sentiment_avg_scores.items():
        total_score = sum(sentiments.values()) # 모든 감정 점수의 합을 계산
        percentage_scores[name] = {sentiment: round((score / total_score) * 100, 2) for sentiment, score in sentiments.items()}  # 각 감정에 대해 백분율을 계산하여 딕셔너리에 저장
    return percentage_scores # 백분율 스코어를 반환


# 호감도 수치 계산
# 각 감정의 점수에 가중치를 부여 후에 그 가중치에 곱한 후 합산
# 총 대화 수로 나누어 평균 호감도를 구한다.
def calculate_affinity(sentiment_scores):
    # 감정 범주에 따라 가중치를 설정합니다.
    weights = {
        '슬픔(우울한)': -0.5,
        '짜증남': -0.5,
        '생각이 많은': -0.5,
        '걱정스러운(불안한)': -0.5,
        '힘듦(지침)': -0.5,
        '일상적인': 0,
        '즐거운(신나는)': 1,
        '기쁨(행복한)': 1,
        '설레는(기대하는)': 1,
        '고마운': 1,
        '사랑하는': 1
    }
    
    total_weighted_score = 0  # 총 가중치 점수를 저장할 변수 초기화
    total_count = 0  # 총 점수를 저장할 변수 초기화
    
    # 각 감정과 그 점수를 순회
    for emotion, score in sentiment_scores.items():
        weight = weights.get(emotion, 0) # 해당 감정의 가중치를 가져옴 (기본값은 0)
        total_weighted_score += score * weight # 감정 점수에 가중치를 곱해 총 가중치 점수에 더함
        total_count += score # 총 점수에 현재 점수를 더함
    
    if total_count == 0:
        return 0 # 총 점수가 0이면 0을 반환
    
    # 호감도 점수를 0에서 1 사이의 값으로 정규화
    affinity_score = (total_weighted_score / total_count + 1) / 2
    return affinity_score  # 계산된 호감도 점수를 반환


# 하루에 보낸 메시지량 계산
def calculate_daily_message_counts(individual_results):
    from collections import defaultdict
    import re

    daily_counts = defaultdict(lambda: defaultdict(int)) # 일별 메시지 수를 저장할 중첩 딕셔너리 초기화

    # 각 사용자의 메시지를 순회
    for name, messages in individual_results.items():
        # print(f"Processing {name}: {messages[:3]}...")  # 메시지 로그 출력 (처음 3개만 표시)
        for message in messages:
            if isinstance(message, tuple) and len(message) > 1:   # 메시지가 튜플이고 길이가 1 이상인 경우
                date_str = message[1]  # 날짜 문자열을 추출

                # 날짜 문자열에서 일(day) 부분을 추출
                day_match = re.search(r'\d{1,2}일', date_str) # '1일', '2일' 등의 패턴을 검색
                if day_match: 
                    day = int(day_match.group().replace('일', ''))  # '일'을 제거하고 정수로 변환
                    daily_counts[name][day] += 1   # 해당 사용자의 해당 일(day)의 메시지 수를 증가
                    # print(f"Updated daily counts for {name}: {daily_counts[name]}")  # 업데이트된 일별 메시지 수 로그 출력
                else:
                    print(f"Date parsing error: {date_str}")  # 날짜 파싱 에러 로그 출력

    # 일별 메시지 수를 계산한 후 일평균 메시지 수를 계산
    average_daily_counts = {}  # 일평균 메시지 수를 저장할 딕셔너리 초기화
    for name, day_counts in daily_counts.items():
        total_messages = sum(day_counts.values()) # 총 메시지 수를 계산
        total_days = len(day_counts)  # 메시지를 보낸 총 일 수를 계산
        average_daily_counts[name] = total_messages / total_days if total_days > 0 else 0  # 일평균 메시지 수를 계산
        # print(f"Average daily message count for {name}: {average_daily_counts[name]}")  # 일평균 메시지 수 로그 출력

    return average_daily_counts  # 일평균 메시지 수를 반환


def convert_to_24h_time(am_pm, time):
    try:
        # 시간과 분을 ':' 기준으로 분리하고 정수형으로 변환
        hour, minute = map(int, time.split(':'))
        
        # '오후'일 때 시간 변환
        if am_pm == '오후' and hour != 12:
            hour += 12
        # '오전'일 때 시간 변환
        elif am_pm == '오전' and hour == 12:
            hour = 0
        
        return hour, minute
    except ValueError as e:
        # 변환 중 에러가 발생하면 에러 메시지를 출력하고 에러를 다시 발생시킴
        print(f"Error converting time: {e}")
        print(f"am_pm: {am_pm}, time: {time}")
        raise e


# 날짜 문자열에서 일(day)과 시간(time)을 추출하는 함수
def extract_day_and_time(date_str):
    try:
        # 날짜에서 년, 월, 일 부분 추출
        date_match = re.search(r'\d{4}년 \d{1,2}월 \d{1,2}일', date_str)
        if not date_match:
            raise ValueError("Date format incorrect")

        date_part = date_match.group()

        # 시간 부분 추출 (오전/오후 포함)
        time_match = re.search(r'(오전|오후) (\d{1,2}:\d{2})', date_str)
        if not time_match:
            raise ValueError("Time format incorrect")

        am_pm = time_match.group(1)
        time = time_match.group(2)

        return date_part, am_pm, time
    except Exception as e:
        #print(f"Error extracting day and time: {e}")
        #print(f"date_str: {date_str}")
        return None, None, None

    
# 대화 목록을 날짜별로 그룹화하는 함수
def group_messages_by_date(dialogues):
    grouped_messages = defaultdict(list)

    for message in dialogues:
        if isinstance(message, tuple):
            user, date_time, msg = message   # 튜플을 사용자, 날짜시간, 메시지로 분리
            date_str = date_time.split(' ')[1]  # 'YYYY년 MM월 DD일' 부분 추출
            grouped_messages[date_str].append(message)  # 추출한 날짜를 키로 하여 메시지를 리스트에 추가

    return grouped_messages



# 답장 텀 계산 함수
def calculate_reply_gaps(dialogues):
    reply_gaps = []

    for i in range(len(dialogues) - 1):
        current_message = dialogues[i]
        next_message = dialogues[i + 1]

        # 현재 메시지와 다음 메시지가 튜플인지 확인
        if isinstance(current_message, tuple) and isinstance(next_message, tuple):
            current_user, current_date_time, current_msg = current_message
            next_user, next_date_time, next_msg = next_message

            # 동일한 사용자가 연속으로 메시지를 보낸 경우 건너뜀
            if current_user == next_user:
                continue

            try:
                # 현재 메시지와 다음 메시지의 날짜와 시간을 추출
                current_date_part, current_am_pm, current_time = extract_day_and_time(current_date_time)
                next_date_part, next_am_pm, next_time = extract_day_and_time(next_date_time)

                if current_date_part is None or next_date_part is None:
                    continue

                # 12시간 형식을 24시간 형식으로 변환
                current_hour, current_minute = convert_to_24h_time(current_am_pm, current_time)
                next_hour, next_minute = convert_to_24h_time(next_am_pm, next_time)

                # 날짜를 datetime 객체로 변환
                current_date = datetime.strptime(current_date_part, '%Y년 %m월 %d일')
                next_date = datetime.strptime(next_date_part, '%Y년 %m월 %d일')

                # 시간 계산 (분 단위)
                current_minutes = current_date.day * 24 * 60 + current_hour * 60 + current_minute
                next_minutes = next_date.day * 24 * 60 + next_hour * 60 + next_minute
                gap = next_minutes - current_minutes

                # 답장 간격 정보를 리스트에 추가
                reply_gaps.append({
                    'from': current_user,
                    'to': next_user,
                    'gap': gap,
                    'date': current_date_part
                })
            except ValueError as e:
                #print(f"Error parsing time: {e}")
                print(f"current_date_time: {current_date_time}, next_date_time: {next_date_time}")

    #print("Calculated reply gaps:", reply_gaps)
    return reply_gaps



# from transformers import MBartForConditionalGeneration, MBart50TokenizerFast

# model1 = MBartForConditionalGeneration.from_pretrained("SnypzZz/Llama2-13b-Language-translate")
# tokenizer1 = MBart50TokenizerFast.from_pretrained("SnypzZz/Llama2-13b-Language-translate", src_lang="en_XX")


# # 번역 모델 - 영->한 번역 + URL처리X 그대로 전송
# def translate_message(message):
#     encoded_input = tokenizer1(message, return_tensors="pt", padding=True, truncation=True)
#     generated_tokens = model1.generate(**encoded_input, forced_bos_token_id=tokenizer1.lang_code_to_id["ko_KR"])
#     translated_message = tokenizer1.batch_decode(generated_tokens, skip_special_tokens=True)[0]
#     return translated_message

# def process_dialogues(lines):
#     processed_lines = parse_dialogues(lines)

#     if processed_lines is None:
#         raise ValueError("parse_dialogues returned None")

#     translated_messages = []  # 번역된 메시지들을 담을 리스트

#     for line in processed_lines:
#         if not line.startswith("http"):  # URL이 아닌 경우에만 번역 수행
#             translated_message = translate_message(line)
#             translated_messages.append(translated_message)
#         else:
#             translated_messages.append(line)  # URL은 그대로 추가
    
#     return translated_messages
