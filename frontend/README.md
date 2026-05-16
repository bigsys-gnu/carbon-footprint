# 프론트엔드 — 탄소 발자국 추적 프로그램

탄소배출량 데이터를 시각화하고 관리하는 Vue.js 기반 대시보드입니다.

## 기술 스택

- [Vue.js 3](https://vuejs.org/)
- TypeScript
- Node.js / npm

## 사전 준비

- Node.js ≥ 16
- npm ≥ 8
- 백엔드 서버가 먼저 실행 중이어야 합니다 ([`../backend/README.md`](../backend/README.md) 참고)

## 설치

```bash
# 기존 node_modules가 있다면 삭제
rm -rf node_modules

# 의존성 설치
npm install
```

## 실행

```bash
npm run serve
```

터미널에 출력되는 로컬 주소로 접속합니다 (기본값: `http://localhost:8080`).  
반드시 `frontend/` 디렉터리에서 실행해야 합니다.

## 프로덕션 빌드

```bash
npm run build
```

빌드 결과물은 `dist/` 디렉터리에 생성됩니다.

## 환경 설정

백엔드 서버 주소가 기본값과 다른 경우, 환경 파일에서 수정합니다.

```
# .env.local
VUE_APP_API_URL=http://localhost:8000
```

## 주요 기능

- 트리 구조 조직 관리 — 부서별 탄소배출량 통합 추적
- 에너지원별 탄소배출량 입력 및 자동 산정 (전력, 석탄, 가스, 열)
- 대시보드 시각화 — 스코프별·카테고리별 배출량, 기간별 추이
