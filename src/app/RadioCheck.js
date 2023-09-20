export function RadioCheck(props){
    return (
        <label className="radio-container">
            <input type="radio" id={props.idValue} name={props.inputName} value={props.inputValue} defaultChecked={props.defaultValue}/>
            <span className="checkmark"></span>
            {props.labelValue}
        </label>
    )
}