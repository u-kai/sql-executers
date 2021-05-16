import styled from "styled-components"
import {VFC} from "react"
import {InputAndCopyBoxStyle} from "../commonStyles/AutoCorrectStyles"
import {Overflow} from "../../types/StyleType"


export type Props = {
    id?:string
    type:"password" | "text" | "checkbox" 
    autoComplete?:"on" | "off"
    value?:string | undefined
    fontFamily?:string
    fontSize?:number
    handleKeyDown?:(e:React.KeyboardEvent<HTMLInputElement>)=>void
    handleChange?:(e:React.ChangeEvent<HTMLInputElement>)=>void
    onClick?:(e: React.MouseEvent<HTMLInputElement, MouseEvent>) => void
    onScroll?:(event: React.UIEvent<HTMLInputElement, UIEvent>) => void
    color?:string
    outline?:string
    placeholder?:string
    overflow?:Overflow
    width?:string
}

export const Input:VFC<Props> =(props)=>{
    const {id, type, autoComplete, value=undefined, handleKeyDown, handleChange,
        fontFamily='Meiryo',fontSize=100,
        color="transparent",outline="none",placeholder="",onClick,onScroll,
        width,
    overflow} = props
    return (
        <SInput 
        spellCheck="false"
        id={id}
        width={width}
        type={type}
        color={color}
        placeholder={placeholder}
        outline={outline}
        autoComplete={autoComplete}
        value={value}
        overflow={overflow}
        onKeyDown={handleKeyDown}
        onChange={handleChange}
        fontFamily={fontFamily}
        fontSize={fontSize}
        onClick={onClick}
        onScroll={onScroll}></SInput>
      
    )
}

const SInput = styled.input<{fontFamily:string,fontSize:number,color:string,outline:string,overflow:Overflow,width:string|undefined}>`
${InputAndCopyBoxStyle}
background-color:transparent;
position:absolute;
caret-color:black;
color:${props=>props.color};
outline:${props=>props.outline};
z-index:2;
font-family:${props=>props.fontFamily};
font-size:${props=>props.fontSize.toString()}px;
overflow:${props=>props.overflow};
width:${props=>props.width};
`