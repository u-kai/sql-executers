import styled from "styled-components"
import {VFC} from "react"
import {InputAndCopyBoxStyle} from "../commonStyles/AutoCorrectStyles"
import {StyledType} from "../styledTypes/styledType"
import {returnStyle} from "../../functions/returnStyle"


export type Props = {
    id?:string
    type:"password" | "text" | "checkbox" 
    autoComplete?:"on" | "off"
    value?:string | undefined
    handleKeyDown?:(e:React.KeyboardEvent<HTMLInputElement>)=>void
    handleChange?:(e:React.ChangeEvent<HTMLInputElement>)=>void
    onClick?:(e: React.MouseEvent<HTMLInputElement, MouseEvent>) => void
    onScroll?:(event: React.UIEvent<HTMLInputElement, UIEvent>) => void
    outline?:string
    placeholder?:string
    style?:StyledType
}

export const Input:VFC<Props> =(props)=>{
    const {id, type, autoComplete, value=undefined, handleKeyDown, handleChange
        ,placeholder="",onClick,onScroll,style} = props
    const styles = returnStyle(style)
    return (
        <SInput
        styles={styles}
        spellCheck="false"
        id={id}
        type={type}
        placeholder={placeholder}
        autoComplete={autoComplete}
        value={value}
        onKeyDown={handleKeyDown}
        onChange={handleChange}
        onClick={onClick}
        onScroll={onScroll}></SInput>
      
    )
}

const SInput = styled.input<{styles:string | undefined}>`
${InputAndCopyBoxStyle}
background-color:transparent;
position:absolute;
caret-color:black;
color:transparent;
outline:none;
z-index:2;
font-size:15px;
overflow:auto;
${props=>props.styles}
`