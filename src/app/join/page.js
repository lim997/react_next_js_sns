"use client"
import React, { useState, useEffect } from 'react';
import { GetDB } from '../GetDB';
import { JoinInput } from './JoinInput'
import { SiDeliveroo } from "react-icons/si";
import '../mainStyle.css';

export default function Join(){
  const [user, setUser] = useState([]); // 중복을 확인할 유저 데이터
  useEffect(() => {
    GetDB({ dbName: 'user', paramName: 'uId', paramValue: '' })
      .then((data) => {
        console.log(data);
        setUser(data);
      })
      .catch((error) => {
        console.error('데이터를 가져오는 중 오류 발생:', error);
      });
  }, []);
  return (
    <div className='joinBox'>
      <div className="centerTitle"><SiDeliveroo /> README</div>
      <JoinInput user={user}></JoinInput>
    </div>
  )
}