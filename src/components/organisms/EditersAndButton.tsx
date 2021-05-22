import {FolderAndEditer} from "../organisms/FolderAndEditer"
import { ContainedButtons } from "../atoms/Bottun_MatirialUI"
import styled from "styled-components"
import { VFC } from "react"



type Props = {
    onClick: () => void
    sentences:string[]
    setSentences: React.Dispatch<React.SetStateAction<string[]>>
}


export const EditersAndButton:VFC<Props> = (props) => {
    const {onClick,sentences,setSentences} = props
    
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
grid-template-rows:120px 70px 250px 1fr;
grid-template-columns:10px 120px 300px  1fr;
`
const ButtonContener = styled.div`
grid-row:4/5;
grid-column:4/5;
`
const EditersContener = styled.div`
grid-row:1/5;
grid-column:1/5;
`