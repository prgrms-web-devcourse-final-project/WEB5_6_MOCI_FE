<img width="100" height="80" alt="image" src="https://github.com/user-attachments/assets/84dba144-971b-4d9f-a3c5-58a2c13fc818" />

## 디딤돌 : 디지털 소외계층을 위한 멘토 매칭 서비스
- 디지털 소외계층에게 멘토를 매칭함으로써 디지털 장벽을 낮추는 것을 목표로 함
- 교육자료를 제공함으로써 디지털 소외계층 사람들이 좀 더 쉽게 학습이 가능한 환경을 만들고자 함

## 주요기능
- 멘토채팅방 : 멘토와 1:1 질문&채팅 가능
- AI채팅방 : AI에게 질문을 하고 실시간으로 답변을 받을 수 있음
- 교육자료실 : 여러가지 서비스의 사용법에 대한 정보를 확인할 수 있음
  - 멘토와 관리자의 경우 교육자료실 자료요청게시판을 통해 교육자료실에 글을 등록할 수 있음

## 👤 목표사용자

- 디지털 서비스 사용에 익숙하지 않으신 분들
- 공공기관, 시니어 교육 기관에서 사용

## 🛠️ 기술스택

| 영역 | 기술 |
|------|------|
|  | NextJS (App Router), React, TypeScript |
| **Styling** | TailwindCSS |
| **상태관리** | Zustand |
| **Lint / Format** | ESLint + Prettier |
| **Animation** | GSAP |


 ## 🌱 개발 컨벤션

###  Git 전략
- **브랜치 구조** : `main` → `dev` → `feature/bug`
- **Merge 규칙** : `dev`, `main` merge 시 1명 이상의 승인 필요

###  Branch 네이밍
- 규칙 : `feat/TODO`
  - 예시 : `feat/loginPage`
- 브랜치 태그 종류 :
  - ✨ **feat** : 기능 개발
  - 🐛 **fix** : 버그 수정
  - 🔧 **chore** : 배포, 라이브러리 작업 등
  - 📄 **docs** : 문서 작업 (README 등)
  - 🎨 **style** : CSS 수정, 코드 포맷 변경
  - 💬 **comment** : 주석 추가/수정
