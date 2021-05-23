import styled from "styled-components"
import {VFC,useState} from "react"

type  Props = {
    id?:string
    posi:{
        x:number
        y:number
    }
    children:React.ReactNodeArray
    autoCorrectNumber:number
}

export const AutoCorrectBox:VFC<Props> = (props)=>{
    const {id,posi,children,autoCorrectNumber} = props
    return(
        <SAutoCorrectBox id={id} posi={posi} height={autoCorrectNumber}>
            {children}
        </SAutoCorrectBox>
    )
}

type Posi = {
    x:number
    y:number
}
const SAutoCorrectBox = styled.div<{posi:Posi,height:number}>`
//width:100px;
height:${props=>props.height*20}px;
border:solid 1px black;
white-space: pre-wrap;
position:absolute;
transform:translate(${props=>props.posi.x}px,${props=>props.posi.y}px);
overflow: auto;
background-color:black;
z-index:6;
`