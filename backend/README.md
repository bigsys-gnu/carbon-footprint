# 백엔드 — 탄소 발자국 추적 프로그램

carbon-footprint 프로젝트의 API 서버입니다.  
탄소배출량 산정·저장·조회를 담당하며, 프론트엔드 대시보드에 REST API를 제공합니다.

---

## 기술 스택

- Python / Django
- MySQL (Docker)
- Docker + docker-compose
- Swagger (API 문서)

---

## 서버 실행 방법

1. **Ubuntu 20.04 환경을 준비합니다.**

2. **Docker와 docker-compose를 설치합니다.**

3. **저장소를 clone합니다.**
   ```bash
   git clone https://github.com/bigsys-gnu/carbon-footprint.git
   ```

4. **`backend/` 디렉터리에서 실행 스크립트를 실행합니다.**
   ```bash
   cd carbon-footprint/backend
   bash runServer.sh
   ```

5. **서버 동작을 확인합니다.**  
   Swagger UI에 접속하여 API가 정상 동작하는지 확인합니다. (아래 [API 명세](#api-명세-및-사용법) 참고)

---

## 실행 전 주의 사항

### .env 및 config.py

보안상의 이유로 `.env`와 `config.py` 파일은 제공되지 않습니다.  
아래 예시를 참고하여 직접 작성해 주십시오.

**config.py 예시**
```python
SECRET_KEY = "본인이 선택한 비밀 암호화 키"

DATABASES = {
    "default": {
        "ENGINE": "django.db.backends.mysql",
        "NAME": "mysql에서 본인이 생성한 데이터베이스의 이름",
        "USER": "root",
        "PASSWORD": "본인이 선택한 비밀번호",
        "HOST": "db"
    }
}
```

**.env 예시**
```
MYSQL_ROOT_PASSWORD="본인이 설정한 mysql의 루트 비밀번호"
DB_VOLUME="데이터를 저장할 볼륨 이름"
CARBON_PORT=본인이 사용할 포트 번호
```

### logs 폴더

`logs/` 폴더는 저장소에 포함되어 있지 않습니다.  
서버 실행 전 직접 생성하고, 그 안에 `Server.log` 파일을 만들어 주십시오.

```bash
mkdir logs
touch logs/Server.log
```

### runServer.sh 실행 전 선행 조건

`runServer.sh`를 실행하려면, **clone한 디렉터리의 상위 디렉터리**에 아래 세 폴더가 있어야 합니다.

```
../CarMigrate/
../ComMigrate/
../HuMigrate/
```

### MySQL 데이터베이스

docker-compose 빌드 시, `.env`에서 정의한 데이터베이스 이름이 MySQL 도커 볼륨에 존재하지 않으면 실행되지 않습니다.  
MySQL 도커는 `.env`에서 정의한 도커 볼륨을 사용하여 생성됩니다.

### ⚠️ Human 앱 로그인 코드 수정 (운영 전 필수)

로그인 API 일부가 테스트 코드 실행을 위해 변경된 상태입니다.  
실제 운영 전 반드시 아래와 같이 수정해야 합니다.

`Human/views.py`의 `LogInView` 클래스 `post` 함수에서:

```python
# 수정 전 (테스트용 — 운영 환경에서 사용 금지)
if (PW == User.password)

# 수정 후 (운영용)
if check_password(PW, User.password)
```

---

## API 명세 및 사용법

서버 실행 후 Swagger UI에서 전체 API 목록과 사용법을 확인할 수 있습니다.

| 실행 환경 | Swagger 접속 주소 |
|-----------|------------------|
| 로컬 실행 | `http://127.0.0.1:{CARBON_PORT}/swagger` |
| 외부 서버 | `http://{서버 IP}:{CARBON_PORT}/swagger` |

※ `CARBON_PORT`는 `.env` 파일에서 설정한 포트 번호입니다.

---

## 디렉터리 구조 및 설명

각 폴더의 자세한 설명은 해당 폴더 내부의 마크다운 파일을 참조하십시오.

### 공통 파일 설명

| 파일 | 설명 |
|------|------|
| `models.py` | 데이터베이스 스키마 정의 |
| `admin.py` | 관리자 페이지에 스키마 등록 |
| `serializer.py` | DB 쿼리 데이터를 코드에서 사용 가능한 형태로 변환 |
| `urls.py` | 함수별 URL 경로 정의 |
| `views.py` | URL에 매핑된 함수 정의. API 동작 변경 시 가장 먼저 확인할 파일 |

> `Dockerfile`의 `git clone` 주소는 본인이 원하는 레포지토리 주소로 변경하여 사용합니다.

### 앱(App) 폴더

| 폴더 | 설명 |
|------|------|
| `Carbon/` | 탄소배출량 입력·계산 관련 앱. 배출량 정보를 저장하는 DB 정의 및 입출력 파일로 구성 |
| `CarbonConstant/` | 탄소배출량 산정에 필요한 상수와 수식을 class 형태로 정의. 모든 에너지원을 동일 단위(CO₂eq)로 환산 |
| `Company/` | 웹페이지를 사용하는 회사 정보를 저장하는 앱. 회사 정보 DB 정의 및 입출력 파일로 구성 |
| `Human/` | 회사 직원 및 회원가입 사용자 관리 앱. ⚠️ 운영 전 로그인 코드 수정 필요 (위 주의사항 참고) |
| `Server/` | 모든 앱을 통합 관리하는 최상위 앱. 서버 진입점 |
| `Swag/` | Swagger 문서화 관련 파일 저장 폴더. 없을 경우 각 코드 파일에 불필요한 코드가 길어짐 |
| `TestDir/` | 각 API의 정상 동작 여부를 확인하기 위한 테스트 코드 |
| `logs/` | 서버 동작 중 발생한 로그 저장 폴더 (직접 생성 필요 — 위 주의사항 참고) |

### 기타 파일

| 파일 | 설명 |
|------|------|
| `Dockerfile` | Django 서버 실행을 위한 Docker 가상환경 정의 |
| `docker-compose.yml` | Dockerfile과 MySQL을 합쳐 한 번에 서버를 실행시켜주는 파일 |
| `runServer.sh` | 소스코드 업데이트와 서버 실행을 한 번에 처리하는 셸 스크립트 |
