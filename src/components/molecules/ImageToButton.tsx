import {ReadFile} from "../atoms/ReadFile"
import styled from "styled-components"
import { useState } from "react"
import {Image} from "../atoms/Image"
import {StyledType} from "../styledTypes/styledType"
import {VFC} from "react"
import { returnStyle } from "functions/returnStyle"

type Props = {
    src:string
    imageStyle?:StyledType
    contenerStyle?:StyledType
    children:JSX.Element
}

export const ImageToButton:VFC<Props> = (props) =>{
    const {src,imageStyle,contenerStyle,children} = props
    const [isMouseEnter,setIsMouseEnter] = useState(false)
    let contenerStyles = ""
    if(contenerStyle){
        contenerStyles = returnStyle(contenerStyle)
    }
    return (
        <>
        <Contener
            styles={contenerStyles}
            onMouseLeave={(_)=>setIsMouseEnter(false)}
            onMouseEnter={(_)=>setIsMouseEnter(true)}>
            <Image
            src={src}
            style={imageStyle}
            ></Image>
            {children}
        </Contener>
        {isMouseEnter ? (
            <p>ファイル読み取り</p>
        ):(
            null
        )}
        
        </>
    )
}

const Contener = styled.div<{styles:string}>`
width:120px;
height:80px;
position:relative;
background-color:transparent;
:hover{
    opacity:0.7;
    background-color:white;
}
${props=>props.styles}
`
const Label = styled.label`
width:100%;
height:100%;
z-index:2;
position:absolute;
top:0px;
left:0px;
`