import styled from "styled-components"
import {VFC} from "react"

type Props = {
    src:string
    value:string
    onChange?: ((event: React.ChangeEvent<HTMLTextAreaElement>) => void) | undefined
}
export const TextareaAndImage:VFC<Props> = (props) =>{
    const {src,value,onChange} = props
    return (
        <Contener>
            <SImage src={src}></SImage>
            <STextArea 
            spellCheck="false"
            value={value}
            onChange={onChange}></STextArea>
        </Contener>
    )
}

const Contener = styled.div`
position:relative;
`

const STextArea = styled.textarea`
width:500px;
height:400px;
outline:none;
color:transparent;
background-color:transparent;
border:none;
resize:none;
position:absolute;
top:0px;
left:0px;
z-index:1;
:hover{
    opacity:0.3;
    background-color:white;
}
`
const SImage = styled.img`
position:absolute;
width:500px;
height:400px;
top:0px;
left:0px;

`