import styled from "styled-components"
import {VFC} from "react"

type Props ={
    id?:string
    fontFamily?:string
    fontSize?:number
    children?:string
    color?:string
}
export const TailSpan:VFC<Props> = (props)=>{
    const {id,fontSize=15,fontFamily='Meiryo',children="",color} = props
    return (
        <STailSpan 
        id={id}
        fontFamily={fontFamily}
        fontSize={fontSize}
        color={color}
        >
        {children}
        </STailSpan>

    )
}
const STailSpan = styled.span<{fontFamily:string,fontSize:number}>`
font-family:${props=>props.fontFamily};
font-size:${props=>props.fontSize.toString()}px;
// margin:0px;

`