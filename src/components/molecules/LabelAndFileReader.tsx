import styled from "styled-components"
import {ReadFile} from "../atoms/ReadFile"



export const LabelAndFileReader = () =>{
    return(
        <>
        <Label>
            <ReadFile></ReadFile>
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