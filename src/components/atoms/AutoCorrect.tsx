import styled from "styled-components"
import {VFC} from "react"

type Props = {
    opacity?:number
    color:string
    id:string
    handleClick:(e: React.MouseEvent<HTMLSpanElement, MouseEvent>)=>void
    handleMouseDown:(e: React.MouseEvent<HTMLSpanElement>)=>void
    children:string
    backgroundColor?:string
}

export const AutoCorrect:VFC<Props> =(props)=>{
    const {id,opacity=1,color,handleClick,handleMouseDown,children,backgroundColor="black"} = props
    return (
        <SAutoCorrect
        id={id}
        backgroundColor={backgroundColor}
        opacity={opacity}
        color={color}
        onClick={handleClick}
        onMouseEnter={handleMouseDown}
        >
            {children}
        </SAutoCorrect>
    )
}
const SAutoCorrect = styled.span<{opacity:number,color:string,backgroundColor:string}>`
opacity:${props=>props.opacity};
overflow:scroll;
color:${props=>props.color};
background-color:${props=>props.backgroundColor}
`