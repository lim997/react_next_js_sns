"use client"
import { Btn } from './Btn'
import { Login } from './Login'
import { GetDB } from './GetDB';
import { SiDeliveroo } from "react-icons/si";
import React, { useState, useEffect } from 'react';
import './mainStyle.css'

export default function Home() {
  const [user, setUser] = useState([]); // 유저 데이터

  useEffect(() => {
    GetDB({ dbName: 'user', paramName: 'uId', paramValue: '' })
      .then((data) => {
        console.log(data);
        setUser(data);
      })
      .catch((error) => {
        console.error('데이터를 가져오는 중 오류 발생:', error);
      });
  }, []); // 새로고침시에 실행

  

  return (
    <div id='container'>
      <div className='longBox'>
        <div className="title"><SiDeliveroo /> README</div>
        <Login user={user}></Login>
        <div className="searchBtn">
          <Btn hrefLink="#" btnTxt="아이디 찾기" btnClassName="blackBtn searchBtn"></Btn>
          <Btn hrefLink="#" btnTxt="비밀번호 찾기" btnClassName="blackBtn searchBtn"></Btn>
        </div>
      </div>
      <div className='shortBox'>
        <div className='txtBox'>
          <div>계정이 없으신가요?</div>
          <div>가입하여 전세계 이웃과 소통해 보세요!</div>
        </div>
        <div><Btn hrefLink="/join" btnTxt="회원가입" btnClassName="longBtn whiteBtn"></Btn></div>
      </div>
    </div>
  )
}
