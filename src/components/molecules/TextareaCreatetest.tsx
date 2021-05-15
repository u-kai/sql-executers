import styled from "styled-components"
import { Button } from "../atoms/Button"
import {useState} from "react"
import {Tabletest} from "../atoms/Tabletest"
import {Table} from "../atoms/Table"

const url = "copyToCreate/test"
const constColumns = ["DataName","DataType","IsPrimary","Option","IsNull"]
const makeRequest = (bodyData:Object):RequestInit=>{
    return {
            method:"POST",
            mode:"cors",
            headers:{"Content-Type":"application/json"},
            body:JSON.stringify(bodyData)
        }
    }

export const TextareaCreate = () =>{

    const sendDataAndSetResults = () =>{
        const sendDatas = {
                tableName:tableName,
                multiLineCells:multiLineCells
            }
        fetch(`http://127.0.0.1:8000/${url}`,makeRequest(sendDatas))
        .then((res)=>res.json())
        .then((test)=>{console.log(test)
            return test})
        .then((results)=>setResults(results))
    }

    type Results = {results:string}
    type IsNull = "NOT NULL" | "NULL"
    type OneLineCells = {
        [key:string]:string
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
    const [dataType, setDataType] = useState<string[]>([])
    const [isPrimary,setIsPrimary] = useState<string[]>(["PRIMARY"])
    const [isNull,setIsNull] = useState<IsNull[]>([])
    const [options, setOptions] = useState<string[]>([])
    const [results, setResults] = useState<Results>()
    const [multiLineCells,setMultiLineCells] =  useState<OneLineCells[]>([initLine])
    

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

    const caseNotTable = (copyTable:string)=>{
        const joinRowCells = copyTable.split("\n")
        const not2Dimensions = joinRowCells.filter((cell)=>cell.split("\t").length < 2)
        if(joinRowCells.length===not2Dimensions.length){
            alert("テーブルを挿入してくだい")
            return true
        }
        return false
    }

    const pasteToTable = (e: React.ChangeEvent<HTMLTextAreaElement>)=>{
        const copyTable = e.target.value
        if(caseNotTable(copyTable)){
            return
        }
        const rows = copyTable.split("\n")
        const multiLineCellsClone = new MultiLineCellsClone(multiLineCells)
        rows.map((row)=>{
            multiLineCellsClone.makeClone(row)
        })
        setMultiLineCells(multiLineCellsClone.clone)
    }
    
    type CellChageEvent = React.ChangeEvent<HTMLSelectElement> | React.ChangeEvent<HTMLInputElement>

    const handleChange = (e:CellChageEvent,index:number,column:string)=>{
        const multiLineCellsClone = [...multiLineCells]
        multiLineCellsClone[index][column] = e.target.value
        setMultiLineCells(multiLineCellsClone)
    }
    const isDataExist =()=>{
        if(multiLineCells[0]["DataName"]===""){
            alert("1つ目のデータを定義してください")
            return false
        }
        return true
    }
    const addRows = ()=>{
        if(isDataExist()){
            const newRow = initLine
            setMultiLineCells([...multiLineCells,initLine])

        }

        // if(cells[0][0]!==""){
        //     const empty:string[] =[]
        //     for(let i=0;i<constColumns.length;i++){
        //         empty.push("")
        //     }
        //     setCells([...cells,empty])
        // }else{
        //     alert("Plase Input One Line")
        // }
    }
    const changeUI = ()=> {
        // setIsArea(true)
        // setCells([["","","","",""]])
        
    }
   
    
    const cellChildrentest = (values:string,index:number,column:string)=>{
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
                        value={values}
                        onChange={(e)=>handleChange(e,index,column)}/>
                )
        }
    }

    return(
        <>
        <br></br>
        <br></br>
        <br></br>
        <br></br>
        <br></br>
        <br></br>
        <br></br>
        <br></br>
        <br></br>
        <br></br>
        <br></br>
        <br></br>
        <br></br>
        <br></br>
        <br></br>
        <br></br>
        <TextareaAndTableContener>
        {isArea ?(
        <TextareaContener>
            <STextArea
            spellCheck="false"
            id="texts" 
            onChange={pasteToTable}
            ></STextArea>
        </TextareaContener>) : (null)}
        {/* <TestConte> */}
        <div>
        <Tabletest
        columns={constColumns}
        rows={multiLineCells}
        headerKey={"testhedss"}
        bodyKey={"testbodys"}
        tableKey={"tablesss"}
        cellElements={cellChildrentest}
        />
        {/* <Table
        columns={constColumns}
        rows={cells}
        headerKey={"testhed"}
        bodyKey={"testbody"}
        tableKey={"tabless"}
        cellElements={cellChildren}
        /> */}
        </div>
        {/* </TestConte> */}
        </TextareaAndTableContener>
        <ButtonContener>
        <Button onClick={sendDataAndSetResults}></Button>
        <Button onClick={changeUI}>Reset</Button>
        <Button onClick={addRows}>ADD</Button>
        </ButtonContener>
        <input
        type="text"
        value={tableName}
        onChange={(e)=>setTableName(e.target.value)}
        ></input>
        </>
    )
}

const ButtonContener = styled.div`
display:flex;
justify-content:space-around;
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

const STextArea = styled.textarea`
width:80%;
height:200px;
outline:none;
color:transparent;
background-color:transparent;
border:solid 1px black;
resize:none;
`
const TextareaAndTableContener = styled.div`
// position:relative;
width:100%;
height:300px;
// display:flex;
// justify-content:center;
// align-items:space-around;
// overflow:auto;
`

const STable = styled.table`
top:300px;
border-collapse:  collapse;
background-color:transparent;
width:  30px;               /* 幅指定 */
table-layout: fixed; 
// width:400px;
// height:30px;
// width:5000px;
`
const STr = styled.tr`
border:solid black 2px;
background-color:transparent;
// position:relative;
overflow:auto;
// width:30px;
height:30px;
// width:10%;
// height:30px;
`
const ColumnTr = styled.tr`
border:solid black 2px;
background-color:yellow;
// position:relative;
overflow:auto;
// width:30px;
height:30px;
// width:10%;
// height:30px;
`

const STh = styled.th`
border:solid black 2px;
background-color:transparent;
// position:relative;
overflow:auto;
width:150px;
height:30px;
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
const TextareaContener = styled.div`
top:0px;
left:0px;
position:absolute;
width:100%;
display:flex;
justify-content:center;
`
const TableTextArea = styled.input`
// resize:none;
background-color:transparent;
border:none;
// z-index:2;
outline:none;
width:150px;
// height:100%;
// position:absolute;
// top:2px;
// left:0px;
font-size:15px;
${InputAndCopyBoxStyle};
box-sizing: border-box;
overflow:auto;
`

