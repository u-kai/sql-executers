import styled from "styled-components"
import { wordDivide } from "functions/editerFucntions"
import { whatWordColor } from "hocks/useColorList"
import { useSetRecoilState} from "recoil"
import {colorListState} from "store/colorList"
import { sentencesState } from "store/sentences"


export const ReadFile = () => {
    const setColorList = useSetRecoilState(colorListState)
    const setSentences = useSetRecoilState(sentencesState)
    const newColorList = (newSenetences:string[]) => {
        let clone:string[][] = []
        newSenetences.map((sentence)=>{
            const wordList = wordDivide(sentence)
            let tempList:string[] = []
            wordList.map((word)=>{
                
                tempList = [...tempList,whatWordColor(word)]//isueu
            })
            clone = [...clone,tempList]
        })
        setColorList(clone)
    }
    const handleChange = (e:React.ChangeEvent<HTMLInputElement>)=>{
        const input = document.getElementById("readfile")
        if(input){
            const reader = new FileReader()
            const file = e.target
            reader.addEventListener("load",()=>{
                if(typeof reader.result === "string"){
                    const newSentences = reader.result!.split("\n")
                    newSentences.filter((sentence)=>sentence!=="")
                    newColorList(newSentences.filter((sentence)=>sentence!==""))
                    setSentences(newSentences.filter((sentence)=>sentence!==""))
                }else{
                    console.log("notstring")
                }
            })
            if(file.files){
                try{
                    reader.readAsText(file.files[0],"UTF-8")
                }catch(e){
                    console.log(e)
                }
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