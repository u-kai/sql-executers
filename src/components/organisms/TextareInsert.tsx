import styled from "styled-components"
import { Button } from "../atoms/Button"
import {useState} from "react"
import { Table } from "../atoms/Table"
import {postDataAndReturnResposeJson,caseNotTable} from "../../functions/tableFunctions"
import { TextareaAndImage } from "../molecules/TextareaAndImage"
import {TransformInput} from "../atoms/TransformInput"

const url = "copyToInsert"
export const TextareaInsert = ()=>{

    const sendDataAndSetResults = ()=>{
        const sendDatas = {
                tableName:tableName,
                columns:columns,
                columnsValues:columnsValues
        }
        postDataAndReturnResposeJson(sendDatas,url)
        .then((data)=>console.log(data))
    }

    type ColumnValue = {[key:string]:string}
    const [columnsValues,setColumnsValues] = useState<ColumnValue[]>([])
    const [columns,setColumns] = useState<string[]>([])
    const [tableName,setTableName] = useState("") 
    const [isArea, setIsArea] = useState(true)
    const [textarea,setTextarea] = useState("")

    class ColumnValueClone{
        clone:ColumnValue[]
        columns:string[]
        constructor(columnsValues:ColumnValue[],copyDatas:string){
            this.clone = columnsValues
            this.columns = this.setColumns(copyDatas)
        }
        setColumns(copyDatas:string){
            setColumns(copyDatas.split("\n")[0].split("\t"))
            return copyDatas.split("\n")[0].split("\t")
        }
        setOneLineValues(row:string){
            const values = row.split("\t")
            let columnsAndValues:{[key:string]:string}= {}
            this.columns.map((column,i)=>{
                columnsAndValues[column] = values[i]
            })
            return columnsAndValues
        }
        appendColumnValuse(columnsAndValues:{[key:string]:string}){
            this.clone = [...this.clone,columnsAndValues]
        }
        makeClone(row:string){
            const columnsAndValues = this.setOneLineValues(row)
            this.appendColumnValuse(columnsAndValues)
        }
        
        }

    const pasteToTable = (e: React.ChangeEvent<HTMLTextAreaElement>) => {
        if(caseNotTable(e.target.value,"insert")){
            return
        }
        const rows = e.target.value.split("\n")
        const columnsAndValues = new ColumnValueClone(columnsValues,e.target.value)
        rows.map((row,i)=>{
            if(i!==0){
                columnsAndValues.makeClone(row)
            }
        })
        console.log(columnsAndValues.clone)
        setColumnsValues(columnsAndValues.clone)
    }
    
    const isDataExist = () => {
        if(columnsValues.length < 1){
            alert("データを挿入してください")
            return false
        }
        return true
    }
    const addRows = ()=>{
        if(isDataExist()){
            let newRow:ColumnValue = {}
            columns.map((column)=>{
            newRow[column] = ""
        })
        setColumnsValues([...columnsValues,newRow])
        }
    }

    const handleChangeValues = (e: React.ChangeEvent<HTMLInputElement>,i:number,column:string)=>{
        columnsValues[i][column] = e.target.value
        setColumnsValues([...columnsValues])
    }
  
    const resetAndChangeUI = ()=> {
        setIsArea(true)
        setColumns([])
        setColumnsValues([])
    }
    const cellChildren = (value:string,i:number,column:string)=>{
        return(
                <TableTextArea
                    spellCheck="false"
                    value={value}
                    onChange={(e)=>handleChangeValues(e,i,column)}/>
        )
    }

    return(
        <Contener>
        <InputContener>
        <TransformInput
            lineColor={"red"}
            defaultChildren={"Input table name"}
            label={"Table name"}
            value={tableName}
            onChange={(e)=>setTableName(e.target.value)}/>
        </InputContener>
        <ImageContener>
        <TextareaAndImage
        src={"../../../image/db.png"}
        onChange={pasteToTable}
        value={textarea}
        ></TextareaAndImage>
        </ImageContener>
        <ResetButtonContener>
        <Button 
        backgroundColor={"#e73562"}
        borderColor={"#942343"}
        bottomColor={"#941f57"}
        onClick={resetAndChangeUI}
        width={120}
        height={50}
        fontSize={30}
        >RESET</Button>
        </ResetButtonContener>
        <TableContener>
        <Table
        columns={columns}
        rows={columnsValues}
        cellElements={cellChildren}
        tableKey={"taveleel"}
        headerKey={"nf;alfkd"}
        bodyKey={"dd"}
        ></Table> 
        </TableContener>
        <ButtonsContener>
        <Button 
        onClick={sendDataAndSetResults}
        backgroundColor={"#e73562"}
        borderColor={"#942343"}
        bottomColor={"#941f57"}
        width={150}
        height={50}
        fontSize={30}
        >EXECUTE</Button>
        <Button onClick={addRows}
        backgroundColor={"#e73562"}
        borderColor={"#942343"}
        bottomColor={"#941f57"}
        width={120}
        height={50}
        fontSize={30}>ADD</Button>
        </ButtonsContener>
        </Contener>
        
    )
}


const Contener = styled.div`
position:absolute;
overflow:auto;
display:grid;
width:100%;
height:100%;
grid-template-columns:300px 50px 400px;
grid-template-rows:100px 200px 70px 70px 1fr;
`
const InputContener = styled.div`
margin:10px;
grid-row:1/2;
grid-column:1/2;
`
const ImageContener = styled.div`
width:310px;
height:220px;
grid-row: 2 / 4;
grid-column: 1 / 2;
`

const ResetButtonContener = styled.div`
grid-row: 3 / 4;
grid-column: 2 / 3;
`

const TableContener = styled.div`
grid-row: 5 / 6;
grid-column: 1 / 4;
overflow:auto;
`
const ButtonsContener = styled.div`
grid-row: 4 / 5;
grid-column: 1 / 4;
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