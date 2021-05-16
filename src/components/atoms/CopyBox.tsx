import { VFC,ReactNode, ReactNodeArray } from "react"
import styled from "styled-components"
import {InputAndCopyBoxStyle} from "../commonStyles/AutoCorrectStyles"
import { Overflow } from "../../types/StyleType"

export type Props = {
    id:string
    children:ReactNode
    fontFamily?:string
    fontSize?:number
    overflow?:Overflow
}

export const CopyBox:VFC<Props> = (props)=>{
    const {id, children, fontFamily='Meiryo', fontSize=15,overflow} = props
    return(
        <SCopyBox 
        id={id}
        fontFamily={fontFamily}
        fontSize={fontSize}
        overflow={overflow}>
            {children}
        </SCopyBox>
    )
}
const SCopyBox = styled.div<{fontFamily:string,fontSize:number,overflow:Overflow}>`
${InputAndCopyBoxStyle}
position:absolute;
font-family:${props=>props.fontFamily};
font-size:${props=>props.fontSize.toString()}px;
z-index:1;
overflow:${props=>props.overflow};
`