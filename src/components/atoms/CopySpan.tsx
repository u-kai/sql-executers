import styled from "styled-components"
import {VFC} from "react"
import { ChangeColorRegDatas } from "../../datas/Datas"
export type Props = {
    id?:string
    color:string
    children:string
}

export const CopySpan:VFC<Props> =(props)=> {
    const {color,children,id} = props
    return(
        <SCopySpan 
        id={id}
        color={color}>
            {children}&nbsp;
        </SCopySpan>
    )
}
const SCopySpan = styled.span<{color:string}>`
color:${props=>props.color};
`