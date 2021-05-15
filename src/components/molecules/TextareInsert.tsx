// import styled from "styled-components"
// import { Button } from "../atoms/Button"
// import {useEffect, useState} from "react"
// // import { Contener } from "./Contener"
// // import { Input } from "../atoms/Input"
// // import {TextareaAndTable} from "./TextAreaAndTable"
// import { Table } from "../atoms/Table"
// // import {InputAndCopyBoxStyle} from "../../commonStyles/AutoCorrectStyles"

// export const TextareaInsert = ()=>{

//     const onClick = ()=>{
//         const sendDatas = {
//                 tableName:tableName,
//                 columns:columns,
//                 valueDatas:valueDatas,
//             }
//         console.log("before",sendDatas)
//         fetch("http://127.0.0.1:8000/copyToInsert",{
//             method:"POST",
//             mode:"cors",
//             headers:{
//                 "Content-Type":"application/json"
//             },
//             body:JSON.stringify(sendDatas)
//         }).then((res)=>res.json())
//         .then((data)=>console.log(data))
//     }

//     type ColumnValue = {[key:string]:string}
//     const [columnsValues,setColumnsValues] = useState<ColumnValue[]>([])
//     const [columns,setColumns] = useState<string[]>([])
//     const [valueDatas, setValueDatas] = useState<string[][]>([[]])
//     const [tableName,setTableName] = useState("") 
//     const [isArea, setIsArea] = useState(true)
//     const pasteToTable = (e: React.ChangeEvent<HTMLTextAreaElement>)=>{
//         const split = e.target.value.split("\n")
//         let datas:[string[]] = [[]]
//         split.map((value,i)=>{
//             if(i===0){
//                 datas.pop()
//                 setColumns(value.split("\t"))
//             }else{
//                 datas.push(value.split("\t"))
//             }
//         })
//         setValueDatas(datas)
//         console.log(datas)
//         datas.map((data)=>{
//             console.log(data)
//             data.map((d)=>{
//                 console.log(d)
//             })
//         })
//         setIsArea(false)
//     }
//     const addRows = ()=>{
//         if(!isArea){
//             let empty:string[] =[]
//             for(let i=0;i<columns.length;i++){
//                 empty.push("")
//             }
//             setValueDatas([...valueDatas,empty])
//         }
//     }
//     const handleChangeValues = (e: React.ChangeEvent<HTMLInputElement>,i:number,column:string)=>{
//         // const value = e.target.value
//         // console.log(e.target.value)
//         // const clone = [...valueDatas]
//         // clone[i][j] = value
//         // console.log(clone)
//         // setValueDatas(clone)      
//     }
//     const handleChangeColumns = (e: React.ChangeEvent<HTMLInputElement>,i:number)=>{
//         const column = e.target.value
//         const clone = [...columns]
//         clone[i] = column
//         setColumns(clone)
//     }
//     const changeUI = ()=> {
//         setIsArea(true)
//         setColumns([])
//         setValueDatas([])
//     }
//     const cellChildren = (value:string,i:number,column:string)=>{
//         return(
//                 <TableTextArea
//                     spellCheck="false"
//                     value={value}
//                     onChange={(e)=>handleChangeValues(e,i,column)}/>
//         )
//     }

//     return(
//         <>
//         <TextareaAndTableContener>
//         {isArea ?(
//         <TextareaContener>
//             <STextArea
//             spellCheck="false"
//             id="texts" 
//             onChange={pasteToTable}
//             ></STextArea>
//         </TextareaContener>) : (null)}
//         {/* <TestConte> */}
//         <Table
//         columns={columns}
//         rows={valueDatas}
//         cellElements={cellChildren}
//         tableKey={"taveleel"}
//         headerKey={"nf;alfkd"}
//         bodyKey={"dd"}
//         ></Table>
//         {/* </TestConte> */}
//         </TextareaAndTableContener>
//         <ButtonContener>
//         <Button onClick={onClick}></Button>
//         <Button onClick={changeUI}>Reset</Button>
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
// overflow:auto;
// `

// const STable = styled.table`
// border-collapse:  collapse;
// background-color:transparent;
// width:  30px;               /* 幅指定 */
// table-layout: fixed; 
// // width:400px;
// // height:30px;
// // width:5000px;
// `
// const STr = styled.tr`
// border:solid black 2px;
// background-color:transparent;
// // position:relative;
// overflow:auto;
// // width:30px;
// height:30px;
// // width:10%;
// // height:30px;
// `
// const ColumnTr = styled.tr`
// border:solid black 2px;
// background-color:yellow;
// // position:relative;
// overflow:auto;
// // width:30px;
// height:30px;
// // width:10%;
// // height:30px;
// `

// const STh = styled.th`
// border:solid black 2px;
// background-color:transparent;
// // position:relative;
// overflow:auto;
// width:150px;
// height:30px;
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

export const d = ""