export const  makeRequest = (bodyData:Object):RequestInit=>{
    return {
            method:"POST",
            mode:"cors",
            headers:{"Content-Type":"application/json"},
            body:JSON.stringify(bodyData)
        }
    }
export const postDataAndReturnResposeJson = (sendDatas:Object,url:string) => {
    return fetch(`http://127.0.0.1:8000/${url}`,makeRequest(sendDatas)).then((res)=>res.json())
}