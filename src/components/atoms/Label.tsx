import {VFC} from "react"
import styled from "styled-components"

export type Props = {
    id?:string
    htmlFor:string
    textContent:string
    fontSize?:number
    fontFamily?:string
    width?:number
    height?:number
    position?:number
    gridColumn?:string
    gridRow?:string
}
export const Label:VFC<Props> = (props)=>{
    const {id, htmlFor, textContent,fontSize=15,fontFamily="Meiryo",
            width=20,height=30,position,gridColumn,gridRow} = props
    return(
        <SBox
        width={width}
        height={height}
        position={position}
        gridColumn={gridColumn}
        gridRow={gridRow}>
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
const SBox = styled.div<{width:number,height:number,position:number|undefined,gridColumn:string | undefined,gridRow:string | undefined}>`
width:${props=>props.width}px;
height:${props=>props.height}px;
display:flex;
background-color:white;
z-index:7;
align-items:center;
transform:translateX(${props=>props.position}px);
grid-row:${props=>props.gridRow};
grid-column:${props=>props.gridColumn};
`