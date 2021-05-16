import {Input,Props as InputProps} from "../atoms/Input"
import {CopyBox, Props as CopyBoxProps} from "../atoms/CopyBox"
import styled from "styled-components"
import {useState, VFC} from "react"
import { CopySpan,Props as CopySpanProps } from "../atoms/CopySpan"
import {StyledType} from "../styledTypes/styledType"
import {returnStyle} from "../../functions/returnStyle"
import {TailSpan} from "../atoms/TailSpan"
type Props = {
    style?:StyledType
    tailId:number
    // char:string
    // input:InputProps
    // copyBox:CopyBoxProps
    // copySpan:CopySpanProps
}

export const InputAndCopy:VFC<Props> = (props) => {
    const {style,tailId} = props
    const styles = returnStyle(style)
    const [char,setChar] = useState("")
    const handleChange = (e: React.ChangeEvent<HTMLInputElement>)=>{
        setChar(e.target.value)
    }
    return(
        <Contener>
            <Input
                value={char}
                handleChange={handleChange}
                style={style}
                type="text"/>
            <CopyBox id="box">
                <CopySpan
                    color={"red"}
                    id={"span"}>
                    {char}
                </CopySpan>
                <TailSpan id={`tailPosition${tailId}`}/>
            </CopyBox>
        </Contener>
    )
}
const Contener = styled.div`
width:100%;
height:100%;
position:relative;
`