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
import {TextareaInsertProps} from "../organisms/TextareInsertProps"
type IorC = "insert" | "create"
type SQLError = {code:string,sqlState:string,errno:number,sqlMessage:string}
type EditerResults = {select:{[key:string]:string}[][]
                        error:SQLError[]
                        otherList:{[key:string]:string}[]}
const errorType:["code","sqlState","errno","sqlMessage"] = ["code","sqlState","errno","sqlMessage"]
export const SQLExrcuters = () =>{
    const [sentences,setSentences] = useState([""])
    const [rows,setRows] = useState<string[][][]>([[[]]])
    const [columns, setColumns] = useState<string[][]>([[]])
    const [IorC,setIorC] = useState<IorC>("create")
    const [errorMessages,setErrorMessages] = useState<SQLError[]>([])

    const onClick = () =>{
        const querys = returnQuerys()
        const postData = {
            querys:querys
        }
        const url = "editerhandler"
        postDataAndReturnResposeJson(postData,url)
        .then((data:EditerResults)=>{
            if(data["select"].length !== 0){
                const results = new Map<string,Object[]>(Object.entries(data["select"]))
                let cloneColumns:string[][] = []
                let cloneValues:string[][][] = []
                let valuesBuff:string[][]= []
                try{
                    results.forEach((result)=>{
                        if(result[0]!==undefined){
                            const columnsList = Object.keys(result[0])
                            cloneColumns.push(columnsList)
                            result.map((value)=>{
                                const dataValuse:string[] = Object.values(value)
                                valuesBuff.push(dataValuse)
                            })
                            cloneValues.push(valuesBuff)
                            valuesBuff=[]
                        }
                    })
                }catch(e){console.log(e)}
                if(cloneColumns.length !== 0 && cloneValues.length !== 0){
                    setRows(cloneValues)
                    setColumns(cloneColumns)
                }
            }
            if(data["error"]){
                setErrorMessages(data["error"])
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
   
    return (
        <Contener>
            <HeaderContener>
                <ButtonAppBar
                buttons={["INSERT","CREATE"]}
                onClick={[(e)=>setIorC("insert"),(e)=>setIorC("create")]}/>
            </HeaderContener>
            <EditersContener>
                <EditersAndButton
                    onClick={onClick}
                    sentences={sentences}
                    setSentences={setSentences}></EditersAndButton>
            </EditersContener>
            <CopyDBContener>
                {IorC === "create" ? (
                    <TextareaCreateProps></TextareaCreateProps>
                ):(
                    <TextareaInsertProps></TextareaInsertProps>
                )}
            </CopyDBContener>
            <Results>Results</Results>
            <TablesConetener
            id={`tableContener`}>
            {columns.map((column,i)=>(
                <>
                {errorMessages.map((error)=>(
                    errorType.map((type)=>(
                        <Errors>{type}:{error[type]}</Errors>
                    ))
                ))}
                <br></br>
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
margin-left:30px;
`

const Errors = styled.div`
color:red;
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
margin-left:30px;
`

const CopyDBContener = styled.div`
grid-row:2/3;
grid-column:2/3;
margin-left:30px;
`

const TablesConetener = styled.div`
gird-row:3/4;
grid-column:1/2;
padding:10px;
border:solid #d4d9df 1px;
margin-left:30px;
`
