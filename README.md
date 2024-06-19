<h2>프로젝트 소개</h2>

<div style="text-align: center;">
   <img src="https://capsule-render.vercel.app/api?type=venom&color=auto&height=300&section=header&text=A:I&fontSize=90" />
</div>


<p align="center">
  AI 감정분석 모델을 사용해 사용자가 대화내용을 업로드하면 <br/>
  시간별 감정변화, 감정별 비율 차트화, 일별평균 카톡량, 답장텀 그래프화를해서 <br/>
  사용자가 한눈에 정보들을 알아보고 흥미있게 볼수있도록 제공하는 서비스입니다.<br/>
</p>

---

<h2>프로젝트 기간 📆 </h2>
<div align="center">
2024-06-10 ~ 2024-06-18 (총8일간)
</div>

---

<h2>팀 소개 👨‍👩‍👦‍👦</h2>

<div style="text-align: center;">
   <img src="https://capsule-render.vercel.app/api?type=venom&color=auto&height=300&section=header&text=A:I&fontSize=90" />
</div>

<div align="center">
  <p>저희팀 A:I의 :(콜론)은 수학 공식에서 등식이나 비율을 표현할 때 쓰는 기호입니다.<br/>
A = Artificial, I = Intelligence죠. 인간이 의도적으로 만든 것 = 지능이라는 공식이 성립되어<br/>
인간과 같은 지능을 가진 똑똑한 AI를 만들겠다는 마음가짐으로 만들어진 팀입니다.</p>
</div>

---

<h2>팀원 소개 </h2>
</div> 

* **권회은**: 모델 생성/추론 + 화면 출력 + 배포
* **강지윤**: 화면 UI/UX + PPT 작성
* **김현석**: 모델 생성/추론 + 데이터 후처리(차트화) + 배포
* **정상엽**: 모델 성능테스트 + 발표준비/발표
* **배정현**: 화면 UI/UX + 데이터 후처리(차트화)

---

<h2>시작 가이드</h2>

- 가상환경

```
파이썬 버전 3.10
```

- front

```
패키지 설치 npm install
```
```
실행 npm start
```

- back
  
```
패키지 설치 pip install -r requirements.txt
```
```
실행 uvicorn main:app --reload --port=5000
```

---

<h2>기술 스택</h2>
<img src="https://jeonghyun.s3.amazonaws.com/%EA%B8%B0%EC%88%A0%EC%8A%A4%ED%83%9D.png" alt="기술 스택">

---
## 화면 구성 📺

<div style="border: 1px solid #e1e4e8; border-radius: 6px; padding: 16px; margin-bottom: 100px;">
    <h3>메인 페이지</h3>
    <img src="https://jeonghyun.s3.amazonaws.com/main.png" alt="메인 페이지" style="width: 800px; max-width: 800px; margin-bottom: 100px;">
    <img src="https://jeonghyun.s3.amazonaws.com/main2.png" alt="메인 페이지" style="width: 800px; max-width: 800px; margin-bottom: 100px;">
    <img src="https://jeonghyun.s3.amazonaws.com/main3.png" alt="메인 페이지" style="width: 800px; max-width: 800px; margin-bottom: 100px;">
    <img src="https://jeonghyun.s3.amazonaws.com/main4.png" alt="메인 페이지" style="width: 800px; max-width: 800px; margin-bottom: 100px;">
</div>

<div style="border: 1px solid #e1e4e8; border-radius: 6px; padding: 16px; margin-bottom: 100px;">
    <h3>업로드 페이지</h3>
    <img src="https://jeonghyun.s3.amazonaws.com/load1.png" alt="업로드 페이지" style="width: 800px; max-width: 800px; margin-bottom: 100px;">
    <img src="https://jeonghyun.s3.amazonaws.com/load2.png" alt="로딩 페이지" style="width: 800px; max-width: 800px; margin-bottom: 100px;">
   <img src="https://jeonghyun.s3.amazonaws.com/load3.png" alt="로딩 페이지" style="width: 800px; max-width: 800px; margin-bottom: 100px;">
</div>

<div style="border: 1px solid #e1e4e8; border-radius: 6px; padding: 16px; margin-bottom: 100px;">
    <h3>결과 페이지</h3>
    <img src="https://jeonghyun.s3.amazonaws.com/result.png" alt="결과 페이지" style="width: 800px; max-width: 800px; margin-bottom: 100px;">
    <img src="https://jeonghyun.s3.amazonaws.com/result2.png" alt="결과 페이지" style="width: 800px; max-width: 800px; margin-bottom: 100px;">
    <img src="https://jeonghyun.s3.amazonaws.com/result3.png" alt="결과 페이지" style="width: 800px; max-width: 800px; margin-bottom: 100px;">
</div>



---

## 주요 기능 📦

### ⭐️ 카카오톡 대화내용 텍스트 추출 업로드시 감정분석
- 11가지 감정으로 대화에서 분석해서 결과로 나타낸다.
- 나온 결과로 가중치를 설정해 호감도를 도출해낸다.
### ⭐️ LLM을 사용한 대화내용 요약
- 업로드한 대화내용을 LLM 모델을 돌려서 간단하게 5줄요약해서 사용자에게 보여준다
### ⭐️ 결과페이지 결과값 차트화
- 시간별 감정변화를 한눈에 볼수있는 차트로 시각화
- 대화내용중에 나온 감정별로 차지하는 비율을 차트로 시각화
- 하루평균 대화량 차트로 시각화
- 전체대화의 답장텀을 차트로 시각화


---

## 아키텍처 ⛓
<img src="https://jeonghyun.s3.amazonaws.com/project.png" alt="아키텍처">

---

# A-I : 깃허브 규칙
## READ ME

- README 는 간단하게라도 작성한다.
- 리드미의 용도는 이 프로젝트가 무엇인지 그리고 어떻게 동작하는지에 대해 설명하는 기본 자료
- 리드미가 없으면 프로젝트를 다른 사람이 이해하는데 쉽지 않을 수 있다.
- README Template Guide
    - https://github.com/othneildrew/Best-README-Template
- 처음부터 Best Case 로 작성하지 않아도 된다.
- 작성을 하고 계속 갱신하는게 중요하다.

## 브런치 전략

- Git Flow 를 기반으로 Github 을 활용한 Github Flow 를 선호
- Git Flow → [https://danielkummer.github.io/git-flow-cheatsheet/index.ko_KR.html](https://velog.io/@kw2577/Git-branch-%EC%A0%84%EB%9E%B5)

## Code Convention

- 변수와 메소드 명은 명확하게 작성
- 주석은 가급적 지양, Document 를 위한 주석은 Document 수준으로 작성 (그렇지 않다면 제외)
- 각 언어 별로 표준 가이드를 지향
    - 파이썬 : [http://pythonstudy.xyz/python/article/511-파이썬-코딩-스타일](http://pythonstudy.xyz/python/article/511-%ED%8C%8C%EC%9D%B4%EC%8D%AC-%EC%BD%94%EB%94%A9-%EC%8A%A4%ED%83%80%EC%9D%BC)
    - 자바 : https://github.com/JunHoPark93/google-java-styleguide?tab=readme-ov-file
    - 자바스크립트: https://standardjs.com/rules-kokr
- 하나의 Repository 의 각 코드를 작성 할 때 하나의 프로그래밍 표기법만 준수 (혼용 금지)
    - 스네이크, 카멜, 파스칼 중에 선택
- 메소드, 함수 명은 동사로 시작 ( ex) createMember(), deleteContent)
- 이해하기 어려운 약어는 가급적 지양

## Commit Message
[Feature] - 개발에 관한 기능일경우
[Hotfix] - 오류 fix 에 대한 기능 
- 커밋 메시지는 간결하고 짧게 구성한다. (첫줄만 출력) 
- 많은 파일은 커밋하기 보다 적은 파일의 수로 커밋한다. (자주하기 !)
- 하나의 커밋에 하나의 목적만 있는게 좋다. (기능별로 커밋)

## Code Review

- 코드 리뷰가 되지 않은 코드는 머지 되지 않는다.
- 코드 리뷰는 프로젝트의 필수 요소.
- 코드 리뷰 기본 정책
    - https://tech.kakao.com/2022/03/17/2022-newkrew-onboarding-codereview/
- 코드 리뷰의 목적
    - 코드 리뷰는 팀의 발전이 목표
    - 좋은 퀄리티의 Product 를 만들어내는데 목표가 있다.
    - 가독성이 좋은 코드. 유지보수하기 좋은 코드가 목표
    - 팀 모두가 프로젝트에 대한 이해도가 높아지는 것이 목표
    - 목적없는 비난과 비판은 지양
    - **서로 함께 성장할 수 있는 피드백을 지향**
- 코드리뷰는 Github PR 을 활용한 온라인 리뷰, 함께 모여서 진행하는 오프라인 리뷰로 나눈다.
    - 온라인 리뷰
        - Commit Message 와 Code Diff 를 중심으로 리뷰 한다.
        - 리뷰어가 파악할 수 있는 범위 내에서만 점검한다.
    - 오프라인 리뷰
        - 개발을 한 의도와 방향성에 대해 컨센서스를 맞추는 것이 목표
        - 온라인에서는 서로 주고 받기 어려운 구조적인 부분에 대해 서로 논의하는 자리
        - 온라인 리뷰와 별개로 오프라인 리뷰도 필수로 진행 (머지를 한 코드라도 오프라인 리뷰는 진행)
