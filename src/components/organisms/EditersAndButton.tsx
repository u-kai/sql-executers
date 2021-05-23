import {FolderAndEditer} from "../organisms/FolderAndEditer"
import { ContainedButtons } from "../atoms/Bottun_MatirialUI"
import styled from "styled-components"
import { VFC } from "react"
import { sentencesState } from "store/sentences";
import {useRecoilState} from "recoil"


type Props = {
    onClick: () => void
}


export const EditersAndButton:VFC<Props> = (props) => {
    const {onClick} = props 
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
        <FolderAndEditer/>
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