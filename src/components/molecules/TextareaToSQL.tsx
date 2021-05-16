import styled from "styled-components"
import { Button } from "../atoms/Button"
import {useState} from "react"
import {Table} from "../atoms/Table"
import {postDataAndReturnResposeJson,caseNotTable} from "../../functions/tableFunctions"
import {Results} from "../../types/tableTypes"
import {VFC} from "react"
import { TextareaAndImage } from "../molecules/TextareaAndImage"
import {TransformInput} from "../atoms/TransformInput"

type Props = {
    url:string
    constColumns:string[]
    initState:{
        [key: string]: string;
    }
    CloneClass:any
    sqlType:"insert"|"create"
}

// const url = "copyToCreate"
// const constColumns = ["DataName","DataType","IsPrimary","Option","IsNull"]

export const TextareaToSQL:VFC<Props> = (props) =>{
    const {url,constColumns,CloneClass,sqlType,initState} = props
    type OneLineCells = {[key:string]:string}
    type CellChageEvent = React.ChangeEvent<HTMLSelectElement> | React.ChangeEvent<HTMLInputElement>
    class MultiLineCellsClone {
        clone:OneLineCells[]
        constructor(multiLineCells:OneLineCells[]){
            if(multiLineCells[0].DataName === ""){
                this.clone = []
            }else{
                this.clone = multiLineCells
            }
        }
        setOneLineCells(joinRow:string){
            const nameAndType = joinRow.split("\t")
            const cells:OneLineCells ={
                DataName:nameAndType[0],
                DataType:nameAndType[1],
                Option:"",
                IsPrimary:"",
                IsNull:"NULL"
            }
            return cells
        }
        appendCells(cells:OneLineCells){
            this.clone = [...this.clone,cells]
        }
        makeClone(joinRow:string){
            const cells = this.setOneLineCells(joinRow)
            this.appendCells(cells)
        }
    }

    const initLine:OneLineCells = {
        DataName:"",
        DataType:"",
        IsPrimary:"",
        Option:"",
        IsNull:"NULL"
    } 

    const [tableName,setTableName] = useState("") 
    const [isArea, setIsArea] = useState(true)
    const [results, setResults] = useState<Results>()
    const [multiLineCells,setMultiLineCells] = useState<{[key:string]:string}[]>([initState])
    const [textarea,setTextarea] = useState("")
    
    const sendDataAndSetResults = () => {
        const sendDatas = {
                tableName:tableName,
                multiLineCells:multiLineCells
            }
        postDataAndReturnResposeJson(sendDatas,url)
        .then((results)=>{
            console.log(results)
            setResults(results)})
    }
    
    const pasteToTable = (e: React.ChangeEvent<HTMLTextAreaElement>) => {
        if(caseNotTable(e.target.value,sqlType)){
            return
        }
        const rows = e.target.value.split("\n")
        const cloneClass = new CloneClass(multiLineCells)
        if(sqlType === "insert"){
            rows.map((row,i)=>{
                if(i!==0){
                    cloneClass.makeClone(row)
                }
            })
        }else{
            rows.map((row,i)=>{
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
            let newRow:OneLineCells = initState
            if(sqlType === "insert"){
                constColumns.map((column)=>{
                newRow[column] = ""
                })
            }
            setMultiLineCells([...multiLineCells,newRow])
        }
    }
    const resetAndChangeUI = () => {
        setIsArea(true)
        setMultiLineCells([initState])
    }
    const cellChildren = (value:string,index:number,column:string) => {
        switch(column){
            case "IsPrimary":
                return(
                    <>
                        {multiLineCells[index][column] === "PRIMARY" ? (
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
                        }
                    </>
                )
            case "Option":
                return(
                    <SSelect onChange={(e)=>handleChange(e,index,column)}>
                        <SOption defaultValue=""></SOption>
                        <SOption value="AUTO INCREMENT">AUTO INCREMENT</SOption>
                        <SOption value="DEFAULT CURRENT_TIMESTAMP">DEFAULT CURRENT_TIMESTAMP</SOption>
                        <SOption value="DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP">DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP</SOption>
                    </SSelect>
                )
            case "IsNull":
                return(
                    <SSelect onChange={(e)=>handleChange(e,index,column)}>
                            <SOption defaultValue="NULL" >Null</SOption>
                            <SOption value="NOT NULL" >NOT NULL</SOption>
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
                    value={textarea}/>
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
                    children={"RESET"}/>
            </ResetButtonContener>
            <TableContener>
                <Table
                columns={constColumns}
                rows={multiLineCells}
                cellElements={cellChildren}
                headerKey={`header${sqlType}`}
                bodyKey={`body${sqlType}`}
                tableKey={`table${sqlType}`}/> 
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
                    children={"EXECUTE"}/>
                <Button onClick={addRows}
                    backgroundColor={"#e73562"}
                    borderColor={"#942343"}
                    bottomColor={"#941f57"}
                    width={120}
                    height={50}
                    fontSize={30}
                    children={"ADD"}/>
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