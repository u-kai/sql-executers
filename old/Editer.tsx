import { VFC,useEffect,useState } from "react"
import styled from "styled-components"
import { JsxElement } from "typescript"
import {caseNotDisplayAutoCorrectsHandleKeyDown} from "../src/functions/onKeyDown/caseNotDisplayAutoCorrectsHandleKeyDown"

type Props = {
    children:JSX.Element
}

export const Editer = ()=>{
    const [rows, setRows] = useState([0])
    let m = new Map()
    m.set("0","")
    type focusString = {
        focusId:number[]
        string:string[]
    }
    const [rowString,setRowString] = useState<focusString>({focusId:[0],string:[""]})
    const [focus,setFocus] = useState(0)
    
    // const handleKey =(e:React.KeyboardEvent<HTMLInputElement>)=>{
    //     let clone = rowString
    //     switch(e.key){
    //         case "Enter":
    //             console.log("Enter:rows:",rows)
    //             console.log("focus:",focus)
    //             if(focus<rows[rows.length-1]){
    //                 setFocus(focus+1)
    //                 const focusElement = document.getElementById((focus+1).toString())
    //                 focusElement?.focus()
    //                 break
    //             }
    //             console.log("not if")
    //             const upRow = rows[rows.length-1] + 1
    //             // setRowString(rowString.set(upRow.toString,""))
    //             setRowString(clone)
    //             setRows([...rows,upRow])
    //             setFocus(upRow)
    //           break
    //         case "ArrowUp":
    //             console.log("rows:",rows)
    //             console.log("focus:",focus)
    //             if(focus<=0){
    //                 break
    //             }
    //             setFocus(focus-1)
    //             const focusUp = document.getElementById((focus-1).toString())
    //             focusUp?.focus()
    //           break
    //         case "ArrowDown":
    //             if(focus === rows[rows.length-1]){
    //                 console.log("notDonw:zs",focus)
    //                 break
    //             }
    //             console.log("pressDown:",focus)
    //             setFocus(focus+1)
    //             const focusDown = document.getElementById((focus+1).toString())
    //             focusDown?.focus()
    //             break
    //         case "Backspace":
    //             break
    //         default:
                // console.log("e.key:",e.key)
                // setRowString({focusId:0,string:rowString.string + e.key})
                // if(rowString.string + e.key === "import"){
                    
                //     setFontColor("red")
                // }else{
                //     setFontColor("black")
                // }
                // console.log(rowString.get([focus.toString()])+e.key)
                // rowString.set([focus.toString()],rowString.get([focus.toString()])+e.key)
                // setRowString(rowString)
    //           break

    //         }
    // }

    useEffect(()=>{
        console.log("useEffect")
        console.log(rowString)
        const newInput = document.getElementById(focus.toString())//(`${rows[rows.length-1]}`)
        newInput?.focus()
    },[rows])

    return(
        <>
        {rows.map((value)=>{
            return (
            <SContener key={`div:${value.toString()}`}>
            <label htmlFor={value.toString()} key={`label${value.toString()}`}>{`${value.toString()}:`}</label>
            <input className="editer" style={{backgroundColor:"transparent"}} type="text" id={value.toString()} key={value.toString()} onKeyDown={(e)=>{
                // const props  = {
                //     e:e,
                //     focusRowIndex:focus,
                //     setFocusIndex:setFocus,
                //     rowsList:rows,
                //     setRowsList:setRows
                // }
                // caseNotDisplayAutoCorrectsHandleKeyDown(props)
            }
            }/>
            </SContener>
            )})}
        </>
        )   
}
const SContener = styled.div`
display:flex;
flex-wrap:nowrap;

`