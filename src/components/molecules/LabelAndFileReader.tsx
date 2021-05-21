import styled from "styled-components"
import {ReadFile} from "../atoms/ReadFile"
import {VFC} from "react"

type Props = {
    texts:string[]
    setTexts: (value: React.SetStateAction<string[]>) => void
    colorList:string[][]
    setColorList:React.Dispatch<React.SetStateAction<string[][]>>
}

export const LabelAndFileReader:VFC<Props> = (props) =>{
    const {texts,setTexts,colorList,setColorList} = props
    return(
        <>
        <Label>
            <ReadFile
            colorList={colorList}
            setColorList={setColorList}
            texts={texts}
            setTexts={setTexts}
            ></ReadFile>
        </Label>
        </>
    )
}

const Label = styled.label`
width:100%;
height:70px;
z-index:2;
position:absolute;
top:0px;
left:0px;
`