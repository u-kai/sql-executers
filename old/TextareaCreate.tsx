// import styled from "styled-components"
// import { Button } from "../src/components/atoms/Button"
// import {useState} from "react"
// import {Table} from "../src/components/atoms/Table"
// import {postDataAndReturnResposeJson,caseNotTable} from "../src/functions/tableFunctions"
// import {Results} from "../src/types/tableTypes"

// const url = "copyToCreate"
// const constColumns = ["DataName","DataType","IsPrimary","Option","IsNull"]

// export const TextareaCreate = () =>{
    
//     type OneLineCells = {[key:string]:string}
//     type CellChageEvent = React.ChangeEvent<HTMLSelectElement> | React.ChangeEvent<HTMLInputElement>
//     class MultiLineCellsClone {
//         clone:OneLineCells[]
//         constructor(multiLineCells:OneLineCells[]){
//             if(multiLineCells[0].DataName === ""){
//                 this.clone = []
//             }else{
//                 this.clone = multiLineCells
//             }
//         }
//         setOneLineCells(joinRow:string){
//             const nameAndType = joinRow.split("\t")
//             const cells:OneLineCells ={
//                 DataName:nameAndType[0],
//                 DataType:nameAndType[1],
//                 Option:"",
//                 IsPrimary:"",
//                 IsNull:"NULL"
//             }
//             return cells
//         }
//         appendCells(cells:OneLineCells){
//             this.clone = [...this.clone,cells]
//         }
//         makeClone(joinRow:string){
//             const cells = this.setOneLineCells(joinRow)
//             this.appendCells(cells)
//         }
//     }
//     const initLine:OneLineCells = {
//         DataName:"",
//         DataType:"",
//         IsPrimary:"",
//         Option:"",
//         IsNull:"NULL"
//     } 
//     const [tableName,setTableName] = useState("") 
//     const [isArea, setIsArea] = useState(true)
//     const [results, setResults] = useState<Results>()
//     const [multiLineCells,setMultiLineCells] = useState<OneLineCells[]>([initLine])
//     const [textarea,setTextarea] = useState("")
    
//     const sendDataAndSetResults = () => {
//         const sendDatas = {
//                 tableName:tableName,
//                 multiLineCells:multiLineCells
//             }
//         postDataAndReturnResposeJson(sendDatas,url)
//         .then((results)=>{
//             console.log(results)
//             setResults(results)})
//     }
    
//     const pasteToTable = (e: React.ChangeEvent<HTMLTextAreaElement>) => {
//         if(caseNotTable(e.target.value,"create")){
//             return
//         }
//         const rows = e.target.value.split("\n")
//         const multiLineCellsClone = new MultiLineCellsClone(multiLineCells)
//         rows.map((row)=>{
//             multiLineCellsClone.makeClone(row)
//         })
//         setMultiLineCells(multiLineCellsClone.clone)
//     }
//     const handleChange = (e:CellChageEvent,index:number,column:string) => {
//         const multiLineCellsClone = [...multiLineCells]
//         multiLineCellsClone[index][column] = e.target.value
//         setMultiLineCells(multiLineCellsClone)
//     }
//     const isDataExist = () => {
//         if(multiLineCells[0]["DataName"]===""){
//             alert("1つ目のデータを定義してください")
//             return false
//         }
//         return true
//     }
//     const addRows = () => {
//         if(isDataExist()){
//             setMultiLineCells([...multiLineCells,initLine])
//         }
//     }
//     const resetAndChangeUI = () => {
//         setIsArea(true)
//         setMultiLineCells([initLine])
//     }
//     const cellChildren = (value:string,index:number,column:string) => {
//         switch(column){
//             case "IsPrimary":
//                 return(
//                     <>
//                         {multiLineCells[index][column] === "PRIMARY" ? (
//                             <SSelect onChange={(e)=>handleChange(e,index,column)}>
//                                 <SOption value={""}></SOption>
//                                 <SOption  defaultValue={"PRIMARY"}>PRIMARY</SOption>
//                             </SSelect>
//                             ):
//                             (
//                             <SSelect onChange={(e)=>handleChange(e,index,column)}>
//                                 <SOption defaultValue=""></SOption>
//                                 <SOption value={"PRIMARY"}>PRIMARY</SOption>
//                             </SSelect>
//                             )
//                         }
//                     </>
//                 )
//             case "Option":
//                 return(
//                     <SSelect onChange={(e)=>handleChange(e,index,column)}>
//                         <SOption defaultValue=""></SOption>
//                         <SOption value="AUTO INCREMENT">AUTO INCREMENT</SOption>
//                         <SOption value="DEFAULT CURRENT_TIMESTAMP">DEFAULT CURRENT_TIMESTAMP</SOption>
//                         <SOption value="DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP">DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP</SOption>
//                     </SSelect>
//                 )
//             case "IsNull":
//                 return(
//                     <SSelect onChange={(e)=>handleChange(e,index,column)}>
//                             <SOption defaultValue="NULL" >Null</SOption>
//                             <SOption value="NOT NULL" >NOT NULL</SOption>
//                     </SSelect>
//                 )
//             default:
//                 return(
//                     <TableTextArea
//                         spellCheck="false"
//                         value={value}
//                         onChange={(e)=>handleChange(e,index,column)}/>
//                 )
//             }
//     }

//     return(
//         <>
//         <TextareaAndTableContener>
//         {isArea ?(
//         <TextareaContener>
//             <STextArea
//                 value={textarea}
//                 spellCheck="false"
//                 id="texts" 
//                 onChange={pasteToTable}
//             ></STextArea>
//         </TextareaContener>) : (null)}
//         {/* <TestConte> */}
//         <div>
//         <Table
//         columns={constColumns}
//         rows={multiLineCells}
//         headerKey={"testhedss"}
//         bodyKey={"testbodys"}
//         tableKey={"tablesss"}
//         cellElements={cellChildren}
//         />
//         </div>
//         {/* </TestConte> */}
//         </TextareaAndTableContener>
//         <ButtonContener>
//         <Button onClick={sendDataAndSetResults}></Button>
//         <Button onClick={resetAndChangeUI}>Reset</Button>
//         <Button onClick={addRows}>ADD</Button>
//         </ButtonContener>
//         <input
//         type="text"
//         value={tableName}
//         onChange={(e)=>setTableName(e.target.value)}
//         ></input>
//         </>
//     )
// }

// const ButtonContener = styled.div`
// display:flex;
// justify-content:space-around;
// `
// const SSelect = styled.select`
// width:100%;
// height:100%;
// outline:none;
// border:none;
// `
// const SOption = styled.option`
// width:100%;
// height:100%;
// outline:none;
// border:none;
// `

// const STextArea = styled.textarea`
// width:80%;
// height:200px;
// outline:none;
// color:transparent;
// background-color:transparent;
// border:solid 1px black;
// resize:none;
// `
// const TextareaAndTableContener = styled.div`
// // position:relative;
// width:100%;
// height:300px;
// // display:flex;
// // justify-content:center;
// // align-items:space-around;
// // overflow:auto;
// `


// const InputAndCopyBoxStyle =  
// `
// border-bottom-width:0;
// border-left-width:0;
// border-right-width:0;
// border-top-width:0;
// font-style:normal;
// font-variant:normal;
// font-weight:normal;
// letter-spacing:0px;
// word-spacing:0px;
// line-height:normal;
// padding-bottom:5px;
// padding-left:5px;
// padding-right:5px;
// padding-top:5px;
// text-decoration:none;
// width:100%;
// `
// const TextareaContener = styled.div`
// top:0px;
// left:0px;
// position:absolute;
// width:100%;
// display:flex;
// justify-content:center;
// `
// const TableTextArea = styled.input`
// // resize:none;
// background-color:transparent;
// border:none;
// // z-index:2;
// outline:none;
// width:150px;
// // height:100%;
// // position:absolute;
// // top:2px;
// // left:0px;
// font-size:15px;
// ${InputAndCopyBoxStyle};
// box-sizing: border-box;
// overflow:auto;
// `
export const c = "d"
