import styled from "styled-components"
import {VFC} from "react"

type Props = {
    opacity:number
    color:string
    id:string
    handleClick:(e: React.MouseEvent<HTMLSpanElement, MouseEvent>)=>void
    handleMouseDown:(e: React.MouseEvent<HTMLSpanElement>)=>void
    children:string
}

export const AutoCorrect:VFC<Props> =(props)=>{
    const {id,opacity,color,handleClick,handleMouseDown,children} = props
    return (
        <SAutoCorrect
        id={id}
        opacity={opacity}
        color={color}
        onClick={handleClick}
        onMouseEnter={handleMouseDown}
        >
            {children}
        </SAutoCorrect>
    )
}
const SAutoCorrect = styled.span<{opacity:number,color:string}>`
opacity:${props=>props.opacity};
overflow:scroll;
color:${props=>props.color};
`