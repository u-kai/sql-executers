type OneLineCells = {[key:string]:string}
export  class SQLTableData{
    url:string
    constColumns:string[]
    sqlType:string
    initLine?:OneLineCells
    constructor(url:string,constColumns:string[],sqlType:string,initLine?:OneLineCells){
        this.url = url
        this.constColumns = constColumns
        this.sqlType = sqlType
        this.initLine = initLine
    }
}