import styled from "styled-components"
import { Button } from "../atoms/Button"
import {useState} from "react"
import {Table} from "../atoms/Table"
import {postDataAndReturnResposeJson,caseNotTable} from "../../functions/tableFunctions"
import {Results} from "../../types/tableTypes"
import {TextareaToSQL} from "../molecules/TextareaToSQL"

const url = "copyToCreate"
const constColumns = ["DataName","DataType","IsPrimary","Option","IsNull"]

export const TextareaCreateProps = () =>{
    
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
    return (
        <TextareaToSQL
        url={url}
        constColumns={constColumns}
        initState={initLine}
        CloneClass={MultiLineCellsClone}
        sqlType={"create"}
        ></TextareaToSQL>
    )
}
