from langserve import RemoteRunnable

chain = RemoteRunnable("https://gnat-suited-weekly.ngrok-free.app/prompt")

def llm_summary(topic):
    # topic_string = ' '.join(topic)
    answer = ""
    message = chain.stream(
        {"topic": f"""{topic}"""})

    for m in message:
        answer += m
        # print(m, end="")
    return answer

def format_summary(summary):
    summary_list = summary.split('\n')
    formatted_summary = [f"{summary_list[i]}" for i in range(len(summary_list))]
    cleaned_summary = [sentence.replace('\r', '').split('. ', 1)[1] if '. ' in sentence else sentence.replace('\r', '') for sentence in formatted_summary]
    print(f"cleaned_summary:{cleaned_summary}")
    return cleaned_summary