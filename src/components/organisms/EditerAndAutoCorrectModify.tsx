import {useEffect,useState} from "react"
import {ChangeColorRegDatas} from "../../datas/Datas"
import {InputAndCopyAndLabel} from "../organisms/InputAndCopyAndLabel"
import {AutoCorrects} from "../molecules/AutoCorrects"
import {caseDisplayAutoCorrectsHandleKeyDown} from "../../functions/onKeyDown/caseDisplayAutoCorrectsHandleKeyDown"
import {caseNotDisplayAutoCorrectsHandleKeyDown} from "../../functions/onKeyDown/caseNotDisplayAutoCorrectsHandleKeyDownmodi"
import styled, { StyledInterface } from "styled-components" 
import { useEditer } from "hocks/useEditer"


const wordDivide = (newCharacter:string) => {
    return newCharacter.split(" ")
}

const removeLastValue = (list:string[]) => {
    return list.filter((_:string,i:number)=>i!==list.length-1)
}






export const EditerAndAutoCorrectModi = ()=>{
    const [position,setPosition] = useState({x:0,y:0})
    const [autoCorrects, setAutoCorrect] = useState<string[]>([])
    const [isDisplayAutoCorrects, setIsDisplayAutoCorrects] = useState(false)
    const [focusAutoCorrectsIndex,setFocusAutoCorrectsIndex] = useState(0)
    const {sentences, colorList, focusRowIndex,
        updateSentences, updateColorList, 
        addInitRowDatas, removeRowDatas,
        focusElement, moveFocusToClickedElement,
        incrementFocusRowIndex, decrementFocusRowIndex,
        isFocusRowSentencesNull, isFocusRowIndexInit, isFocusRowIndexEnd} = useEditer()
    const [labelPosition, setLabelPosition] = useState(0)
    const [rowPosition,setRowPosition] = useState<number[]>([])
    const editerContenerHeight = 800
    const rowHeight = 30
    
    const initAutoCorrects = () => {
        setIsDisplayAutoCorrects(false)
        setFocusAutoCorrectsIndex(0)//add init condition
    } 

    const didEnterNewCharacters = (newCharacter:string)=>{
        initAutoCorrects()
        updateSentences(newCharacter,focusRowIndex)
        const wordList = wordDivide(newCharacter)
        updateColorList(wordList,focusRowIndex)
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
        didEnterNewCharacters(newChar)
        const strList = newChar.split(" ")
        const lastStr = strList[strList.length - 1]
        sortAutoCorrect(lastStr)
     }

    const selectAutoCorrect = (e:React.MouseEvent<HTMLSpanElement, MouseEvent>)=>{
        if(e.currentTarget.textContent !== null){
            const changeStr = e.currentTarget.textContent.replace("\n","")
            const currentStrList = sentences[focusRowIndex].split(" ")
            const removeMatchChar = currentStrList[currentStrList.length-1]
            didEnterNewCharacters(sentences[focusRowIndex].slice(0,(sentences[focusRowIndex].length - removeMatchChar.length)) + changeStr)
        }
    }
    
    const handleMouseDownToSelectAutoCorrect = (e:React.MouseEvent<HTMLSpanElement>)=>{
        const hoverId = e.currentTarget.id    
        setFocusAutoCorrectsIndex(parseInt(hoverId.replace("hover","")))
    }

    const deleteLastWord = (sentence:string) => {
        const words = wordDivide(sentence)
        return removeLastValue(words).join(" ")
    }

    const CaseDisplayAutoCorrectsHandleKeyDown:{[key:string]:()=>void} = {
        "Enter":()=> {
            const selectedAutoCorrect = autoCorrects[focusAutoCorrectsIndex]
            const beforeInsertAutoCorrect = deleteLastWord(sentences[focusRowIndex])
            const newSentences = `${beforeInsertAutoCorrect} ${selectedAutoCorrect}`
            didEnterNewCharacters(newSentences)
            initAutoCorrects()
        },
        "ArrowUp":()=> {
            if(focusAutoCorrectsIndex > 0){
                setFocusAutoCorrectsIndex(focusAutoCorrectsIndex - 1)
            }
        },
        "ArrowDown":()=> {
            if(focusAutoCorrectsIndex < autoCorrects.length -1){
                setFocusAutoCorrectsIndex(focusAutoCorrectsIndex + 1)
            }
        },
        "ArrowRight":() => {
            initAutoCorrects()
        },
        "ArrowLeft":() => {
            initAutoCorrects()
        },
    }

    const CaseNotDisplayAutoCorrectsHandleKeyDown:{[key:string]:()=>void} = {
        "Enter":()=>{
            if(isFocusRowIndexEnd()){
                addInitRowDatas()
            }
            incrementFocusRowIndex()
        },
        "ArrowUp":()=>{
            if(!isFocusRowIndexInit()){
                decrementFocusRowIndex()
            }
        },
        "ArrowDown":()=>{
            if(!isFocusRowIndexEnd()){
                incrementFocusRowIndex()
            }
        },
        "Backspace":()=>{
            if(isFocusRowSentencesNull() && !isFocusRowIndexInit()){
                if(isFocusRowIndexEnd()){
                    removeRowDatas()
                }
                decrementFocusRowIndex()
            }
        }
    }

    const handleAnyKeyOnInput = (e:React.KeyboardEvent<HTMLInputElement>)=>{
        try{
            if(isDisplayAutoCorrects){
                CaseDisplayAutoCorrectsHandleKeyDown[e.key]()
            }else{
                CaseNotDisplayAutoCorrectsHandleKeyDown[e.key]()
            }
        }catch(e){
            console.log(e)
        }
    }
            

    useEffect(()=>{
        const span = document.getElementById(`tailPosition${focusRowIndex}`)
        if(span){
            console.log("tail",span.getBoundingClientRect().left)
            const distx = window.pageXOffset + (span.getBoundingClientRect().left)
            const disty = window.pageYOffset + (span.getBoundingClientRect().top) - 20//oukyuusyoti
            setPosition({x:distx,y:disty})
        }
    },[sentences])
    
    useEffect(()=>{
        if(focusRowIndex<=rowPosition.length-1){
            return 
        }
        const scroll = document.getElementById("contener")
        const input = document.getElementById(`input${focusRowIndex}`)
        let cloneRowPosition = rowPosition
        if(input && scroll){
            if(editerContenerHeight>input.getBoundingClientRect().top){
                cloneRowPosition.push(input.getBoundingClientRect().top)
            }else{
                cloneRowPosition.push(scroll.scrollHeight - rowHeight)
            }
            setRowPosition(cloneRowPosition)
        }
    },[sentences.length])


    useEffect(()=>{
        focusElement("input"+focusRowIndex.toString())
        const scroll = document.getElementById("contener")
        const input = document.getElementById(`input${focusRowIndex}`)
        if(scroll && input){
            let disty = rowPosition[focusRowIndex]
            scroll.scroll(0,disty)
        }
    },[focusRowIndex])

    return (
        <Contener 
        height={editerContenerHeight}
        id="contener"
        onScroll={(e)=>setLabelPosition(e.currentTarget.scrollLeft)}>
            {isDisplayAutoCorrects ? (
                <AutoCorrects
                handleMouseDown={handleMouseDownToSelectAutoCorrect}
                focusAutoCorrectsIndex={focusAutoCorrectsIndex}
                handleClick={selectAutoCorrect}
                position={position}
                autoCorrects={autoCorrects}
                />
            ):(
                null
            )}
            {sentences.map((sentence,rowIndex)=>(
                <InputAndCopyAndLabel
                handleChange={handleChanges}
                position={labelPosition}
                style={{outline:"solid"}}
                handleKeyDown={handleAnyKeyOnInput}
                onClick={moveFocusToClickedElement}
                sentence={sentence}
                colorList={colorList[rowIndex]}
                index={rowIndex}/>
            ))}
        </Contener>
            
    )
}
const Contener = styled.div<{height:number}>`
width:${props=>props.height}px;
height:800px;
overflow:auto;
`
