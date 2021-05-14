import styled from "styled-components"
import { Button } from "../atoms/Button"
import {useState} from "react"
import {Table} from "../atoms/Table"

const makeRequest = (bodyData:Object):RequestInit=>{
    return {
            method:"POST",
            mode:"cors",
            headers:{"Content-Type":"application/json"},
            body:JSON.stringify(bodyData)
        }
    }
const url = "copyToCreate"

export const TextareaCreate = ()=>{
    const sendDataAndSetResults = ()=>{
        const sendDatas = {
                tableName:tableName,
                dataTypes:dataType,
                isPrimary:isPrimary,
                columns:columns,
                options:options
            }
        fetch(`http://127.0.0.1:8000/${url}`,makeRequest(sendDatas))
        .then((res)=>res.json())
        .then((results)=>setResults(results))
    }
    type Results = {results:string}
    type IsNull = "NOT NULL" | "NULL"
    const constColumns = ["DataName","DataType","IsPrimary","Option","IsNull"]
    const [columns,setColumns] = useState<string[]>(constColumns)
    const [valueDatas, setValueDatas] = useState<string[][]>([["","","","",""]])
    const [tableName,setTableName] = useState("") 
    const [isArea, setIsArea] = useState(true)
    const [dataType, setDataType] = useState<string[]>([])
    const [isPrimary,setIsPrimary] = useState<string[]>(["PRIMARY"])
    const [isNull,setIsNull] = useState<IsNull[]>([])
    const [options, setOptions] = useState<string[]>([])
    const [results, setResults] = useState<Results>()
    console.log(results)
    const onChange = (e: React.ChangeEvent<HTMLTextAreaElement>)=>{
        const splitn = e.target.value.split("\n")
        if(splitn.length<4 && valueDatas.length<2){
            const clone = [...valueDatas]
        }
        const primary:string[] = []
        const types:string[] = []
        const columns:string[] = []
        const isNull:IsNull[] = []
        const values:string[][] = []
        splitn.map((row,i)=>{
            const splitTab = row.split("\t")
            values.push([...splitTab,"","","NULL"])
            primary.push("")
            isNull.push("NULL")
            columns.push(splitTab[0])
            types.push(splitTab[1])
        })
        console.log(values)
        setIsArea(false)
        setValueDatas(values)
        setDataType(types)
        setIsPrimary(primary)
        setIsNull(isNull)
        setColumns(constColumns)
    }
    
    const pushPrimary = (columnIndex:number)=>{
        const clone = [...isPrimary]
        clone[columnIndex] = "PRIMARY"
        setColumns([...isPrimary])
        console.log(isPrimary)
        console.log("select")
    }
    const addRows = ()=>{
        if(valueDatas[0][0]!==""){
            const empty:string[] =[]
            for(let i=0;i<columns.length;i++){
                empty.push("")
            }
            setValueDatas([...valueDatas,empty])
        }else{
            alert("Plase Input One Line")
        }
    }
    const handleChangeValues = (e: React.ChangeEvent<HTMLInputElement>,i:number,j:number)=>{
        const value = e.target.value
        const clone = [...valueDatas]
        clone[i][j] = value
        console.log(clone)
        setValueDatas(clone)     
    }

    const changeUI = ()=> {
        setIsArea(true)
        setValueDatas([["","","","",""]])
        
    }
    const handleChangeNull = (i:number)=>{
        const clone = [...isNull]
        clone[i] = "NULL"
        setIsNull(clone)
    }
    const handleChangeNotNull = (i:number)=>{
        const clone = [...isNull]
        clone[i] = "NOT NULL"
        setIsNull(clone)
    }
    
    const cellChildren = (values:string,i:number,j:number)=>{
        switch(j){
            case 2:
                return(
                    // <SSelect>
                    <>
                        {isPrimary[i] === "PRIMARY" ? (
                        <SSelect>
                            <SOption></SOption>
                            <SOption selected onChange={(e)=>pushPrimary(i)} value={"ps"}>Primary</SOption>
                        </SSelect>
                        ):(
                        <SSelect onChange={(e)=>console.log(e)}>
                            <SOption selected onChange={(e)=>console.log(e)}></SOption>
                            <SOption onChange={(e)=>console.log(e)} value={"p"}>Primary</SOption>
                        </SSelect>
                        )}
                        {/* <SOption selected></SOption>
                        <SOption onChange={(_)=>pushPrimary(j)} value={"p"}>Primary</SOption> */}
                    {/* // </SSelect> */}
                    </>
                )

            case 3:
                return(
                    <SSelect>
                        <SOption></SOption>
                        <SOption>AUTO INCREMENT</SOption>
                        <SOption>DEFAULT CURRENT_TIMESTAMP</SOption>
                        <SOption>DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP</SOption>
                    </SSelect>
                )
            
            case 4:
                return(
                    <SSelect>
                            <SOption value="NULL" onChange={(_)=>handleChangeNull(i)}>Null</SOption>
                            <SOption value="NOT NULL" onChange={(_)=>handleChangeNotNull(i)}>NOT NULL</SOption>
                    </SSelect>
                )
            default:
                return(
                        <TableTextArea
                        spellCheck="false"
                        value={values}
                        onChange={(e)=>handleChangeValues(e,i,j)}/>
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
            onChange={onChange}
            ></STextArea>
        </TextareaContener>) : (null)}
        {/* <TestConte> */}
        <div>
        <Table
        columns={columns}
        rows={valueDatas}
        headerKey={"testhed"}
        bodyKey={"testbody"}
        tableKey={"tabless"}
        cellElements={cellChildren}
        />
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

