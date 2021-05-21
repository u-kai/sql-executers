import {FolderAndEditer} from "../organisms/FolderAndEditer"
import { ContainedButtons } from "../atoms/Bottun_MatirialUI"
import styled from "styled-components"
import { useState,VFC } from "react"
import {postDataAndReturnResposeJson} from "functions/tableFunctions"
import { removeLastChar, removeLastValue } from "functions/editerFucntions"


type Props = {
    onClick: () => void
    sentences:string[]
    setSentences: React.Dispatch<React.SetStateAction<string[]>>
    //setResults:
}


export const EditersAndButton:VFC<Props> = (props) => {
    // const [sentences,setSentences] = useState([""])
    const {onClick,sentences,setSentences} = props
    const [resutls, setResults] = useState<{[key:string]:[]}[]>([])
    
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
grid-template-columns:10px 120px 300px  1fr;
`
const ButtonContener = styled.div`
grid-row:2/3;
grid-column:4/5;
`
const EditersContener = styled.div`
grid-row:1/4;
grid-column:1/5;
`