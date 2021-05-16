import styled from "styled-components"
import {VFC} from "react"

type Props = {
    texts:string[]
    setTexts: (value: React.SetStateAction<string[]>) => void
}

export const ReadFile:VFC<Props> = (props) => {
    const {texts,setTexts} = props
    const handleChange = (e:React.ChangeEvent<HTMLInputElement>)=>{
        const input = document.getElementById("readfile")
        if(input){
            const reader = new FileReader()
            const file = e.target
            reader.addEventListener("load",()=>{
                if(typeof reader.result === "string"){
                    setTexts(reader.result!.split("\n"))
                    console.log(reader.result!.split("\n"))
                }else{
                    console.log("notstring")
                }
            })
            if(file.files![0]){
                reader.readAsText(file.files![0],"UTF-8")
                console.log(file.files![0])
            }
        }
    }
    return (
        <SInput
        id="readfile"
        type="file"
        onChange={handleChange}
        ></SInput>
    )
   
}
const SInput = styled.input`
visibility:hidden;
top:0px;
left:0px;
width:150px;
height:50px;
background-color:red;
z-index:2;
position:absolute;
`