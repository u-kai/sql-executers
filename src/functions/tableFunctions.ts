export const  makeRequest = (bodyData:Object):RequestInit=>{
    return {
            method:"POST",
            mode:"cors",
            headers:{"Content-Type":"application/json"},
            body:JSON.stringify(bodyData)
        }
    }
export const postDataAndReturnResposeJson = (sendDatas:Object,url:string) => {
    console.log(url)
    return fetch(`http://127.0.0.1:8000/${url}`,makeRequest(sendDatas)).then((res)=>res.json())
}

type CreateOrInsert = "create" | "insert"
export const caseNotTable = (copyTable:string,condition:CreateOrInsert) => {
    const joinRowCells = copyTable.split("\n")
    if(condition === "create"){
        const not2Dimensions = joinRowCells.filter((cell)=>cell.split("\t").length < 2)
        if(joinRowCells.length===not2Dimensions.length){
            alert("テーブルを挿入してくだい")
            return true
        }
    }else if(condition === "insert"){
        if(joinRowCells.length < 2){
            alert("2行以上挿入してくだい")
            return true
        }
    }
    return false
}