import {TextareaToSQL} from "../molecules/TextareaToSQL"
import {VFC} from "react"
const url = "copyToCreate"
const constColumns = ["DataName","DataType","IsPrimary","Option","IsNull"]

type Props = {
    multiLineCells:{[key: string]: string;}[]
    setMultiLineCells:React.Dispatch<React.SetStateAction<{
        [key: string]: string;
    }[]>>
    columns:string[]
    setColumns: React.Dispatch<React.SetStateAction<string[]>>
}

export const TextareaCreateProps:VFC<Props> = (props) =>{
    const {multiLineCells,setMultiLineCells,columns,setColumns} = props
    type OneLineCells = {[key:string]:string}
    class MultiLineCellsClone {
        clone:OneLineCells[]
        constructor(multiLineCells:OneLineCells[],_:string){
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
        setMultiLineCells={setMultiLineCells}
        multiLineCells={multiLineCells}
        columns={columns}
        setColumns={setColumns}
        url={url}
        initColumns={constColumns}
        initState={initLine}
        CloneClass={MultiLineCellsClone}
        sqlType={"create"}
        ></TextareaToSQL>
    )
}
