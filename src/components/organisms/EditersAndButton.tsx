import {FolderAndEditer} from "../organisms/FolderAndEditer"
import { ContainedButtons } from "../atoms/Bottun_MatirialUI"
import styled from "styled-components"
import { useState } from "react"
export const EditersAndButton = () => {
    const [sentences,setSentences] = useState([""])
    return (
    <Contener>
    <ButtonContener>
    <ContainedButtons
        value="Execute"
        color="secondary"
        onClick={()=>console.log(sentences)}
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