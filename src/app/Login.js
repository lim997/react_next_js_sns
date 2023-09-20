"use client"
import React from 'react';
import { useRouter } from "next/navigation";
import { InputBox } from './InputBox'

export function Login(props){
    var r = useRouter();
    return (
        <div className="input-and-button">
            <form onSubmit={e => {
                e.preventDefault();
                var uId = e.target.uId.value;
                var uPwd = e.target.uPwd.value;
                if( uId == "" ){
                    alert("아이디를 입력해 주세요.");
                    return;
                } else if ( uPwd == "" ){
                    alert("비밀번호를 입력해 주세요.");
                    return;
                }
                
                // map을 이용하여 비동기적으로 setLoginSuccess를 호출하면 값이 즉시 업데이트되지 못한다.
                // some 함수를 사용하여 주어진 조건이 하나라도 값을 통과한다면 true 값을 가져온다. 
                const userExists = props.user.some(userData => uId == userData.U_ID && uPwd == userData.U_PWD);
                if(userExists){
                    sessionStorage.setItem('uId', uId);
                    alert("환영합니다.");
                    r.push('/main');
                } else {
                    alert("아이디와 비밀번호를 확인해 주세요.");
                }
            }}>
                <div className="input-container">
                    <div className="input-boxes">
                        <InputBox placeholderTxt="아이디" inputType="text" inputName="uId" classNames="wrap loginWrap" maxLength="15"/>
                        <InputBox placeholderTxt="비밀번호" inputType="password" inputName="uPwd" classNames="wrap loginWrap" maxLength="15"/>
                    </div>
                    <input type="submit" className="shortBtn whiteBtn" value="로그인" />
                </div>
            </form>
        </div>
    )
}