
import {SQLTableData} from "../TableClass.ts/SQL"
type OneLineCells = {[key:string]:string}
let url = "copyToCreate"
let constColumns = ["DataName","DataType","IsPrimary","Option","IsNull"]
let initLine:OneLineCells = {
    DataName:"",
    DataType:"",
    IsPrimary:"",
    Option:"",
    IsNull:"NULL"
} 
let sqlType = "create"

export const createCellElements = ""
export const create = new SQLTableData(url=url,constColumns=constColumns,sqlType=sqlType,initLine=initLine)
export class CreateClone {
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



