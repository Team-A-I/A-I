
# STEP 1. import modules
from transformers import pipeline

# STEP 2. creaete inference instance
classifier = pipeline("sentiment-analysis", model="nlp04/korean_sentiment_analysis_kcelectra")

# STEP 3. prepare input data
text = "싫어"

# STEP 4. inference
result = classifier(text)

# STEP 5. visualize
print(result)