import React,{ useEffect, useState ,VFC} from "react"
import styled from "styled-components"
type Props = {
    lineColor?:string
    defaultChildren?:string
    onChange?: (event: React.ChangeEvent<HTMLInputElement>)=>void
    value?:string
    id?:string
    label?:string
}

export const TransformInput:VFC<Props> = (props)=>{
    const {lineColor="#3be5ae",defaultChildren="Input password"
    ,onChange,id,value="",label="Password"} = props
    const [color,setColor] = useState("lightgray")
    const [isInput,setIsInput] = useState(false)
    const handleFocus = ()=>{
        setColor(lineColor)
    }
    const handleChage =(event:React.ChangeEvent<HTMLInputElement>)=>{
        if(event.target.value.length > 0){
            setIsInput(true)
        }else{
            setIsInput(false)
        }
    }
    useEffect(()=>{
        if(value.length > 0){
            setIsInput(true)
        }else{
            setIsInput(false)
        } 
    },[value])
    return(
        <SGroup>
            <SLabel htmlFor="text">{label}</SLabel>
                <SPasswordBox color={color}>
                    <SPassword_inner 
                    lineColor={lineColor}
                    onFocus={handleFocus} 
                    onBlurCapture={()=>{setColor("lightgray")}}>
                    <SInput 
                        value={value}
                        id={id}
                        type="text" 
                        onChange={onChange}></SInput>
                    {isInput ? (<SP lineColor={lineColor}>
                        {defaultChildren}
                    </SP>):
                    (<SPasswordString>
                        {defaultChildren}
                    </SPasswordString>)}
                    
                    </SPassword_inner>
                </SPasswordBox>
        </SGroup>
    )
}
const SGroup = styled.div`
width:400px;
height:100px;
`
const SLabel = styled.label`

`
const SPasswordBox = styled.div.attrs(props=>({
    color:props.color
}))`
display: flex; /*アイコン、テキストボックスを調整する*/
align-items: center; /*アイコン、テキストボックスを縦方向の中心に*/
justify-content: center; /*アイコン、テキストボックスを横方向の中心に*/
width: 100%;
height: 50px;
border-radius: 5px;
border: 1px solid ${props=>props.color};
margin-top:3px;
`


const SInput = styled.input`
position: absolute;
z-index: 1; /*.password_stringよりも上に配置*/
height: 100%;
width: 100%;
top: 0; left: 0; bottom: 0; right: 0;
border: none; /*枠線非表示*/
outline: none; /*フォーカス時の枠線非表示*/
padding: 0 10px;
font-size: 16px;
background-color: transparent; /*後ろの.password_stringを見せるため*/
box-sizing: border-box; /*横幅の解釈をpadding, borderまでとする*/
`

const SPasswordString = styled.div`
position: absolute;
height: 100%;
width: 100%; /*文字列分の長さ*/
top: 0; left: 0; bottom: 0; right: 0;
padding-left: 10px; /*position: absolute;でのmarginは親要素はみ出す*/
font-size: 16px;
line-height: 50px; /*文字列を縦方向にmiddleに見せるため*/
background-color: transparent;
color: #80868b;
box-sizing: border-box; /*横幅の解釈をpadding, borderまでとする*/
transition: all 0.2s;
-webkit-transition: all 0.2s;
`

const SPassword_inner = styled.div<{lineColor:string}>`
width: 100%;
height: 100%;
background-color: transparent; /*.password_boxの枠線お角一部被るため透明に*/
position: relative;
${SInput}:focus +  ${SPasswordString}{
    color: ${props=>props.lineColor};
    font-size: 10px;
    line-height: 10px;
    width: 85px;
    height: 10px;
    padding: 0 2px;
    background-color: white;
    transform:translate3d(5px, -6px, 0);
}
`
const SP = styled.div<{lineColor:string}>`
color: ${props=>props.lineColor};
font-size: 10px;
line-height: 10px;
width: 85px;
height: 10px;
padding: 0 2px;
background-color: white;
transform:translate3d(5px, -6px, 0);
`