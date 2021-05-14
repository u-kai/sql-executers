import styled from "styled-components"
import {VFC} from "react"

export type Props = {
    width?:number
    height?:number
    backgroundColor?:string
    borderColor?:string
    bottomColor?:string
    children?:string
    onClick:(event: React.MouseEvent<HTMLButtonElement, MouseEvent>) => void
}

export const Button:VFC<Props> =(props)=>{
    const {onClick,width=100,height=30,
            backgroundColor="transparent",borderColor="#1e50a2",
            children="Button",bottomColor="#1e50a2"} = props
    return(
        <SBox
        backgroundColor={backgroundColor}
        borderColor={borderColor}
        bottomColor={bottomColor}
        width={width}
        height={height}>
        <SButton 
        onClick={onClick}>
            {children}
        </SButton>
        </SBox>
    )

}
const SBox = styled.div<{backgroundColor:string,borderColor:string,
                        width:number,height:number,bottomColor:string}>`
width:${props=>props.width}px;
height:${props=>props.height}px;
border-radius:3px;
border:solid 2px;
border-color:${props=>props.borderColor};
border-bottom:4px ${props=>props.bottomColor} solid;
background-color:${props=>props.backgroundColor};
-webkit-box-shadow: 0 3px 5px rgba(0, 0, 0, .3);
    box-shadow: 0 3px 5px rgba(0, 0, 0, .3);
:hover{
    border-color:${props=>props.bottomColor};
}
:active{
    height:${props=>props.height + 2}px;
    border-bottom:solid 2px ${props=>props.bottomColor};
    transform:translateY(2px)
}
`
const SButton = styled.button`
width:100%;
height:100%;
border-radius:3px;
border:none;
background-color:transparent;
`