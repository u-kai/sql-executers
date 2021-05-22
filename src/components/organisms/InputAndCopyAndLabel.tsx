import {InputAndCopy,Props as InputAndCopyProps} from "../molecules/InputAndCopy"
import {VFC} from "react"
import styled from "styled-components"
import { Label } from "components/atoms/Label"
import {StyledType} from "components/styledTypes/styledType"
type Props = {
    position?:number
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
    const {index,colorList,sentence,handleChange,handleKeyDown,onScroll,onClick,style,position} = props
    return (
        <Contener>
            <Label
                position={position}
                gridColumn="1/3"
                gridRow="1/2"
                textContent={`${index}:`}
                htmlFor={`input${index}`}/>
            <InputAndCopy
                gridColumn="2/3"
                gridRow="1/2"
                handleKeyDown={handleKeyDown}
                onScroll={onScroll}
                onClick={onClick}
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
width:100%;//3000px;
height:30px;
// overflow:auto;
display:grid;
grid-template-columns:20px 400px;//780px;change
grid-template-rows:40px;
`