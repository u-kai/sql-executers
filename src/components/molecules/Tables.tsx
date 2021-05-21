import {Table} from "../atoms/Table"
import {Table as TableEditer} from "../atoms/TableEditer"
import styled from "styled-components"
import {VFC} from "react"


type makeElement = (value:string,rowIndex:number,column:string)=>JSX.Element
type Props = {
    multiLineCells:{[key: string]: string;}[]
    setMultiLineCells:React.Dispatch<React.SetStateAction<{
        [key: string]: string;
    }[]>>
    columns:string[]
    editerResults:{[key: string]: string;}[][]
    editerColumns:string[][]
}
type CellChageEvent = React.ChangeEvent<HTMLSelectElement> | React.ChangeEvent<HTMLInputElement>
export const Tables:VFC<Props> = (props) => {
    const {multiLineCells,columns,editerResults,editerColumns,setMultiLineCells} = props
    const handleChange = (e:CellChageEvent,index:number,column:string) => {
        multiLineCells[index][column] = e.target.value
        setMultiLineCells([...multiLineCells])
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
    console.log(multiLineCells)

    return (
        <Contener>
           <Table
                rows={multiLineCells}
                columns={columns}
                headerKey={"Insert"}
                tableKey={"Insert"}
                bodyKey={"Insert"}
                cellElements={cellChildren}
                />
            {editerResults.map((result,i)=>(
                <Table
                    rows={result}
                    columns={editerColumns[i]}
                    headerKey={"select"}
                    tableKey={"select"}
                    bodyKey={"select"}/>
            ))}
        </Contener>
    )
}

const Contener = styled.div`

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
overflow:auto;`
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