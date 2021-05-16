import {Input,Props as InputProps} from "../atoms/Input"
import {CopyBox, Props as CopyBoxProps} from "../atoms/CopyBox"
import styled from "styled-components"
import {VFC} from "react"
import { CopySpan,Props as CopySpanProps } from "../atoms/CopySpan"
import {StyledType} from "../styledTypes/styledType"
import {returnStyle} from "../../functions/returnStyle"
type Props = {
    style?:StyledType
    // input:InputProps
    // copyBox:CopyBoxProps
    // copySpan:CopySpanProps
}

export const InputAndCopy:VFC<Props> = (props) => {
    const {style} = props
    const styles = returnStyle(style)
    return(
        
        <Input
        outline=""
        type="text"/>
    )
}
const Contener = styled.div<{styles:StyledType}>`
width:100%;
height:100%;
position:relative;
`