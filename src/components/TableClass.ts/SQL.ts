export default class SQLTableData{
    url:string
    constColumns:string[]
    sqlType:string
    constructor(url:string,constColumns:string[],sqlType:string){
        this.url = url
        this.constColumns = constColumns
        this.sqlType = sqlType
    }

}