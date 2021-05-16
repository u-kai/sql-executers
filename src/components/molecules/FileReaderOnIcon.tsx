import {ReadFile} from "../atoms/ReadFile"
import styled from "styled-components"
import { useState } from "react"
import {Image} from "../atoms/Image"
import {StyledType} from "../styledTypes/styledType"


const imageStyle:StyledType = {
    width:"120px",
    height:"100px",
    position:"absolute",
    top:"0px",
    left:"0px"
}

export const FileReaderOnIcon = () =>{
    const [texts,setTexts] = useState([""])
    const [isMouseEnter,setIsMouseEnter] = useState(false)
    return (
        <>
        <Contener
            onMouseLeave={(_)=>setIsMouseEnter(false)}
            onMouseEnter={(_)=>setIsMouseEnter(true)}>
            <Image
            src="../../../image/folder-blue-documents-icon.png"
            style={imageStyle}
            ></Image>
            <Label htmlFor={"readfile"}><ReadFile
            texts={texts}
            setTexts={setTexts}
            ></ReadFile></Label>
        </Contener>
        {isMouseEnter ? (
            <p>ファイル読み取り</p>
        ):(
            null
        )}
        
        </>
    )
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