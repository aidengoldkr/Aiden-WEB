/**
 * /sandrone 설정 (구글 버전 · 리로 버전 공용).
 *
 * PASSWORD — 잠금 해제/로그인에 쓰는 비밀번호.
 * CODES    — 코드 → 복사될 텍스트. 아래는 탐구 보고서 각 칸(1~6).
 *
 * 비교는 앞뒤 공백을 제거한 뒤 대소문자를 구분해서 한다.
 */
export const PASSWORD = "sandrone";

export const CODES: Record<string, string> = {
  // 1. 탐구 주제
  "1": "RAG의 Chunk Size와 Top-K에 따른 응답 정확도·입력량·생성 시간의 통계적 분석",

  // 2. 관련 교과서 단원
  "2": "Ⅱ. 통계 분석 - 02 대푯값, 산포도와 상관관계",

  // 3. 주제 선정 이유
  "3": `기술 문서나 제품 설명서를 활용하는 AI 질의응답 서비스에서는 정확한 근거 검색과 효율적인 입력량 관리가 중요하다. RAG는 질문과 관련된 문서를 검색하여 답변 생성에 활용하는 방식이지만, 문서를 나누는 크기와 검색 개수가 달라지면 전달되는 근거도 달라진다. 따라서 많은 자료를 전달하는 것만으로 성능이 좋아지는지 실제 측정으로 확인하고자 했다. 과학·기술 분야의 공개 문서와 기존 정답을 활용하여 가상의 규칙을 직접 만드는 데서 생기는 한계를 줄이고, 교과서의 평균·산포도·상관관계로 검색 설정의 차이를 분석했다. 『린 스타트업』의 만들기·측정·학습 관점은 가설을 구현하고 관측 결과로 판단하는 탐구 방법에 연결했다.`,

  // 4. 참고 자료
  "4": `1. KorQuAD 1.0 개발 세트 — 한국어 위키백과 기반 문서·질문·기준 정답 사용.
소개: https://korquad.github.io/category/1.0_KOR.html
원본 데이터: https://raw.githubusercontent.com/korquad/korquad.github.io/master/dataset/KorQuAD_v1.0_dev.json
이용 조건(CC BY-ND 2.0 KR): https://creativecommons.org/licenses/by-nd/2.0/kr/
2. KorQuAD 공식 평가 코드 — 완전 일치율(EM)·문자 단위 F1 계산에 사용.
https://raw.githubusercontent.com/korquad/korquad.github.io/master/dataset/evaluate-v1.0.py
3. 『테디노트의 랭체인을 활용한 RAG 비법노트 [기본편]』 — 이경록, 리코멘드, 2025. 공개 목차와 본문 발췌의 RAG·텍스트 분할·임베딩·검색 개념 참고.
https://bnk.kpipa.or.kr/home/v3/addition/adiPromoMetaDataView/seq_20250520155139280445
4. 『린 스타트업』 — 에릭 리스, 이창수·송우일 옮김, 인사이트, 2012. 만들기·측정·학습 관점을 실험 방법에 연결. 공식 원칙 설명 참고.
https://theleanstartup.com/principles?level=1
5. "Retrieval-Augmented Generation for Knowledge-Intensive NLP Tasks" — Lewis 외, NeurIPS, 2020. 검색과 생성의 결합에 관한 논문 참고.
https://arxiv.org/abs/2005.11401
6. AWS, 「RAG란?」 — RAG 처리 과정과 활용 방식 참고.
https://aws.amazon.com/ko/what-is/retrieval-augmented-generation/
7. OpenAI 공식 모델 문서 — 실제 호출 모델의 사양과 비용 단가 확인.
GPT-5 nano: https://developers.openai.com/api/docs/models/gpt-5-nano
text-embedding-3-small: https://developers.openai.com/api/docs/models/text-embedding-3-small
8. 『취업실무수학』 수업 교과서 — 앞서 제시한 통계 분석·인공지능과 수학 소단원 연계. 단원명은 제공된 목차 기준이며, 저자·출판사·공개 URL은 미확인.`,

  // 5. 더 알아보고 싶은 내용
  "5": `동일한 질문도 검색 설정에 따라 다른 근거를 받으므로 정답률과 자원 사용량이 함께 달라질 수 있다는 점을 확인했다. 이번 실험의 최고 완전 일치율은 35.4%였으며, 청크 128에서는 Top-K 1과 8의 평균 입력량이 각각 535.4토큰과 2867.8토큰이었다. 완전 일치율만으로는 답이 부분적으로 맞거나 표현만 다른 경우를 구분하기 어려워 문자 단위 F1도 함께 살펴보았다. 앞으로는 공개 데이터에 모델이 미리 노출되었을 가능성을 줄인 새 기술 문서, 근거가 없는 질문, 같은 질문의 반복 생성까지 추가하고 싶다. 사람의 판정과 자동 점수를 비교하여 실제 사용자 관점의 답변 정확도도 평가하고자 한다.`,

  // 6. 요약 (공백 포함 490~510자)
  "6": `검색 증강 생성(RAG)은 외부의 관련 문서를 검색하여 언어 모델의 답변에 근거를 제공하는 기술이다. 공개 한국어 질의응답 데이터셋 KorQuAD에서 과학·기술 관련 문서 12개와 원래 질문 48개를 선정했다. 청크 크기 4종과 검색 개수 4종을 조합한 16개 조건에서 GPT-5 nano로 답변 768개를 생성했다. text-embedding-3-small로 문서와 질문을 벡터화하고 코사인 유사도로 검색했다. 공식 평가 코드의 완전 일치율과 F1을 사용하고, 입력 토큰과 생성 시간의 평균·분산·표준편차를 비교했다. 최고 완전 일치율은 35.4%였다. 청크 128에서 검색 개수를 1개에서 8개로 늘리자 입력량은 435.6% 증가했으며 완전 일치율은 22.9%에서 27.1%로 변했다. 입력량과 생성 시간의 상관계수는 0.494였다. 결과를 통해 검색 설정에 따른 정확도와 자원 사용량의 변화를 함께 비교했다. 소규모 주제 표본과 조건별 1회 생성이므로 일반화에는 한계가 있다.`,
};
