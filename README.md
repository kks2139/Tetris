# <img src="https://pic.sopili.net/pub/emoji/twitter/2/72x72/1f3b2.png" width=24 height=24> TETRIS

### 리액트로 만들어보는 테트리스 게임 입니다.

<img src="https://pic.sopili.net/pub/emoji/twitter/2/72x72/1f4cc.png" width=24 height=24> [사이트 링크 (클릭)](http://ec2-3-36-219-54.ap-northeast-2.compute.amazonaws.com/)

***
   
### <img src="https://pic.sopili.net/pub/emoji/twitter/2/72x72/2699.png" width=24 height=24> 앱 특징

      - CSS로 테트리스 블록의 이동, 회전 구현

      - csrf 토큰으로 사용자 인증
      
      - AWS RDS, EC2 서비스를 이용하여 DB 및 배포환경 구성

      - 사용자 ID 별로 게임 난이도와 점수를 DB에 저장

      - 모든 사용자의 점수 이력을 조회

      - 색 테마, 조작키 수정
   
### <img src="https://pic.sopili.net/pub/emoji/twitter/2/72x72/1f4ca.png" width=24 height=24> 화면구성 및 기능
#### 로그인 화면
    
    - 로그인 수행
    
    - 회원가입 수행

#### 메인 화면
    
    - 로그인 시 세션 유지
    
    - 상단 메뉴바 : 사용자 정보 표시 및 로그아웃 버튼 
    
    - 화면 중앙부 : Tetris 타이틀 표시. Start, Ranking, Setting 메뉴 존재
    
    - 하단 알림바 : 현재 최고점 유저의 정보 표시

#### 레벨 선택 화면
    
    - 메인 화면에서 Start 클릭 > Easy ~ Extreme 까지 게임 난이도 선택
    
    - 난이도 선택 시 게임 화면으로 전환

#### 게임 화면
    
    - 선택한 난이도 만큼의 빠르기로 시작
    
    - 기본키 w, s, a, d, j > 회전, 아래이동, 왼쪽이동, 오른쪽이동, 한번에 낙하

#### 게임 오버
    
    - 게임이 끝났을 경우 점수를 기록할 것인지 묻는 alert 메시지 생성
    
    - 게임 점수를 기록한다

#### 랭킹 목록 화면
    
    - 메인 화면에서 Ranking 클릭 > User별로 최고 점수를 리스트로 보여준다 
    
    - 검색 : 사용자 이름으로 검색 하거나 레벨로 필터를 걸 수 있다
    
    - 리스트 클릭 : 클릭한 User 의 전체 히스토리 목록을 보여준다

#### 세팅(설정) 화면
    
    - 게임 키를 바꿀 수 있다
    
    - 페이지 테마색을 바꿀 수 있다 (Dark / Light)
   
   
### <img src="https://pic.sopili.net/pub/emoji/twitter/2/72x72/1f6e0.png" width=24 height=24> 개발 환경

> ### Client   
> * React Hooks
> * Javascript
> * CSS
> * HTML

> ### Server   
> * ExpressJS
> * AWS RDS
> * MySQL

> ### Deployment
> * AWS EC2
> * Nginx
> * FTP


### <img src="https://pic.sopili.net/pub/emoji/twitter/2/72x72/1f50d.png" width=24 height=24> 실행 화면 

#### 1. Light 테마
- 로그인 / 메인

<img src="https://github.com/kks2139/Tetris/blob/main/readme_img/login.PNG?raw=true" width="400px" height="300px"/>
<img src="https://github.com/kks2139/Tetris/blob/main/readme_img/mainpage.PNG?raw=true" width="400px" height="300px"/>

- 랭킹조회 / 세팅
   
<img src="https://github.com/kks2139/Tetris/blob/main/readme_img/ranking.PNG?raw=true" width="400px" height="300px"/>
<img src="https://github.com/kks2139/Tetris/blob/main/readme_img/setting.PNG?raw=true" width="400px" height="300px"/>

- 레벨선택 / 게임시작

<img src="https://github.com/kks2139/Tetris/blob/main/readme_img/levelsel.PNG?raw=true" width="400px" height="300px"/>
<img src="https://github.com/kks2139/Tetris/blob/main/readme_img/play.PNG?raw=true" width="400px" height="300px"/>

- 게임오버

<img src="https://github.com/kks2139/Tetris/blob/main/readme_img/gameover.PNG?raw=true" width="400px" height="300px"/>

#### 2. Dark 테마

<img src="https://github.com/kks2139/Tetris/blob/main/readme_img/mainpage_dark.PNG?raw=true" width="400px" height="300px"/>
<img src="https://github.com/kks2139/Tetris/blob/main/readme_img/ranking_dark.PNG?raw=true" width="400px" height="300px"/></br>

<img src="https://github.com/kks2139/Tetris/blob/main/readme_img/setting_dark.PNG?raw=true" width="400px" height="300px"/>
<img src="https://github.com/kks2139/Tetris/blob/main/readme_img/levelsel_dark.PNG?raw=true" width="400px" height="300px"/></br>

<img src="https://github.com/kks2139/Tetris/blob/main/readme_img/play_dark.PNG?raw=true" width="400px" height="300px"/>





