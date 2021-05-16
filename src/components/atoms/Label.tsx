import {VFC} from "react"
import styled from "styled-components"

export type Props = {
    id:string
    htmlFor:string
    textContent:string
    fontSize?:number
    fontFamily?:string
    width?:number
    height?:number
    position?:number
}
export const Label:VFC<Props> = (props)=>{
    const {id, htmlFor, textContent,fontSize=20,fontFamily="Meiryo",
            width=20,height=40,position} = props
    return(
        <SBox
        width={width}
        height={height}
        position={position}>
        <SLabel
        id={id}
        htmlFor={htmlFor}
        fontFamily={fontFamily}
        fontSize={fontSize}
        >
        {textContent}
        </SLabel>
        </SBox>
    )   
}

const SLabel = styled.label<{fontSize:number,fontFamily:string}>`
font-size:${props=>props.fontSize}px;
font-family:${props=>props.fontFamily};
`
const SBox = styled.div<{width:number,height:number,position:number|undefined}>`
width:${props=>props.width}px;
height:${props=>props.height}px;
display:flex;
background-color:white;
z-index:7;
align-items:center;
transform:translateX(${props=>props.position}px);
`