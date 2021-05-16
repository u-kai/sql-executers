import { FiberPinTwoTone } from "@material-ui/icons"
import {InputAndCopy,Props as InputAndCopyProps} from "../molecules/InputAndCopy"
import {VFC} from "react"
import styled from "styled-components"
import { Label } from "components/atoms/Label"
import {StyledType} from "components/styledTypes/styledType"
type Props = {
    style?:StyledType
    index:number
    colorList:string[]
    sentence:string
    handleKeyDown?:(e:React.KeyboardEvent<HTMLInputElement>)=>void
    handleChange?:(e:React.ChangeEvent<HTMLInputElement>)=>void
    onClick?:(e: React.MouseEvent<HTMLInputElement, MouseEvent>) => void
    onScroll?:(event: React.UIEvent<HTMLInputElement, UIEvent>) => void
}

export const InputAndCopyAndLabel:VFC<Props> = (props) =>{
    const {index,colorList,sentence,handleChange,handleKeyDown,onScroll,onClick,style} = props
    return (
        <Contener>
            <Label
                gridColumn="1/3"
                gridRow="1/2"
                textContent={`${index}:`}
                htmlFor={`input${index}`}/>
            <InputAndCopy
                gridColumn="2/3"
                gridRow="1/2"
                handleChange={handleChange}
                sentence={sentence}
                colorList={colorList}
                index={index}
                style={style}
            />
        </Contener>
    )
}
const Contener = styled.div`
width:800px;
height:50px;
overflow:auto;
display:grid;
grid-template-columns:20px 780px;
grid-template-rows:40px;
`