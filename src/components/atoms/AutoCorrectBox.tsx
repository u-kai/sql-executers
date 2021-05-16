import styled from "styled-components"
import {VFC} from "react"

type  Props = {
    id?:string
    posi:{
        x:number
        y:number
    }
    children:React.ReactNodeArray
}

export const AutoCorrectBox:VFC<Props> = (props)=>{
    const {id,posi,children} = props
    return(
        <SAutoCorrectBox id={id} posi={posi}>
            {children}
        </SAutoCorrectBox>
    )
}

type Posi = {
    x:number
    y:number
}
const SAutoCorrectBox = styled.div<{posi:Posi}>`
width:100px;
height:100px;
border:solid 1px black;
white-space: pre-wrap;
position:absolute;
transform:translate(${props=>props.posi.x}px,${props=>props.posi.y}px);
overflow: auto;
background-color:black;
z-index:6;
`