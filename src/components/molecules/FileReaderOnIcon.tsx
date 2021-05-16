import styled from "styled-components"
import {StyledType} from "../styledTypes/styledType"
import {ImageToButton} from "../molecules/ImageToButton"
import { LabelAndFileReader } from "components/molecules/LabelAndFileReader";
import {VFC} from "react"


type Props = {
    texts:string[]
    setTexts: (value: React.SetStateAction<string[]>) => void
}

export const FileReaderOnIcon:VFC<Props>  = (props) =>{
    const {texts,setTexts} = props
    
    return (
        <ImageToButton
            src={"../../../image/folder-blue-documents-icon.png"}
            imageStyle={imageStyle}>
                <LabelAndFileReader
                    texts={texts}
                    setTexts={setTexts}/>
        </ImageToButton>
    )
}

const imageStyle:StyledType = {
    width:"120px",
    height:"100px",
    position:"absolute",
    top:"0px",
    left:"0px"
}
const Contener = styled.div`
width:120px;
height:80px;
position:relative;
opacity:undifine;
background-color:transparent;
:hover{
    opacity:0.7;
    background-color:white;
}
`
const Label = styled.label`
width:100%;
height:100%;
z-index:2;
position:absolute;
top:0px;
left:0px;
`