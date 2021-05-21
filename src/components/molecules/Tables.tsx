import {Table} from "../atoms/Table"
import {Table as TableEditer} from "../atoms/TableEditer"
import styled from "styled-components"
import {VFC} from "react"


type makeElement = (value:string,rowIndex:number,column:string)=>JSX.Element
type Props = {
    clone:{[key: string]: string;}[]
    columns:string[]
    editerRows:string[][]
    editerColumns:string[]
    cellElements?:makeElement
}

export const Tables:VFC<Props> = (props) => {
    const {clone,columns,editerRows,cellElements,editerColumns} = props
    return (
        <Contener>
           <Table
                rows={clone}
                columns={columns}
                headerKey={"Insert"}
                tableKey={"Insert"}
                bodyKey={"Insert"}
                cellElements={cellElements}
                />
            <TableEditer
                rows={editerRows}
                columns={editerColumns}
                headerKey={"Select"}
                tableKey={"Select"}
                bodyKey={"Select"}
                />
        </Contener>
    )
}

const Contener = styled.div`

`