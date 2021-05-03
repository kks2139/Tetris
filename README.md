# TETRIS
Making my tetris game using react<br>
리액트로 만들어보는 테트리스 사이트 입니다.
   
***
   
### 화면구성 및 기능
1. 로그인 화면
    - 로그인 수행
    - 회원가입 수행

2. 메인 화면
    - 로그인 시 세션 유지
    - 상단 메뉴바 : 사용자 정보 표시 및 로그아웃 버튼 
    - 화면 중앙부 : Tetris 타이틀 표시. Start, Ranking, Setting 메뉴 존재
    - 하단 알림바 : 현재 최고점 유저의 정보 표시

3. 레벨 선택 화면
    - 메인 화면에서 Start 클릭 > Easy ~ Extreme 까지 게임 난이도 선택
    - 난이도 선택 시 게임 화면으로 전환

4. 게임 화면
    - 선택한 난이도 만큼의 빠르기로 시작
    - 기본키 w, s, a, d, j > 회전, 아래이동, 왼쪽이동, 오른쪽이동, 한번에 낙하

5. 게임 오버
    - 게임이 끝났을 경우 점수를 기록할 것인지 묻는 alert 메시지 생성
    - 게임 점수를 기록한다

6. 랭킹 목록 화면
    - 메인 화면에서 Ranking 클릭 > User별로 최고 점수를 리스트로 보여준다 
    - 검색 : 사용자 이름으로 검색 하거나 레벨로 필터를 걸 수 있다
    - 리스트 클릭 : 클릭한 User 의 전체 히스토리 목록을 보여준다

7. 세팅(설정) 화면
    - 게임 키를 바꿀 수 있다
    - 페이지 테마색을 바꿀 수 있다 (Dark / Light)
   
***
   
### 사용한 기술
- UI &npsp;&npsp;&npsp;&npsp;&npsp;: HTML / CSS / Javascript / React Hooks   
- Server : Node Express   
- DB     : AWS RDS / MySql   












