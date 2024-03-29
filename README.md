# 쏘스윗 매니저

__판교에 있는 [쏘스윗 펫 카페&호텔](https://www.instagram.com/sosweet_coffee_pet_hotel/)에서 강아지들의 놀이방 사용을 관리하기 위한 모바일 기반의 PWA에요.__

__[데모 페이지](https://demo-sosweet.vercel.app/)에서 직접 시연해보실 수 있어요!__  


![image](https://github.com/Yoonkeee/sosweet-manager/assets/48908205/cc46a3b0-46c0-4766-becd-cf15bbb47941)

<br />  

# Tech Spec

## 정당성

- 쏘스윗 애견 카페 사장님의 기존 업무 방식은 모든 기록을 수기로 작성하고 관리하셨어요. 하지만 관리해야 할 것들이 많고 복잡하여 실수가 잦고, 
업무에 대한 피로가 높으셨어요. 결제 내역, 출입 기록, 이용 내역, 잔여 시간등을 기록하셨어요.
- 이 어려움을 해결하기 위해 저는 구글 스프레드 시트를 제작하여 2022년 6월부터 사용하여 해결할 수 있었어요.
  하지만 이 또한 여러가지 문제가 발생하여 아예 새로운 프로젝트로 진행하기로 생각했어요.

<details>
<summary style='font-size: 24px !important; font-weight: bold; color: blue; cursor: pointer'><span style="font-size:250%">기존의 쏘스윗 매니저(스프레드 시트)의 한계 (열어서 살펴보기)</span></summary>

### 스프레드 시트 설계

- 스프레드 시트에서 HH:MM 형식의 Duration을 다루려면 빌트인으로 제공되는 형식과 함수로는 사용이 불가하여, 이에 관한 함수를 사용자 작성 함수(script)로 개발하여 적용
- 고객에게 보낼 사용 내역 메세지를 자동으로 생성하여 주는 코드(IPython, Google Colaboratory) 개발
- 연두색은 사용자의 입력이 허용되는 부분, 분홍색은 입력이 허용되지 않는 부분으로 사용자의 입력에 대한 계산 결과값을 보여주는 부분.
- 2022년 6월 개발 완료 후 사용 시작

#### 월별 사용 시트

![Untitled](./images/Untitled-1.png)

#### 시간 계산기

![Untitled](./images/Untitled-2.png)

#### 데이터베이스 시트

![Untitled](./images/Untitled-3.png)

#### 사용 시간 시트

![Untitled](./images/Untitled-4.png)

#### 남은 시간 시트

![Untitled](./images/Untitled-5.png)

#### 결제 내역

![Untitled](./images/Untitled-6.png)

### 이슈 사항

![Untitled](./images/Untitled-7.png)

- Custom 함수를 적용한 부분들이 작동하지 않으면서 연쇄적으로 다른 곳까지 영향을 미치기 시작함.
- Loading… 으로 표기되며 사용자 작성 함수(script)의 실행 결과를 기다리고 있으나, 구글의 스크립트 서버에서 실행에 대한 요청이 누락되어 결과를 얻지 못 함.
- 사용 시간(분)에 종속된 셀들이 'Loading….'을 받아 NaN(Not a Number)를 나타내어 다른 곳에 영향을 미침

![Untitled](./images/Untitled-8.png)

![Untitled](./images/Untitled-9.png)

![Untitled](./images/Untitled-10.png)

</details>

## Tech Stacks
- 코어 : React, Python
- 상태 관리 : Redux, React-query v5
- 스타일링 : Chakra UI
- 백엔드 : FastAPI, CloudflareAPI
- 데이터베이스 : MariaDB

## 목표

- 강아지 정보 등록
- 강아지 프로필 사진 등록
- 날짜별 체크인, 체크아웃 시간 기록
- 애견용 기저귀 사용량 기록
- 이용 내역 확인 및 수정
- 견주에게 전송할 이용 내역, 잔여 시간 안내 메시지 생성
- 결제 내역 기록 및 관리
- 강아지 목록과 특징, 견주 정보 등 등록 정보 확인

## 일정
### 2023년
- 3월 27일 - 개발 시작
- 4월 10일 - Data Migration
- 4월 13일 - 프로토 타입 출시, 실 사용 시작
- 4월 25일 - 쏘스윗 매니저 1.0 출시 - Home, Header, Footer
- 5월 1일 - 강아지 프로필 사진 기능 업데이트
### 2024년
- 1월 1일 - 쏘스윗 매니저 2.0 업데이트 시작
- 1월 22일 - 쏘스윗 매니저 2.0 개발 완료, 배포
  - 디자인 수정
  - Modal들을 모두 Stateful하도록 리팩토링하여 실행 속도 50배 개선
  - 비밀번호 인증 기능 추가
  - 강아지별 알러지 기록 기능 추가
  - 결제가 필요한 강아지들 목록을 볼 수 있도록 기능 추가
- 2월 1일 - 쏘스윗 매니저 2.1
  - 시간표에서 당일결제 확인 가능하도록 추가
  - 시간표에 오늘 날짜로 이동하는 버튼과 새로고침 버튼 추가

## Database Schema

![image](https://github.com/Yoonkeee/sosweet-manager/assets/48908205/b7e5e244-3dd9-4308-a4f2-3b62e1fdb2e4)

<details>
<summary style='font-size: xx-large; font-weight: bold; color: blue; cursor: pointer'>DB 테이블 정의 (열어서 살펴보기)</summary>


### 0. 남은 시간

- 기존에 사용하던 스프레드 시트에서 이관해온 잔여 시간 데이터

### 1. 강아지 등록 정보

- 이름
- 견종
- 특이사항
- 성별
- 견주 전화번호
- 몸무게
- 사용 내역 메세지 생성에 사용될 강아지 이름
- 삭제 여부
- 프로필 사진 API ID
- 알러지 유무
- 알러지 내용

### 2. 결제 내역

- 이름
- 결제시간(분)
- 결제일
- 삭제 여부

### 3. 시간표

- 이름
- 체크인 시간
- 체크아웃 시간
- 이용 날짜
- 기저귀 사용량
- 삭제 여부

### 4. 사용 내역

- 이름
- 이용 날짜
- 이용 시간
- 기저귀 사용량
- 고객에게 사용 내역 메세지 전송 여부
- 체크인 시간
- 체크아웃 시간
- 메세지 전송일
- 기저귀 결제 여부
- 삭제 여부
- 당일 결제 여부


</details>

## Product View

<details>
  <summary style='font-size: xx-large; font-weight: 900; color: blue; cursor: pointer'>
    쏘스윗 매니저 2.0 (2024. 01. 22 ~ Current) (열어서 살펴보기)
  </summary>


### 홈화면

<img src='./images/sosweet-2.0-previews/1.png' />


### 시간표

<img src='./images/sosweet-2.0-previews/2.png' />

<br />

<img src='./images/sosweet-2.0-previews/3.png' />

### 강아지 목록
<img src='./images/sosweet-2.0-previews/4.png' />


### 놀이방 이용 내역 전송

<img src='./images/sosweet-2.0-previews/5.png' />

### 메세지 예시

<img src='./images/KakaoTalk_Snapshot_20230530_144000.png' width='380' />


### 강아지 등록 정보 수정

<img src='./images/sosweet-2.0-previews/6.png' />  
<br />
<img src='./images/sosweet-2.0-previews/7.png' />

### 결제 및 이용 내역

<img src='./images/sosweet-2.0-previews/8.png' />

### 체크인

<img src='./images/sosweet-2.0-previews/9.png' />

### 결제 필요 강아지 목록

<img src='./images/sosweet-2.0-previews/10.png' />

</details>
  
<details>
<summary style='font-size: xx-large; font-weight: bold; color: blue; cursor: pointer'>
쏘스윗 매니저 1.0 (2023. 04. 25 ~ 2024. 01. 21) (열어서 살펴보기)
</summary>

### 홈화면

<img src='./images/Simulator_Screenshot_-_iPhone_14_Pro_Max_-_2023-05-30_at_14.31.png' width='380' />

### 당겨서 새로고침

<img src='./images/pull-to-refresh.png' width='380' />

### 시간표

![Group 53.png](./images/Group_53.png)

![Group 54.png](./images/Group_54.png)

### 강아지 목록

![Group 55.png](./images/Group_55.png)

### 놀이방 이용 내역 전송

![Group 56.png](./images/Group_56.png)

### 메세지 예시

<img src='./images/KakaoTalk_Snapshot_20230530_144000.png' width='380' />

### 강아지 등록 정보 수정

![Group 57.png](./images/Group_57.png)

![Group 58.png](./images/Group_58.png)

### 결제 내역

<img src='./images/Simulator_Screenshot_-_iPhone_14_Pro_Max_-_2023-05-30_at_14.41_(1).png' width='380' />

### 놀이방 이용 내역

<img src='./images/Simulator_Screenshot_-_iPhone_14_Pro_Max_-_2023-05-30_at_14.41.png' width='380' />

</details>

<details>
<summary style='font-size: xx-large; font-weight: bold; color: blue; cursor: pointer'>
Prototype (2023. 04. 13 ~ 2023. 04. 25) (열어서 살펴보기)
</summary>

### 1. 시간표

![Untitled](./images/Untitled-20.png)

![Untitled](./images/Untitled-21.png)

![Untitled](./images/Untitled-22.png)

### 2. 내역

### 2-1. 이용시간 계산

![Untitled](./images/Untitled-23.png)

![Untitled](./images/Untitled-24.png)

### 2-2. 이용 내역

![Untitled](./images/Untitled-25.png)

### 2-3. 결제 내역

![Untitled](./images/Untitled-26.png)

### 2-4. 댕댕이 목록

![Untitled](./images/Untitled-27.png)
</details>


<br />
<br />
<br />
<br />
<br />
<br />
<br />
<br />
<br />
<br />
<br />
<br />
<br />
<br />
<br />
<br />
<br />
<br />
<br />
<br />
<br />
<br />
<br />
<br />
<br />
<br />


