import React, { useState } from 'react';

export function InputBox(props){
    const [inputValue, setInputValue] = useState(props.value || "");

    const inputChange = (e) => {
        const newValue = e.target.value;
        setInputValue(newValue);

        // 부모에 변경된 값을 전달
        if (props.onChange) {
            props.onChange(newValue);
        }
    };
    return (
        <div className={props.classNames}>
            <input type={ props.inputType } name={ props.inputName } placeholder={ props.placeholderTxt } value={inputValue} onChange={inputChange} maxLength={props.maxLength}/>
        </div>
    )
}