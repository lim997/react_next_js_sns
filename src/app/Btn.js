import Link from 'next/link'
export function Btn(props){
    return (
        <Link href={ props.hrefLink }>
            <span className={props.btnClassName}>{ props.btnTxt }</span>
        </Link>
    )
}