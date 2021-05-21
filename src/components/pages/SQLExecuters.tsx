import { useState } from "react"
import styled from "styled-components"
import {ButtonAppBar} from "../atoms/ButtonAppBar-MaterialUI"
import { EditersAndButton } from "../organisms/EditersAndButton" 
import {insert, InsertClone} from "../TableClass.ts/Insert"
import { TextareaCreateProps} from "../organisms/TextareaCreateprops"
import { removeLastChar, removeLastValue } from "functions/editerFucntions"
import {postDataAndReturnResposeJson} from "functions/tableFunctions"
import {Table as TableEditer} from "../atoms/TableEditer"
export const SQLExrcuters = () =>{
    const [sentences,setSentences] = useState([""])
    const onClick = () =>{
        const querys = returnQuerys()
        console.log(querys)
        const postData = {
            querys:querys
        }
        const url = "editerhandler"
        postDataAndReturnResposeJson(postData,url)
        .then((data)=>{
            console.log(data["select"])
            // console.log(typeof data["select"])
            console.log(getColumns(data["select"]))
        })
    }
    const returnQuerys = () =>{
        let oneLineQuery = sentences.join("")
        if(oneLineQuery[oneLineQuery.length-1]===";"){
            oneLineQuery = removeLastChar(oneLineQuery)
        }
        const querys = oneLineQuery.split(";")
        return querys
    }
    //{[key:string]:string|number|null|undefined}[]
    const getColumns = (results:{[key:string]:string|number|null|undefined}[][]) => {
        console.log(results[0][0],"success")
        return Object.keys(results[0][0])
    }
    return (
        <Contener>
            <HeaderContener>
                <ButtonAppBar
                buttons={["INSERT"]}
                onClicks={[(e)=>console.log("I")]}/>
            </HeaderContener>
            <EditersContener>
                <EditersAndButton
                    onClick={onClick}
                    sentences={sentences}
                    setSentences={setSentences}></EditersAndButton>
            </EditersContener>
            <CopyDBContener>
                <TextareaCreateProps></TextareaCreateProps>
            </CopyDBContener>
            <TablesConetener>
                <TableEditer
                rows={[["d"]]}
                columns={["d"]}
                tableKey={"select"}
                headerKey={"select"}
                bodyKey={"select"}
                />
            </TablesConetener>
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

const TablesConetener = styled.div`
gird-row:3/4;
grid-column:1/2;
padding:10px;
`
const DumyC = styled.div`
border:solid black;
width:100%;
height:100%;
`
const DumyT = styled.div`
border:solid black;
width:100%;
height:100%;
`