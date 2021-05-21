

const url = "copyToCreate"
const constColumns = ["DataName","DataType","IsPrimary","Option","IsNull"]

export class TableDatas{
    
}



export const TextareaCreateProps = () =>{
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
    // return (
    //     <TextareaToSQL
    //     url={url}
    //     initColumns={constColumns}
    //     initState={initLine}
    //     CloneClass={MultiLineCellsClone}
    //     sqlType={"create"}
    //     ></TextareaToSQL>
    // )
}
