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
    let styles = ""
    if(style){
        styles = returnStyle(style!)
    }
    return(
        <SImage
        src={src}
        styles={styles}></SImage>
    )
}


const SImage = styled.img<{styles:string}>`
${props=>props.styles}
`