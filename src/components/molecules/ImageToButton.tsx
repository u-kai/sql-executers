import {ReadFile} from "../atoms/ReadFile"
import styled from "styled-components"
import { useState } from "react"
import {Image} from "../atoms/Image"
import {StyledType} from "../styledTypes/styledType"
import {VFC} from "react"
import { returnStyle } from "functions/returnStyle"

type Props = {
    src:string
    hoverWord?:string
    imageStyle?:StyledType
    contenerStyle?:StyledType
    children?:JSX.Element
    onClick?: ((event: React.MouseEvent<HTMLDivElement, MouseEvent>) => void) | undefined
}

export const ImageToButton:VFC<Props> = (props) =>{
    const {src,imageStyle,contenerStyle,children,onClick,hoverWord="ファイル読取り"} = props
    const [isMouseEnter,setIsMouseEnter] = useState(false)
    let contenerStyles:string | undefined
    contenerStyles = returnStyle(contenerStyle)
    return (
        <>
        <Contener
            onClick={onClick}
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
            <HoverText>
                {hoverWord}
            </HoverText>
        ):(
            null
        )}
        </>
    )
}

const HoverText = styled.div`
margin-top:10px;
font-size:5px;
text-align:center;
`

const Contener = styled.div<{styles:string | undefined}>`
width:70px;
height:40px;
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