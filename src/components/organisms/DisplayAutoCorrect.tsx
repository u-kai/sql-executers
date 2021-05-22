import { useEffect, useState } from "react"
import {ChangeColorRegDatas} from "../../datas/Datas"
import {Contener} from "../atoms/Contener"
import {Input} from "../atoms/Input"
import {CopyBox} from "../atoms/CopyBox"
import {CopySpan} from "../atoms/CopySpan"
import {TailSpan} from "../atoms/TailSpan"
import {AutoCorrectBox} from "../atoms/AutoCorrectBox"
import {AutoCorrect} from "../atoms/AutoCorrect"
import {caseDisplayAutoCorrectsHandleKeyDown} from "../../functions/onKeyDown/caseDisplayAutoCorrectsHandleKeyDown"

export const DisplayAutoCorrect =():JSX.Element=>{
    const [position,setPosition] = useState({x:0,y:0})
    const [char, setChar] = useState("")
    const [colorList, setColorList] = useState<string[]>([])
    const [copyStr, setCopyStr] = useState([""])
    const [autoCorrects, setAutoCorrect] = useState<string[]>([])
    const [isDisplayAutoCorrects, setIsDisplayAutoCorrects] = useState(false)
    const [autoCorrectsIndex,setAutoCorrectsIndex] = useState(0)

    const changeString = (newChar:string)=>{
        newChar.replace("."," ")
        setChar(newChar)
        const strList = (newChar).split(" ")
        setCopyStr(strList)
        setColorList([])
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
                    setColorList((prev)=>[...prev,"red"])
                    isRed = true
                    break
                }
            }
            if(!isRed){
                setColorList((prev)=>[...prev,"black"])
            }
        })
    }

    const handleChanges = (e:React.ChangeEvent<HTMLInputElement>)=>{
        let newChar = e.target.value
        newChar.replace("."," ")
        setChar(newChar)
        const strList = (newChar).split(" ")
        setCopyStr(strList)
        setColorList([])
        let keyList:string[] = []
        let primaryList:string[] = []
        let noPrimaryList:string[] = []
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
                    setColorList((prev)=>[...prev,"red"])
                    isRed = true
                    break
                }
                if(i === strList.length -1){
                    const lastStr = strList[strList.length - 1]
                    const pattern:RegExp = ChangeColorRegDatas[key][index]
                    try{
                        if(pattern.test(lastStr)){
                            keyList.push(key)
                            setIsDisplayAutoCorrects(true)
                        }
                    }catch(e){
                        console.log(typeof pattern)
                        console.error(e)
                    }
                }
            }
            
            const reg = new RegExp(str.replace(/[.*+?^${}()|[\]\\]/g, '\\$&'), "i")
            keyList.map((key,i)=>{
                if(reg.test(key)){
                    primaryList.push(key)
                }else{
                    noPrimaryList.push(key)
                }
            })
            if(!isRed){
                setColorList((prev)=>[...prev,"black"])
            }
            setAutoCorrect((primaryList.concat(noPrimaryList)))
        })
    
    }
    const handleClick = (e:React.MouseEvent<HTMLSpanElement, MouseEvent>)=>{
        if(e.currentTarget.textContent !== null){
            const changeStr = e.currentTarget.textContent.replace("\n","")
            const currentStrList = char.split(" ")
            const removeMatchChar = currentStrList[currentStrList.length-1].replaceAll(",","")
            changeString(char.slice(0,(char.length - removeMatchChar.length)) + changeStr)
        }
        const input = document.getElementById("text")
        input?.focus()
    }
    
    const handleMouseDown = (e:React.MouseEvent<HTMLSpanElement>)=>{
        const hoverId = e.currentTarget.id    
        setAutoCorrectsIndex(parseInt(hoverId.replace("hover","")))
    }
    

    
    useEffect(()=>{
        const box = document.getElementById("box")
        const span = document.getElementById("tailPositioning")
        const copy = document.getElementById("id")
        if(span && box){
            const distx = window.pageXOffset + (span.getBoundingClientRect().left - box.getBoundingClientRect().left) 
            const disty = window.pageYOffset + (span.getBoundingClientRect().bottom - box.getBoundingClientRect().bottom)
            setPosition({x:distx,y:disty})
        }
    },[copyStr])

    return(
    <Contener
    id={"contener"}
    children={ 
    <div>
        {isDisplayAutoCorrects ? 
        (<AutoCorrectBox id="AutoCorrectsBox" posi={position}>
            {autoCorrects.map((value,i)=>(
                <AutoCorrect 
                opacity={i===autoCorrectsIndex ? 0.3 : 1}
                color={i===autoCorrectsIndex ? "yellow":"white"}
                id={`hover${i}`} 
                handleClick={handleClick} 
                handleMouseDown={handleMouseDown} 
                key={i.toString()}>
                    {value + "\n"}
                </AutoCorrect>
            ))}
        </AutoCorrectBox>):(null)}
        <Contener 
        id={"box"}
        children={
            <>
        <Input 
        id="text"
        type="text"
        autoComplete="off"
        value={char.replace("."," ")}
        handleKeyDown={(e)=>{
            const props ={
                e:e,
                setIsDisplayAutoCorrects:setIsDisplayAutoCorrects,
                autoCorrects:autoCorrects,
                char:char,
                changeString:changeString,
                autoCorrectsIndex:autoCorrectsIndex,
                setAutoCorrectsIndex:setAutoCorrectsIndex
            }
            caseDisplayAutoCorrectsHandleKeyDown(props)}}
        handleChange={handleChanges}/>
        <CopyBox id="copy">
            {colorList.map((color,i)=>(
                <CopySpan 
                id={`copy${i}`}
                color={color} 
                key={i.toString()}
                children={copyStr[i]}
                />
            ))}
             <TailSpan id="tailPositioning"/>
        </CopyBox>
        </>
        }/>
    </div>}/>
    )
}
