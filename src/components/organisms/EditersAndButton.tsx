import {FolderAndEditer} from "../organisms/FolderAndEditer"
import { ContainedButtons } from "../atoms/Bottun_MatirialUI"
import styled from "styled-components"
import { useState } from "react"
import {postDataAndReturnResposeJson} from "functions/tableFunctions"
import { removeLastChar, removeLastValue } from "functions/editerFucntions"
export const EditersAndButton = () => {
    const [sentences,setSentences] = useState([""])
    const onClick = () =>{
        const querys = returnQuerys()
        console.log(querys)
        const sendData = {
            querys:querys
        }
        const url = "editerhandler"
        postDataAndReturnResposeJson(sendData,url)
        .then((data)=>console.log(data))
    }
    const returnQuerys = () =>{
        let oneLineQuery = sentences.join("")
        if(oneLineQuery[oneLineQuery.length-1]===";"){
            oneLineQuery = removeLastChar(oneLineQuery)
        }
        const querys = oneLineQuery.split(";")
        return querys
    }
    return (
    <Contener>
    <ButtonContener>
    <ContainedButtons
        value="Execute"
        color="secondary"
        onClick={()=>onClick()}
        />
    </ButtonContener>
    <EditersContener>
        <FolderAndEditer
        sentences={sentences}
        setSentences={setSentences}></FolderAndEditer>
    </EditersContener>
    </Contener>
    )
}


const Contener  = styled.div`
display:grid;
grid-template-rows:120px 70px 1fr;
grid-template-columns:10px 120px 200px  1fr;
`
const ButtonContener = styled.div`
grid-row:2/3;
grid-column:4/5;
`
const EditersContener = styled.div`
grid-row:1/4;
grid-column:1/5;
`