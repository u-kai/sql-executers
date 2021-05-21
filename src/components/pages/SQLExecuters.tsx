import styled from "styled-components"
import {ButtonAppBar} from "../atoms/ButtonAppBar-MaterialUI"
import { EditersAndButton } from "../organisms/EditersAndButton" 
export const SQLExrcuters = () =>{
    return (
        <Contener>
            <HeaderContener>
                <ButtonAppBar
                buttons={["INSERT"]}
                onClicks={[(e)=>console.log("I")]}/>
            </HeaderContener>
            <EditersContener>
                <EditersAndButton></EditersAndButton>
            </EditersContener>
            <CopyDBContener>
                <DumyT></DumyT>
            </CopyDBContener>
        </Contener>
    )
}

const Contener = styled.div`
overflow:auto;
display:grid;
width:100%;
height:100%;
grid-template-rows:70px 400px 400px;
grid-template-columns:50% 50%;
`

const HeaderContener = styled.div`
grid-row:1/2;
grid-column:1/3;
`
const EditersContener = styled.div`
grid-row:2/3;
grid-column:1/2;
`

const CopyDBContener = styled.div`
grid-row:2/3;
grid-column:2/3;
`
const DumyT = styled.div`
border:solid black;
width:100%;
height:100%;
`