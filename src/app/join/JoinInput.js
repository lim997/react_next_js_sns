"use client"
import { InputBox } from '../InputBox'
import { RadioCheck } from '../RadioCheck'
import { Message } from './Message'
import { useRouter } from "next/navigation";
import React, { useState, useEffect } from 'react';

export function JoinInput(props){
    var r = useRouter();

    const [idOverlap, setIdOverlap] = useState(false); // 아이디 중복 체크
    const [pwdChecking, setPwdChecking] = useState(false); // 비밀번호 조건 체크

    const [inputUId, setInputUId] = useState("");
    const [inputUPwd, setInputUPwd] = useState("");
    const [inputUPwdCheck, setInputUPwdCheck] = useState("");

    const [uIdMessage, setUIdMessage] = useState("");
    const [uPwdMessage, setUPwdMessage] = useState("");
    const [uPwdCheckMessage, setUPwdCheckMessage] = useState("");
    const [uNameMessage, setUNameMessage] = useState("");
    const [phoneMessage, setPhoneMessage] = useState("");
    const [emailMessage, setEmailMessage] = useState("");
    const [birthMessage, setBirthMessage] = useState("");

    // 메세지 변경
    useEffect(() => {
        const userExists = props.user.some(userData => inputUId === userData.U_ID);
        var regex = /^[a-zA-Z0-9]+$/;
        if (inputUId.match(/\s/)) {
            setUIdMessage("아이디에는 공백을 제외하고 입력해 주세요.");
            setIdOverlap(false);
        } else if (!regex.test(inputUId) && inputUId != "") {
            setUIdMessage("아이디에는 영문자와 숫자만 입력해 주세요.");
            setIdOverlap(false);
        } else if(inputUId.length != 0 && inputUId.length < 5){
            setUIdMessage("5자 이상의 아이디를 입력해 주세요.");
            setIdOverlap(false);
        } else if (userExists) {
            setUIdMessage("중복된 아이디가 있습니다. 다른 아이디를 입력해 주세요.");
            setIdOverlap(false);
            return;
        } else if (inputUId != "") {
            setUIdMessage("사용 가능한 아이디입니다.");
            setIdOverlap(true);
        } else {
            setUIdMessage("");
            setIdOverlap(false);
        }
    }, [inputUId]);

    useEffect(() => {
        var regex = /^[a-zA-Z0-9]+$/;
        if (inputUPwd.match(/\s/)) {
            setUPwdMessage("비밀번호에는 공백을 제외하고 입력해 주세요.");
            setPwdChecking(false);
        } else if (!regex.test(inputUPwd) && inputUPwd != "") {
            setUIdMessage("아이디에는 영문자와 숫자만 입력해 주세요.");
            setPwdChecking(false);
        } else if(inputUPwd.length != 0 && inputUPwd.length < 8){
            setUPwdMessage("8자 이상의 비밀번호를 입력해 주세요.");
            setPwdChecking(false);
        } else{
            setUPwdMessage("");
            setPwdChecking(false);
        } 
    }, [inputUPwd]);

    useEffect(() => {
        // 비밀 번호 입력 조건을 만족했을 때 메세지 출력
        if(inputUPwd.length != 0 && inputUPwd.length >= 8){
            if( inputUPwdCheck.length != 0 && inputUPwd != inputUPwdCheck){
                setUPwdCheckMessage("일치하는 비밀번호를 입력해 주세요.");
                setPwdChecking(false);
            } else if(inputUPwd == inputUPwdCheck) {
                setUPwdCheckMessage("");
                setPwdChecking(true);
            }
        }
    }, [inputUPwdCheck]);

    // 변경된 아이디 인풋 값을 넘겨 받음
    const inputChange = (value, setKind) => {
        setKind(value);
    };

    return (
        <div>
            <form onSubmit={e => {
                e.preventDefault();
                var joinCheck = true; // 빈 값이나 조건에 만족하지 않는 값이 있으면 false
                var uName = e.target.uName.value;
                var phone = e.target.phone.value;
                var email = e.target.email.value;
                var birth = e.target.birth.value;
                var pEventYN = e.target.pEventYN.value;
                var mEventYN = e.target.mEventYN.value;

                if( inputUId == "" ){
                    setUIdMessage("아이디를 입력해 주세요.");
                    // idOverlap 값이 이미 false 이기 때문에 joinCheck 값을 부여하지 않음
                }
                if (inputUPwd == "") {
                    setUPwdMessage("비밀번호를 입력해 주세요.");
                    // pwdChecking 값이 이미 false 이기 때문에 joinCheck 값을 부여하지 않음
                }
                // 화면이 복잡해질 것을 고려하여 비밀번호 조건을 만족했을 때만 출력)
                if (inputUPwd != "" && inputUPwd.length >= 8 && inputUPwdCheck == "") {
                    setUPwdCheckMessage("일치하는 비밀번호를 입력해 주세요.");
                    // pwdChecking 값이 이미 false 이기 때문에 joinCheck 값을 부여하지 않음
                }

                var regex = new RegExp(/[가-힣a-zA-Z]/);
                if (uName == "") {
                    setUNameMessage("이름을 입력해 주세요.");
                    joinCheck = false;
                } else if (uName.match(/\s/)) {
                    setUNameMessage("이름에는 공백을 제외하고 입력해 주세요.");
                    joinCheck = false;
                } else if(!regex.test(uName)){
                    setUNameMessage("이름 양식을 확인해 주세요.");
                    joinCheck = false;
                } else if(uName.length < 2){
                    setUNameMessage("이름은 2자 이상 입력해 주세요.");
                    joinCheck = false;
                } else { // 조건을 만족할 때
                    setUNameMessage("");
                }

                regex = new RegExp(/^01([0|1|6|7|8|9])-?([0-9]{3,4})-?([0-9]{4})$/);
                if (phone == "") {
                    setPhoneMessage("핸드폰 번호를 입력해 주세요.");
                    joinCheck = false;
                } else if (phone.match(/\s/)) {
                    setPhoneMessage("연락처에는 공백을 제외하고 입력해 주세요.");
                    joinCheck = false;
                } else if(!regex.test(phone)){
                    setPhoneMessage("연락처 양식을 확인해 주세요.");
                    joinCheck = false;
                } else if(phone.length < 10){
                    setPhoneMessage("연락처는 10자 이상 입력해 주세요.");
                    joinCheck = false;
                } else { // 다시 회원가입 버튼을 눌렀을 때 입력 조건을 만족하면 메세지 출력 X
                    setPhoneMessage("");
                }

                regex = new RegExp(/^([\w\.\_\-])*[a-zA-Z0-9]+([\w\.\_\-])*([a-zA-Z0-9])+([\w\.\_\-])+@([a-zA-Z0-9]+\.)+[a-zA-Z0-9]{2,8}$/);
                if (email == "") {
                    setEmailMessage("이메일 주소를 입력해 주세요.");
                    joinCheck = false;
                } else if (email.match(/\s/)) {
                    setEmailMessage("이메일 주소에는 공백을 제외하고 입력해 주세요.");
                    joinCheck = false;
                } else if(!regex.test(email)){
                    setEmailMessage("이메일 양식을 확인해 주세요.");
                    joinCheck = false;
                } else {
                    setEmailMessage("");
                }

                // 생년월일 계산 (만 14세 이상 가입 가능)
                var age = birth.split("-");
                var now = new Date();
                var year =  now.getFullYear() - parseInt(age[0],10);
                var month = (now.getMonth()+1) - parseInt(age[1],10);
                var day = parseInt(age[2],10);
                if(month < 0 || (month == 0 && now.getDate() <= day)){
                    year--;
                }
                if (birth == "") {
                    setBirthMessage("생년월일을 선택해 주세요.");
                    joinCheck = false;
                } else if(year < 14){
                    setBirthMessage("만 14세 이상만 가입이 가능합니다. 생년월일을 확인해 주세요.");
                    joinCheck = false;
                } else {
                    setBirthMessage("");
                }

                // 중복된 아이디가 없고, 비밀번호 확인까지 일치되면서, 모든입력 값들이 조건을 통과하면 가입 가능
                if(idOverlap && pwdChecking && joinCheck){
                    fetch('/api/user', {
                        method: 'POST',
                        headers: {
                          'Content-Type': 'application/json',
                        },
                        body: JSON.stringify({ uId: inputUId, uPwd: inputUPwd , uName: uName, phone: phone, email: email, birth: birth, pEventYN: pEventYN, mEventYN: mEventYN}), // JSON 데이터를 전송합니다.
                      })
                        .then((response) => {
                          if (!response.ok) {
                            throw new Error('서버 응답이 실패했습니다.');
                          }
                          return response.json();
                        })
                        .then((data) => {
                          console.log('서버 응답:', data);
                        })
                        .catch((error) => {
                          console.error('POST 요청 중 오류 발생:', error);
                        });
                    alert("회원가입이 완료되었습니다.");
                    r.push('/');
                } else {
                    alert("회원 가입 조건을 확인해 주세요.");
                }
            }}>
                <div>
                    <div>
                        <InputBox placeholderTxt="아이디" inputType="text" inputName="uId" classNames="wrap joinWrap"
                             inputValue={inputUId} onChange={(value) => inputChange(value, setInputUId)}  maxLength="15"/>
                        <Message className={`overlapTxt ${uIdMessage.includes('입력해 주세요.') ? "txtRed" : "txtBlue"}`} message={uIdMessage}></Message>
                    </div>
                    <div>
                        <InputBox placeholderTxt="비밀번호" inputType="password" inputName="uPwd" classNames="wrap joinWrap"
                            inputValue={inputUPwd} onChange={(value) => inputChange(value, setInputUPwd)}  maxLength="15"/>
                        <Message className={`overlapTxt ${uPwdMessage.includes('입력해 주세요.') ? "txtRed" : "txtBlue"}`} message={uPwdMessage}></Message>
                    </div>
                    <div>
                        <InputBox placeholderTxt="비밀번호확인" inputType="password" inputName="uPwdCheck" classNames="wrap joinWrap"
                        inputValue={inputUPwdCheck} onChange={(value) => inputChange(value, setInputUPwdCheck)}  maxLength="15"/>
                        <Message className={`overlapTxt ${uPwdCheckMessage.includes('입력해 주세요.') ? "txtRed" : "txtBlue"}`} message={uPwdCheckMessage}></Message>
                    </div>
                    <div>
                        <InputBox placeholderTxt="이름" inputType="text" inputName="uName" classNames="wrap joinWrap" maxLength="7"/>
                        <Message className="overlapTxt txtRed" message={uNameMessage}></Message>
                    </div>
                    <div>
                        <InputBox placeholderTxt="핸드폰번호" inputType="text" inputName="phone" classNames="wrap joinWrap" maxLength="11"/>
                        <Message className="overlapTxt txtRed" message={phoneMessage}></Message>
                    </div>
                    <div>
                        <InputBox placeholderTxt="이메일" inputType="text" inputName="email" classNames="wrap joinWrap"  maxLength="30"/>
                        <Message className="overlapTxt txtRed" message={emailMessage}></Message>
                    </div>
                    <div>
                        <InputBox placeholderTxt="생년월일" inputType="date" inputName="birth" classNames="wrap joinWrap"/>
                        <Message className="overlapTxt txtRed" message={birthMessage}></Message>
                    </div>
                    <div className="eventCheckBox">
                        <div className="pEventBox">
                            <RadioCheck idValue="pEventY" inputValue="Y" inputName="pEventYN" labelValue="핸드폰 수신 동의" defaultValue="false"/>
                            <RadioCheck idValue="pEventN" inputValue="N" inputName="pEventYN" labelValue="핸드폰 수신 동의 안함" defaultValue="true"/>
                        </div>
                        <div className="mEventBox">
                            <RadioCheck idValue="mEventY" inputValue="Y" inputName="mEventYN" labelValue="이메일 수신 동의" defaultValue="false"/>
                            <RadioCheck idValue="mEventN" inputValue="N" inputName="mEventYN" labelValue="이메일 수신 동의 안함" defaultValue="true"/>
                        </div>
			        </div>
                </div>
                <input type="submit" className="longBtn joinBtn whiteBtn" value="회원가입" />
            </form>
        </div>
    )
}