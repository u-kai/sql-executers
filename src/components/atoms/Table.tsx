import styled from "styled-components"
import {VFC} from "react"

type makeElement = (value:string,rowIndex:number,columnIndex:number,column:string)=>JSX.Element

type Props = {
    columns:string[]
    rows:{[key:string]:string}[]
    tableKey:string
    headerKey:string
    bodyKey:string
    cellElements?:makeElement
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
                {rows.map((row,rowIndex)=>
                        (
                        <STr key={`tr${bodyKey}TBody${rowIndex}`}>
                            {columns.map((columnType,columnIndex) => 
                                    (
                                    <STh key={`th${bodyKey}${columnIndex}${rowIndex}`}>
                                        {cellElements? cellElements(row[columnType],rowIndex,columnIndex,columnType):(
                                            
                                            `${row[columnType]}`
                                            )}
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
font-weight: normal;
`
const STr = styled.tr`
border:solid black 2px;
background-color:transparent;
overflow:auto;
height:30px;
font-weight: normal;
`

const STh = styled.th`
border:solid black 2px;
background-color:transparent;
overflow:auto;
width:110px;
height:30px;
font-weight: normal;
`
const STHeader = styled.thead`
background-color:#ff0066;
`
const STBody = styled.tbody`
font-weight: normal;
height:300px;
`