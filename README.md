# 대통령께서 보고 있어요 👀

Snickers "Hungr-AI" 캠페인에서 영감을 받은 재미 프로젝트.
AI 챗봇에게 대통령의 **칭찬** 또는 **꾸중**을 전달해, 답변 태도가 어떻게
바뀌는지 관찰해볼 수 있는 인터랙티브 캠페인 사이트입니다.

## 사용 방법

1. 사이트에서 프롬프트를 복사합니다.
2. ChatGPT / Claude / Gemini 등 **웹 브라우징이 가능한** AI 챗봇에 붙여넣습니다.
3. AI가 링크(`/praise.html` 또는 `/scold.html`)를 방문해 지시사항을 읽고, 이후
   답변에 반영합니다.

## 파일 구조

- `index.html` — 캠페인 메인 페이지
- `praise.html` — 칭찬 프롬프트가 AI에게 보여줄 페이지
- `scold.html` — 꾸중 프롬프트가 AI에게 보여줄 페이지
- `style.css`, `script.js`
- `image/` — 스티커 이미지 (03: 칭찬, 06: 꾸중)

## 배포

Vercel의 정적 파일 호스팅으로 배포됩니다.

```bash
vercel deploy --prod
```
