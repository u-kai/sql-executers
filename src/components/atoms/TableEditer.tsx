import styled from "styled-components"
import {VFC} from "react"

type makeElement = (value:string,rowIndex:number,valueIndex:number)=>JSX.Element

type Props = {
    columns:string[]
    rows:string[][]
    tableKey:string
    headerKey:string
    bodyKey:string
    cellElements?:makeElement//string//tyuui
}
export const Table:VFC<Props> = (props)=>{
    const {columns,rows,headerKey,bodyKey,tableKey,cellElements} = props
    return(
        <STable key={`Table${tableKey}`}>
            <STHeader key={`${headerKey}THeader`}>
                <STr key={`tr${headerKey}THeader`}>
                    {columns.map((column,index)=>(
                        <STh key={`th${column}${headerKey}${index}`}>
                            {column}
                        </STh>
                            )
                        )
                    }
                </STr>
            </STHeader>
            <STBody key={`${bodyKey}TBody`}>
                {rows.map((row,rowIndex)=>(
                    <STr key={`tr${bodyKey}TBody${rowIndex}`}>
                        {row.map((value,index)=>(
                            <STh key={`th${bodyKey}${index}`}>
                                {cellElements ? (
                                    cellElements(value,rowIndex,index)
                                ):(<TableSpan>
                                 {value} 
                                 </TableSpan>  
                                ) }
                            </STh>
                                )
                            )
                        }
                    </STr>
                        )
                    )
                }
            </STBody>
        </STable >
    )
}


const STable = styled.table`
top:300px;
border-collapse:  collapse;
background-color:transparent;
width:  30px;         
table-layout: fixed; 
`

const TableSpan = styled.span`
font-weight:normal;
`
const STr = styled.tr`
border:solid black 2px;
background-color:transparent;
overflow:auto;
height:30px;

`

const STh = styled.th`
border:solid black 2px;
background-color:transparent;
overflow:auto;
width:110px;
height:30px;
`
const STHeader = styled.thead`
background-color:#ff0066;
`
const STBody = styled.tbody`

`