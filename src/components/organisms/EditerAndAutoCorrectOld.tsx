import {useEffect,useState} from "react"
import {ChangeColorRegDatas} from "../../datas/Datas"
import {Contener,ContenerStyle} from "../atoms/Contener"
import {Input} from "../atoms/Input"
import {Label} from "../atoms/Label"
import {CopyBox} from "../atoms/CopyBox"
import {CopySpan} from "../atoms/CopySpan"
import {TailSpan} from "../atoms/TailSpan"
import {AutoCorrectBox} from "../atoms/AutoCorrectBox"
import {AutoCorrect} from "../atoms/AutoCorrect"
import {caseDisplayAutoCorrectsHandleKeyDown} from "../../functions/onKeyDown/caseDisplayAutoCorrectsHandleKeyDown"
import {caseNotDisplayAutoCorrectsHandleKeyDown} from "../../functions/onKeyDown/caseNotDisplayAutoCorrectsHandleKeyDown"
import {Button} from "../atoms/Button"
import { Table } from "../atoms/TableEditer"
import styled from "styled-components"
import {ErrorType} from "../../types/ErrorType"
import {ResultsType} from "../../types/ResultsType"


export const EditerAndAutoCorrect = ()=>{
    const [position,setPosition] = useState({x:0,y:0})
    const [chars, setChars] = useState<string[]>([""])
    const [colorList, setColorList] = useState<[string[]]>([[]])
    const [copyStr, setCopyStr] = useState<[string[]]>([[]])
    const [autoCorrects, setAutoCorrect] = useState<string[]>([])
    const [isDisplayAutoCorrects, setIsDisplayAutoCorrects] = useState(false)
    const [autoCorrectsIndex,setAutoCorrectsIndex] = useState(0)
    const [focusRowIndex,setFocusIndex] = useState(0)
    const [columns, setColumns] = useState<string[][]>([[]])
    const [values, setValues] = useState<string[][][]>([[[]]])
    const [resultsInfo,setResultsInfo] = useState<string[]>([])
    const [rowPositin, setRowPosition] = useState<number[]>([])
    const [labelPosition, setLabelPosition] = useState(0)
    const [errors, setErrors] = useState<string[]>([])


    const focusElement =(id:string):void=>{
        const focusElement = document.getElementById(id)
        if(focusElement){
            focusElement.focus()
        }else{
            console.log("not found")
        }
    }
    console.log(isDisplayAutoCorrects)
    // console.log("chars:",chars)
    // console.log("colorList:",colorList)
    // console.log("copyStr:",copyStr)
    // console.log("focusRowIndex:",focusRowIndex)
    const changeString = (newChar:string)=>{
        // console.log(newChar)
        let charsClone = chars
        charsClone[focusRowIndex] = newChar
        setChars(charsClone)
        const strList = newChar.split(" ")
        let copyStrClone = copyStr
        copyStrClone[focusRowIndex] = strList
        setCopyStr(copyStrClone)
        let colorListClone = colorList
        colorListClone[focusRowIndex] = []
        setIsDisplayAutoCorrects(false)
        setAutoCorrectsIndex(0)
        strList.map((str,i)=>{
            let isRed = false
            for (let key in ChangeColorRegDatas){
                const index = str.length - 1
                if(ChangeColorRegDatas[key][index]===undefined){
                    continue
                }
                if(key === str || key.toLocaleLowerCase() === str){
                    colorListClone[focusRowIndex].push("red")
                    isRed = true
                    break
                }
            }
            if(!isRed){
                colorListClone[focusRowIndex].push("black")
            }
        })
        setColorList(colorListClone)
        
    }

    const sortAutoCorrect = (testStr:string)=>{
        let keyList:string[] = []
        let primaryList:string[] = []
        let noPrimaryList:string[] = []
        const index = testStr.length - 1
        for(let key in ChangeColorRegDatas){
            if(ChangeColorRegDatas[key][index]===undefined){
                continue
            }
            const pattern:RegExp = ChangeColorRegDatas[key][index]
            if(pattern.test(testStr)){
                keyList.push(key)
                setIsDisplayAutoCorrects(true)
            }
        }
        const reg = new RegExp(testStr.replace(/[.*+?^${}()|[\]\\]/g, '\\$&'), "i")
        keyList.map((key:string)=>{
            if(reg.test(key)){
                primaryList.push(key)
            }else{
                noPrimaryList.push(key)
            }
        })
        setAutoCorrect((primaryList.concat(noPrimaryList)))
    }

    const handleChanges = (e:React.ChangeEvent<HTMLInputElement>)=>{
        const newChar = e.target.value
        changeString(newChar)
        const strList = newChar.split(" ")
        const lastStr = strList[strList.length - 1]
        sortAutoCorrect(lastStr)
     }

    const handleClick = (e:React.MouseEvent<HTMLSpanElement, MouseEvent>)=>{
        if(e.currentTarget.textContent !== null){
            const changeStr = e.currentTarget.textContent.replace("\n","")
            const currentStrList = chars[focusRowIndex].split(" ")
            const removeMatchChar = currentStrList[currentStrList.length-1]
            changeString(chars[focusRowIndex].slice(0,(chars[focusRowIndex].length - removeMatchChar.length)) + changeStr)
        }
        focusElement(focusRowIndex.toString())
    }
    
    const handleMouseDown = (e:React.MouseEvent<HTMLSpanElement>)=>{
        const hoverId = e.currentTarget.id    
        setAutoCorrectsIndex(parseInt(hoverId.replace("hover","")))
    }

    
    const handleKey = (e:React.KeyboardEvent<HTMLInputElement>)=>{
        if(isDisplayAutoCorrects){
            const props = {
                e:e,
                setIsDisplayAutoCorrects:setIsDisplayAutoCorrects,
                autoCorrects:autoCorrects,
                char:chars[focusRowIndex],
                changeString:changeString,
                autoCorrectsIndex:autoCorrectsIndex,
                setAutoCorrectsIndex:setAutoCorrectsIndex
            }
            caseDisplayAutoCorrectsHandleKeyDown(props)
        }else{
            const props = {
                e:e,
                focusRowIndex:focusRowIndex,
                copyStr:copyStr,
                colorList:colorList,
                chars:chars,
                setCopyStr:setCopyStr,
                setFocusIndex:setFocusIndex,
                setColorList:setColorList,
                setChars:setChars
            }
            caseNotDisplayAutoCorrectsHandleKeyDown(props)

        }
    }

    const moveFocus =((e: React.MouseEvent<HTMLInputElement, MouseEvent>)=>{
        focusElement(e.currentTarget.id)
        setFocusIndex(Number(e.currentTarget.id))
    })

    useEffect(()=>{
        const span = document.getElementById(`tailPositioning${focusRowIndex}`)
        if(span){
            console.log("page",window.pageYOffset)
            console.log("tail",span.getBoundingClientRect().top)
            const distx = window.pageXOffset + (span.getBoundingClientRect().right)
            const disty = window.pageYOffset + (span.getBoundingClientRect().top) -220//oukyuusyoti
            setPosition({x:distx,y:disty})
        }
    },[copyStr[focusRowIndex]])
    
    useEffect(()=>{
        if(focusRowIndex<=rowPositin.length-1){
            return 
        }
        const editerContenerHeight = 300
        const rowHeight = 40
        const scroll = document.getElementById("contener")
        const input = document.getElementById(`${focusRowIndex}`)
        let cloneRowPosition = rowPositin
        if(input && scroll){
            if(editerContenerHeight>input.getBoundingClientRect().top){
                cloneRowPosition.push(input.getBoundingClientRect().top)
            }else{
                cloneRowPosition.push(scroll.scrollHeight - rowHeight)
            }
            setRowPosition(cloneRowPosition)
        }
    },[copyStr.length])

    useEffect(()=>{
        focusElement(focusRowIndex.toString())
        const scroll = document.getElementById("contener")
        const input = document.getElementById(`${focusRowIndex}`)
        if(scroll && input){
            let disty = rowPositin[focusRowIndex]
            scroll.scroll(-2000,disty)
        }
    },[focusRowIndex])

    const onClick = ()=>{
        let sendStrs = chars.join(" ")
        if(sendStrs[sendStrs.length-1]===";"){
            sendStrs = sendStrs.substr(0,sendStrs.length-1)
        }
        let querys = sendStrs.split(";")
        fetch("http://127.0.0.1:8000/editerhandler",{
        method:"POST",
        mode:"cors",
        headers:{
            "Content-Type":"application/json"
        },
        body:JSON.stringify(
            {querys:querys}
        )
        })
        .then((res)=> res.json())
        .then((data)=>{
            if(data["select"].length !== 0){
                console.log(data["select"])
                const results = new Map<string,Object[]>(Object.entries(data["select"]))
                let cloneColumns:string[][] = []
                let cloneValues:string[][][] = []
                let valuesBuff:string[][]= []
                results.forEach((result)=>{
                    const columnsList = Object.keys(result[0])
                    cloneColumns.push(columnsList)
                    result.map((value)=>{
                        const dataValuse:string[] = Object.values(value)
                        valuesBuff.push(dataValuse)
                    })
                    cloneValues.push(valuesBuff)
                    valuesBuff=[]
                })
                setValues(cloneValues)
                setColumns(cloneColumns)
            }
            let infoList:string[] = []
            if(data["otherList"].length !== 0){
                const otherList:ResultsType[] = data["otherList"]
                otherList.map((result)=>{
                    infoList.push(`fieldCount:${result.fieldCount}\n
                    affectedRows:${result.affectedRows}\n
                    insertId:${result.insertId}\n
                    info:${result.info}\n
                    serverStatus:${result.serverStatus}\n
                    warningStatus:${result.warningStatus}\n`)
                })
                
            }
            setResultsInfo(infoList)
            
            let errorMessageList:string[] =[]
            if(data["error"].length !== 0){
                const postErrors:ErrorType[] = data["error"]
                postErrors.map((error)=>{
                    errorMessageList.push(error["message"])
                })
            }
                setErrors(errorMessageList)
        }
    )
}

const saveTextToFile = ()=>{
    const blob = new Blob([chars.join("\n")],{type:"text/plain"})
    const url = URL.createObjectURL(blob)
    const a = document.createElement("a")
    a.download = "fileName.sql"
    a.href = url
    a.click()
    a.remove()
    URL.revokeObjectURL(url)
}
    const editerContenerStyle:ContenerStyle = {
        width:"100%",
        height:"300px",
        overflow:"auto",
        flexWrap:"nowrap",
        position:"relative",
        display:"flex"
    }
    const tableContenerStyle:ContenerStyle ={
        width:"700px",
        overflow:"scroll",
        marginBottom:"10px",
    }
    const resultsContenerStyle:ContenerStyle = {
        width:"700px",
        height:"100%",
        overflow:"scroll",
        marginBottom:"10px",
        gridRow:"2/5",
        gridColumn:"2/3",
        paddingLeft:"30px",
    }

    const contenerStyle:ContenerStyle = {
        // // overflow:"auto",
        // position:"relative",
        display:"flex",
        flexWrap:"nowrap",
    }
    const superContenerStyle:ContenerStyle = {
        position:"absolute",
        display:"grid",
        width:"100%",
        height:"100%",
        gridTemplateColumns:"50% 50%",
        gridTemplateRows:"15% 15% 50% 5% 15%",
    }
    const headerContenrStyle:ContenerStyle ={
        gridRow:"1/2",
        gridColumn:"1/3",
        backgroundColor:"red"
    }
    const readFileAndDisplyaContenerStyle:ContenerStyle ={
        gridRow:"2/3",
        gridColumn:"1/2",
        backgroundColor:"blue"

    }
    const editerAndAutoCorrectContererStyle:ContenerStyle={
        gridRow:"3/4",
        gridColumn:"1/2",
        width:"100%",
        overflow:"auto",
        position:"absolute"
    }
    const executeButtonContenerStyle:ContenerStyle={
        gridRow:"4/5",
        gridColumn:"1/2"
    }
    const footerContenerStyle:ContenerStyle={
        gridRow:"5/6",
        gridColumn:"1/3",
        paddingTop:"40px",
        backgroundColor:"yellow"
    }

    const testMove = () =>{

    }
    return (
        <Contener
            contenerStyle={superContenerStyle}>
            <Contener
                contenerStyle={headerContenrStyle}
                children={"this is header"}
            />
            <Contener
                contenerStyle={readFileAndDisplyaContenerStyle}
                children={"this is RFADC"}
            />
            <Contener
                contenerStyle={editerAndAutoCorrectContererStyle}
                children={
                    <Contener
                        contenerStyle={contenerStyle}>
                        <Contener
                            id={"contener"}
                            onScroll={(e)=>setLabelPosition(e.currentTarget.scrollLeft)}
                            contenerStyle={editerContenerStyle}
                            children={
                                <Contener
                                    children={
                                            <Contener
                                            contenerStyle={{position:"absolute"}}>
                                                {isDisplayAutoCorrects ? 
                                                    (<AutoCorrectBox id="AutoCorrectsBox" posi={position}>
                                                        {autoCorrects.map((value,i)=>(
                                                            <AutoCorrect 
                                                            opacity={i===autoCorrectsIndex ? 0.3 : 1}
                                                            color={i===autoCorrectsIndex ? "yellow":"white"}
                                                            id={`hover${i}`} 
                                                            handleClick={handleClick} 
                                                            handleMouseDown={handleMouseDown} 
                                                            key={`autoCorrect${i}`}>
                                                                {value + "\n"}
                                                            </AutoCorrect>
                                                        ))}
                                                    </AutoCorrectBox>):(null)}
                                                {copyStr.map((rowStr,rowNumber)=>(
                                                    <Contener
                                                    key={`copyStrContener${rowNumber}`}
                                                    contenerStyle={contenerStyle}
                                                    children={
                                                        <>
                                                        <Label 
                                                        id={`label${rowNumber}`}
                                                        textContent={`${rowNumber.toString()}:`}
                                                        htmlFor={rowNumber.toString()} 
                                                        key={`label${rowNumber.toString()}`}
                                                        width={30}
                                                        position={labelPosition}
                                                        />
                                                        <Contener
                                                        key={`inputContener${rowNumber}`}
                                                        children={
                                                            <>
                                                                <Input
                                                                id={rowNumber.toString()}
                                                                // overflow="auto"
                                                                type="text"
                                                                autoComplete="off"
                                                                
                                                                // width={"10px"}
                                                                value={chars[rowNumber]}
                                                                handleKeyDown={handleKey}
                                                                handleChange={handleChanges}
                                                                onClick={moveFocus}
                                                                key={`input${rowNumber}`}/>
                                                                <CopyBox 
                                                                id="copy"
                                                                key={`copyBox${rowNumber}`}
                                                                fontSize={20}
                                                                overflow="auto">
                                                                    {colorList[rowNumber].map((color,i)=>(
                                                                        <CopySpan 
                                                                        id={`copy${i.toString()}`}
                                                                        color={color} 
                                                                        key={`copySpan${i}`}
                                                                        children={copyStr[rowNumber][i]}
                                                                        ></CopySpan>
                                                                        ))}
                                                                    <TailSpan 
                                                                    id={`tailPositioning${rowNumber}`}
                                                                    key={`tailSpan${rowNumber}`}
                                                                    fontSize={20}
                                                                    color={"taransparent"}
                                                                    children={""}></TailSpan>
                                                                </CopyBox>
                                                                </>
                                                                }></Contener>
                                            
                                                        </>}/>
                                                    ))}
                                            </Contener>}
                                    />}
                
                />
                </Contener>}/>
                                                                
                <Contener
                contenerStyle={resultsContenerStyle}
                id={"tableContener"}
                children={
                <>
                    <h3>INFO RESULT</h3>
                    {resultsInfo.map((result,i)=>(
                        <div
                        color={"black"}
                        key={`${result}${i}`}
                        >{result}</div>
                    ))}
                    <Button
                    onClick={onClick}></Button>

                    <h3>TABLE RESULT</h3>
                    {columns.map((column,i)=>(
                        <Contener
                        id="tableContener"
                        key={`tableConter${i}`}
                        contenerStyle={tableContenerStyle}
                        children={
                        <Table
                        key={`table${i}`}
                        tableKey={i.toString()}
                        headerKey={i.toString()}
                        bodyKey={i.toString()}
                        columns={column}
                        rows={values[i]}/>
                        }/> ))}
                    <h3>ERROR</h3>
                    {errors.map((error,i)=>(
                        <SError 
                        key={`${i}${error}`}
                        >{error}</SError>
                    ))}
                        </>}
                        />
                
                <Contener
                contenerStyle={executeButtonContenerStyle}>
                    {/* <Button
                        onClick={onClick}/>
                    <Button onClick={testMove}/> */}

                    {/* <Button
                    onClick={saveTextToFile}
                    children={"SAVE"}
                    ></Button> */}
                </Contener>
                <Contener
                contenerStyle={footerContenerStyle}
                children={"this is footer"}
                />
        </Contener>
                
    )
}

const SError = styled.p`
color:red;
`

const STest = styled.div`
// display:flex;
// justify-content:row;
`
