# SNS README

일상을 공유하는 SNS 웹 사이트.


# 프로젝트 개요

React와 Node.js를 이용한 SNS 개발.



# 프로젝트 일정

 - 2023.09.12 ~ 2023.09.19



# 개발 환경

- 운영 체제 (OS): Windows 10 Pro (64-bit)
- 프로세서: Intel Core i5-9400F @ 2.90GHz
- JDK: JDK 17
- IDE: Visual Studio Code(1.83)
- 데이터베이스 관리 도구: HeidiSQL
- 개발 언어: Javascript(React.js, Node.js), HTML, CSS
- 프레임워크: Next.js
- 데이터베이스: MySQL
- 형상 관리: Git



# 프로젝트 기능

1. 로그인: 입력한 값이 데이터베이스의 값과 일치하면 해당 정보로 로그인.
2. 회원가입: 중복 확인과 정규식을 이용하여 올바른 값을 입력받음.
3. 메인: 스크롤을 이용해 게시된 글을 확인하고, 댓글을 작성하거나 좋아요를 누를 수 있음.
4. 검색: 아이디와 게시글을 검색. 모달 창을 이용해 선택한 게시글을 띄움.
5. 게시글 업로드: 사진을 선택하여 파일을 업로드하며, 게시글을 등록.
6. 마이페이지: 로그인한 유저의 정보를 확인하고, 프로필 이미지를 수정.
7. 팔로잉 목록: 유저가 팔로잉 한 아이디들과 유저를 팔로잉 목록 출력.



# 화면 구현

1. 로그인

<img width="60%" src="https://github.com/lim997/react_next_js_sns/blob/main/images/login.png"/>

2. 회원가입

<img width="60%" src="https://github.com/lim997/react_next_js_sns/blob/main/images/join.png"/>

3. 메인

<img width="60%" src="https://github.com/lim997/react_next_js_sns/blob/main/images/main.png"/>

4. 검색

<img width="60%" src="https://github.com/lim997/react_next_js_sns/blob/main/images/search01.png"/>

<img width="60%" src="https://github.com/lim997/react_next_js_sns/blob/main/images/search02.png"/>

5. 게시글 업로드

<img width="60%" src="https://github.com/lim997/react_next_js_sns/blob/main/images/post.png"/>

6. 마이페이지

<img width="60%" src="https://github.com/lim997/react_next_js_sns/blob/main/images/my_page.png"/>

7. 팔로잉 목록

<img width="60%" src="https://github.com/lim997/react_next_js_sns/blob/main/images/follow.png"/>



# 자체 평가

짧은 React 학습 기간과 일주일의 짧은 프로젝트 기간으로 시간적으로 부족한 프로젝트였다.
파일 업로드나 데이터베이스 연결 등을 반복적으로 학습하여, 짧은 기간임에도 계획한 부분까지 프로젝트를 완료할 수 있었다.
반복되는 코드는 사용자 정의 태그를 이용하거나 하나의 파일로 묶어 관리하여 더 확장성 있는 코드를 작성하였다.
특히 게시글을 출력하는 부분을 나누어 관리하여, 코드의 중복을 줄이고 다양한 부분에 활용하였다. 이 경험으로 코드를 더 원활하게 작성할 수 있게 되었다.
만약 일주일보다 더 많은 시간동안 프로젝트를 진행했다면 더 좋은 결과물이 나왔을 것으로 기대가 되어 추후에 프로젝트를 보완하고 싶다.
