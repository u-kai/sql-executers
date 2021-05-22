import styled from "styled-components"
import { Button } from "../atoms/Button"
import {useEffect, useState} from "react"
import {Table} from "../atoms/Table"
import {postDataAndReturnResposeJson,caseNotTable} from "../../functions/tableFunctions"
//import {Results} from "../../types/tableTypes"
import {VFC} from "react"
import { TextareaAndImage } from "./TextareaAndImage"
import {TransformInput} from "../atoms/TransformInput"
import {ContainedButtons} from "../atoms/Bottun_MatirialUI"
import { useEditer } from "hocks/useEditer"
import { SQLErrors } from "components/atoms/SQLErrors"
import {StatusMessage} from "../atoms/StatusMessage"

type Props = {
    url:string
    initColumns:string[]
    initState?:{
        [key: string]: string;
    }
    CloneClass:any
    sqlType:"insert"|"create"
}
type StatusMessage = {
    fieldCount: number,
    affectedRows: number,
    insertId: number,
    info: string,
    serverStatus: number,
    warningStatus: number
  }
const errorType:["code","sqlState","errno","sqlMessage"] = ["code","sqlState","errno","sqlMessage"]
type SQLError = {code:string,sqlState:string,errno:number,sqlMessage:string}
type Results = {
    results:[[{affectedRows: number
    fieldCount: number
    info: string
    insertId: number
    serverStatus: number
    warningStatus: number},null]]
    error:SQLError[]
}
export const TextareaToSQL:VFC<Props> = (props) =>{
    const {url,initColumns,CloneClass,sqlType,initState} = props
    type OneLineCells = {[key:string]:string}
    type CellChageEvent = React.ChangeEvent<HTMLSelectElement> | React.ChangeEvent<HTMLInputElement>
    const [errors,setErrors] = useState<SQLError[]>([])
    const [tableName,setTableName] = useState("")
    const [results, setResults] = useState<StatusMessage[]>([])
    const [isSuccess,setIsSuccess] = useState(false)
    const [multiLineCells,setMultiLineCells] = useState<{[key:string]:string}[]>([])
    const [textarea,setTextarea] = useState("")
    const [columns,setColumns] = useState(initColumns.slice())
    const sendTableNameAndsetColumns = (e: React.FocusEvent<HTMLInputElement>) => {
        const sendTableName = {
            tableName:e.target.value
        }
        postDataAndReturnResposeJson(sendTableName,"showTableColumn")
        .then((results)=>{
            console.log(results)
        })
    }
    useEffect(()=>{
        if(initState){
            setMultiLineCells([Object.assign({},initState)])
        }
    },[])

    const sendDataAndSetResults = () => {
        setIsSuccess(false)
        const sendDatas = {
                tableName:tableName,
                multiLineCells:multiLineCells
            }
        postDataAndReturnResposeJson(sendDatas,url)
        .then((results:Results)=>{
            console.log(results)
            setErrors(results["error"])
            if(results["results"].length>0){
                setIsSuccess(true)
            }
            console.log(results["results"])
            let resultsTemp:StatusMessage[] = []
            results.results.map((result)=>{
                result.filter((value)=>{
                    if(value!==null){
                        resultsTemp = [...resultsTemp,value]
                    }
                })
            })
            setResults(resultsTemp)
        }
            )
    }
    
    const pasteToTable = (e: React.ChangeEvent<HTMLTextAreaElement>) => {
        if(caseNotTable(e.target.value,sqlType)){
            return
        }
        const rows = e.target.value.split("\n")
        const cloneClass = new CloneClass(multiLineCells,e.target.value)
        if(sqlType === "insert"){
            console.log("setcolumns",rows[0].split("\t"))
            setColumns(rows[0].split("\t"))
            rows.map((row,i)=>{
                if(i!==0){
                    console.log("row",row)
                    cloneClass.makeClone(row)
                }
            })
        }else{
            rows.map((row)=>{
                cloneClass.makeClone(row)
            })
        }
        setMultiLineCells(cloneClass.clone)
    }
    const handleChange = (e:CellChageEvent,index:number,column:string) => {
        multiLineCells[index][column] = e.target.value
        setMultiLineCells([...multiLineCells])
    }
    const isDataExist = () => {
        switch(sqlType){
            case "create":
                if(multiLineCells[0]["DataName"]===""){
                    alert("1つ目のデータを定義してください")
                    return false
                }
                return true
            case "insert":
                if(multiLineCells.length < 1){
                    alert("データを挿入してください")
                    return false
                }
                return true
            }
        }

    const addRows = () => {
        if(isDataExist()){
            let newRow:OneLineCells = Object.assign({},initState)
            console.log("initstate",newRow,"init",initState)
            if(sqlType === "insert"){
                initColumns.map((column)=>{
                newRow[column] = ""
                })
            }
            setMultiLineCells([...multiLineCells,newRow])
        }
    }
    const resetAndChangeUI = () => {
        setColumns(initColumns.slice())
        if(initState){
            console.log("resett",[Object.assign({},initState)])
            setMultiLineCells([Object.assign({},initState)])
        }else{
            setMultiLineCells([])
        }
        //init setResult
        setErrors([])
        setResults([])
    }
    const cellChildren = (value:string,index:number,column:string) => {
        switch(column){
            case "IsPrimary":
                return(
                    <>
                    <SSelect onChange={(e)=>handleChange(e,index,column)} defaultValue={""}>
                                <SOption value={""}></SOption>
                                <SOption  value={"PRIMARY"}>PRIMARY</SOption>
                            </SSelect>
                        {/* {multiLineCells[index][column] === "PRIMARY" ? (
                            <SSelect onChange={(e)=>handleChange(e,index,column)}>
                                <SOption value={""}></SOption>
                                <SOption  defaultValue={"PRIMARY"}>PRIMARY</SOption>
                            </SSelect>
                            ):
                            (
                            <SSelect onChange={(e)=>handleChange(e,index,column)}>
                                <SOption defaultValue=""></SOption>
                                <SOption value={"PRIMARY"}>PRIMARY</SOption>
                            </SSelect>
                            )
                        } */}
                    </>
                )
            case "Option":
                return(
                    <SSelect onChange={(e)=>handleChange(e,index,column)} defaultValue="">
                        <SOption value=""></SOption>
                        <SOption value="AUTO INCREMENT">AUTO INCREMENT</SOption>
                        <SOption value="DEFAULT CURRENT_TIMESTAMP">DEFAULT CURRENT_TIMESTAMP</SOption>
                        <SOption value="DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP">DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP</SOption>
                    </SSelect>
                )
            case "IsNull":
                return(
                    <SSelect onChange={(e)=>handleChange(e,index,column)} defaultValue="NOT NULL">
                        <SOption value="NOT NULL" >NOT NULL</SOption>
                            <SOption value="NULL">NULL</SOption>
                    </SSelect>
                )
            default:
                return(
                    <TableTextArea
                        spellCheck="false"
                        value={value}
                        onChange={(e)=>handleChange(e,index,column)}/>
                )
            }
    }

    return(
        <Contener>
            <InputContener>
                <TransformInput
                    onBlur={sendTableNameAndsetColumns}
                    lineColor={"red"}
                    defaultChildren={"Input table name"}
                    value={tableName}
                    onChange={(e)=>setTableName(e.target.value)}/>
                </InputContener>
            <ImageContener>
                <TextareaAndImage
                    src={"../../../image/db.png"}
                    onChange={pasteToTable}
                    value={textarea}/>
            </ImageContener>
            <TitleContener>
            {sqlType.toLocaleUpperCase()}
            </TitleContener>
            <TableContener>
                <SQLErrors
                errors={errors}></SQLErrors>
                {/* {isSuccess ? ("succsess"):(null)} */}
                <StatusMessage statusMessage={results}></StatusMessage>
                <Table
                columns={columns}
                rows={multiLineCells}
                cellElements={cellChildren}
                headerKey={`header${sqlType}`}
                bodyKey={`body${sqlType}`}
                tableKey={`table${sqlType}`}/> 
            </TableContener>
            <ButtonsContener>
                <ContainedButtons 
                    onClick={sendDataAndSetResults}
                    color="primary"
                    value={"EXECUTE"}/>
                <ContainedButtons 
                    onClick={addRows}
                    color="primary"
                    value={"ADD"}
                    />
                    <ContainedButtons
                    onClick={resetAndChangeUI}
                    color="secondary"
                    value={"RESET"}/>
            </ButtonsContener>
        </Contener>
        
    )
}

const Contener = styled.div`
position:absolute;
// overflow:auto;
display:grid;
width:600px;
height:100%;
grid-template-columns:70px 460px 70px;
grid-template-rows:130px 250px 100px 40px 1fr;
`
const InputContener = styled.div`
margin:20px;
grid-row:1/2;
grid-column:2/3;
`

const TitleContener = styled.div`
grid-row:4/5;
grid-column:1/2;
font-size:30px;
font-weight:bold;
`
const ImageContener = styled.div`
width:310px;
height:220px;
display:flex;
text-align:center;
grid-row: 2 / 3;
grid-column: 2 / 3;
`


const TableContener = styled.div`
grid-row: 5 / 6;
grid-column: 1 / 4;
overflow:auto;
//height:px;
// display:flex;
// justify-content:center;
//padding:20px;
`

const ButtonsContener = styled.div`
grid-row: 3 / 4;
grid-column: 2 / 3;
margin-top:45px;
display:flex;
justify-content:space-around;
`


const InputAndCopyBoxStyle =  
`
border-bottom-width:0;
border-left-width:0;
border-right-width:0;
border-top-width:0;
font-style:normal;
font-variant:normal;
font-weight:normal;
letter-spacing:0px;
word-spacing:0px;
line-height:normal;
padding-bottom:5px;
padding-left:5px;
padding-right:5px;
padding-top:5px;
text-decoration:none;
width:100%;
`

const TableTextArea = styled.input`
background-color:transparent;
border:none;
outline:none;
width:150px;
font-size:15px;
${InputAndCopyBoxStyle};
box-sizing: border-box;
overflow:auto;
`
const SSelect = styled.select`
width:100%;
height:100%;
outline:none;
border:none;
`
const SOption = styled.option`
width:100%;
height:100%;
outline:none;
border:none;
`