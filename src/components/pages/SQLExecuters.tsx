import { useEffect, useState } from "react"
import styled from "styled-components"
import {ButtonAppBar} from "../atoms/ButtonAppBar-MaterialUI"
import { EditersAndButton } from "../organisms/EditersAndButton" 
import {insert, InsertClone} from "../TableClass.ts/Insert"
import { TextareaCreateProps} from "../organisms/TextareaCreateprops"
import { removeLastChar, removeLastValue } from "functions/editerFucntions"
import {postDataAndReturnResposeJson} from "functions/tableFunctions"
import {Table as TableEditer} from "../atoms/TableEditer"
import { TableContainer } from "@material-ui/core"
export const SQLExrcuters = () =>{
    const [sentences,setSentences] = useState([""])
    const [rows,setRows] = useState<string[][][]>([[[]]])
    const [columns, setColumns] = useState<string[][]>([[]])
    const onClick = () =>{
        const querys = returnQuerys()
        console.log(querys)
        const postData = {
            querys:querys
        }
        const url = "editerhandler"
        postDataAndReturnResposeJson(postData,url)
        .then((data:{select:{[key:string]:string}[][]})=>{
            if(data["select"].length !== 0){
                console.log(data["select"])
                const results = new Map<string,Object[]>(Object.entries(data["select"]))
                let cloneColumns:string[][] = []
                let cloneValues:string[][][] = []
                let valuesBuff:string[][]= []
                try{
                    
                    results.forEach((result)=>{
                        if(result[0]!==undefined){
                            console.log(result[0])
                            const columnsList = Object.keys(result[0])
                            // console.log("nulllll2")
                            cloneColumns.push(columnsList)
                            result.map((value)=>{
                                // console.log("nulllll3")
                                if(value === null){
                                    console.log("nulllll")
                                }
                                const dataValuse:string[] = Object.values(value)
                                // console.log("nulllll4")
                                valuesBuff.push(dataValuse)
                            })
                            cloneValues.push(valuesBuff)
                            valuesBuff=[]
                        }
                    })
                }catch(e){
                    console.log(e)}
                setRows(cloneValues)
                setColumns(cloneColumns)
            }


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
    useEffect(()=>{
        const contener = document.getElementById(`tableContener`)
        if(contener){
            console.log(contener.clientHeight)
        }
    },[columns])
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
            <Results>Results</Results>
            <TablesConetener
            id={`tableContener`}>
            {columns.map((column,i)=>(
                <>
                <TableContainer>
                <TableEditer
                rows={rows[i]}
                columns={column}
                tableKey={`select${i}`}
                headerKey={`select${i}`}
                bodyKey={`select${i}`}
                />
                </TableContainer>
                <br></br>
                </>
            ))}
            </TablesConetener>
            
        </Contener>
    )
}

const Results = styled.div`
font-size:30px;
margin:0px;
font-weight:bold;
`

const Contener = styled.div`
overflow:auto;
display:grid;
width:100%;
height:100%;
grid-template-rows:70px 480px 1fr;
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
border:solid #d4d9df 1px;
`
