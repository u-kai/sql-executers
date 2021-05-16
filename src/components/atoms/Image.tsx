import styled from "styled-components"
import {VFC} from "react"
import {StyledType} from "../styledTypes/styledType"
import {returnStyle} from "../../functions/returnStyle"
type Props = {
    style?:StyledType
    src:string
}

export const Image:VFC<Props> = (props) => {
    const {style,src} = props
    let styles:string | undefined 
    if(style){
        styles = returnStyle(style!)
    }
    return(
        <SImage
        src={src}
        styles={styles}></SImage>
    )
}


const SImage = styled.img<{styles:string | undefined}>`
width:120px;
height:100px;
position:absolute;
top:0px;
left:0px;
${props=>props.styles}

`