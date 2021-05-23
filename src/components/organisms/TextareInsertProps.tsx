import {TextareaToSQL} from "./TextareaToSQL"

export const TextareaInsertProps = () => {
    const url = "copyToInsert"
    const constColumns:string[] = []
    type ColumnValue = {[key:string]:string}
    const sqlType = "insert"
    class ColumnValueClone{
        clone:ColumnValue[]
        columns:string[]
        constructor(columnsValues:ColumnValue[],copyDatas:string){
            this.clone = columnsValues
            this.columns = this.setColumns(copyDatas)
        }
        setColumns(copyDatas:string){
            return copyDatas.split("\n")[0].split("\t")
        }
        setOneLineValues(row:string){
            const values = row.split("\t")
            let columnsAndValues:{[key:string]:string}= {}
            this.columns.map((column,i)=>{
                columnsAndValues[column] = values[i]
            })
            return columnsAndValues
        }
        appendColumnValuse(columnsAndValues:{[key:string]:string}){
            this.clone = [...this.clone,columnsAndValues]
        }
        makeClone(row:string){
            const columnsAndValues = this.setOneLineValues(row)
            this.appendColumnValuse(columnsAndValues)
        } 
    }

    return (
        <TextareaToSQL
            url={url}
            initColumns={constColumns}
            sqlType={sqlType}
            CloneClass={ColumnValueClone}/>
    )
}
   