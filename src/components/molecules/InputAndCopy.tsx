import {Input,Props as InputProps} from "../atoms/Input"
import {CopyBox, Props as CopyBoxProps} from "../atoms/CopyBox"
import styled from "styled-components"
import {useState, VFC} from "react"
import { CopySpan,Props as CopySpanProps } from "../atoms/CopySpan"
import {StyledType} from "../styledTypes/styledType"
import {TailSpan} from "../atoms/TailSpan"
export type Props = {
    style?:StyledType
    index:number
    colorList:string[]
    sentence:string
    gridColumn?:string
    gridRow?:string
    handleKeyDown?:(e:React.KeyboardEvent<HTMLInputElement>)=>void
    handleChange?:(e:React.ChangeEvent<HTMLInputElement>)=>void
    onClick?:(e: React.MouseEvent<HTMLInputElement, MouseEvent>) => void
    onScroll?:(event: React.UIEvent<HTMLInputElement, UIEvent>) => void
}

export const InputAndCopy:VFC<Props> = (props) => {
    const {style,index,colorList,sentence,handleChange,handleKeyDown,onScroll,onClick,
    gridColumn,gridRow} = props
    return(
        <Contener 
        gridColumn={gridColumn}
        gridRow={gridRow}
        key={`inputContener${index}`}>
            <Input
                autoComplete="off"
                id={`input${index}`}
                key={`input${index}`}
                value={sentence}
                handleKeyDown={handleKeyDown}
                handleChange={handleChange}
                onClick={onClick}
                onScroll={onScroll}
                style={style}
                type="text"/>
            <CopyBox  key={`copyContener${index}`}>
            {sentence.split(" ").map((phrase,pharaseIndex)=>(
                    <CopySpan
                        color={colorList[pharaseIndex]}
                        key={`copySpan${phrase}${index}${pharaseIndex}`}>
                        {phrase}
                    </CopySpan>
            ))}
            <TailSpan id={`tailPosition${index}`}/>
            </CopyBox>
                
        </Contener>
    )
}
const Contener = styled.div<{gridColumn:string | undefined,gridRow:string | undefined}>`
width:100%;
height:100%;
position:relative;
grid-row:${props=>props.gridRow};
grid-column:${props=>props.gridColumn};
`