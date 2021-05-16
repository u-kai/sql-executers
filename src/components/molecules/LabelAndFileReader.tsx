import styled from "styled-components"
import {ReadFile} from "../atoms/ReadFile"
import {VFC} from "react"

type Props = {
    texts:string[]
    setTexts: (value: React.SetStateAction<string[]>) => void
}

export const LabelAndFileReader:VFC<Props> = (props) =>{
    const {texts,setTexts} = props
    return(
        <>
        <Label>
            <ReadFile
            texts={texts}
            setTexts={setTexts}
            ></ReadFile>
        </Label>
        </>
    )
}

const Label = styled.label`
width:100%;
height:100%;
z-index:2;
position:absolute;
top:0px;
left:0px;
`