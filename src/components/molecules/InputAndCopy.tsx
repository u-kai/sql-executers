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
    index:number
    colorList:string[]
    sentence:string
    handleChange:(e: React.ChangeEvent<HTMLInputElement>)=>void
    // input:InputProps
    // copyBox:CopyBoxProps
    // copySpan:CopySpanProps
}

export const InputAndCopy:VFC<Props> = (props) => {
    const {style,index,colorList,sentence,handleChange} = props
    console.log(sentence.split(" ").map((value)=>value))
    console.log(colorList)
    // const styles = returnStyle(style)
    return(
        <Contener key={`inputContener${index}`}>
            <Input
                key={`input${index}`}
                value={sentence}
                handleChange={handleChange}
                style={style}
                type="text"/>
            <CopyBox id="testcok" key={`copyContener${index}`}>
            {sentence.split(" ").map((phrase,pharaseIndex)=>(
                    <CopySpan
                        id={phrase}
                        color={colorList[pharaseIndex]}
                        key={`copySpan${phrase}${index}${pharaseIndex}`}>
                        {phrase}
                    </CopySpan>
            ))}
            </CopyBox>
                <TailSpan id={`tailPosition${index}`}/>
        </Contener>
    )
}
const Contener = styled.div`
width:100%;
height:100%;
position:relative;
`