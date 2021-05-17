import {useEffect,useState} from "react"
import {ChangeColorRegDatas} from "../../datas/Datas"
import {InputAndCopyAndLabel} from "../organisms/InputAndCopyAndLabel"
import {AutoCorrects} from "../molecules/AutoCorrects"
import {caseDisplayAutoCorrectsHandleKeyDown} from "../../functions/onKeyDown/caseDisplayAutoCorrectsHandleKeyDown"
import {caseNotDisplayAutoCorrectsHandleKeyDown} from "../../functions/onKeyDown/caseNotDisplayAutoCorrectsHandleKeyDownmodi"
import {focusElement} from "../../functions/focusElement"
import styled, { StyledInterface } from "styled-components" 

const wordDivide = (newCharacter:string) => {
    return newCharacter.split(" ")
}
const isExistRegData = (word:string,key:string):boolean => {
    const index = word.length - 1
    if(ChangeColorRegDatas[key][index]===undefined){
        return false
    }
    return true
}

const isWordMatch = (key:string,word:string) => {
    return key === word || key.toLocaleLowerCase() === word
}

const removeLastValue = (list:string[]) => {
    return list.filter((_:string,i:number)=>i!==list.length-1)
}
const removeLastList = (list:string[][]) => {
    return list.filter((_:string[],i:number)=>i!==list.length-1)
}

// type Color = "black" | "red" pre

export const EditerAndAutoCorrectModi = ()=>{
    const [position,setPosition] = useState({x:0,y:0})
    const [sentences, setSentences] = useState<string[]>([""])
    const [colorList, setColorList] = useState<string[][]>([[]])
    const [autoCorrects, setAutoCorrect] = useState<string[]>([])
    const [isDisplayAutoCorrects, setIsDisplayAutoCorrects] = useState(false)
    const [focusAutoCorrectsIndex,setFocusAutoCorrectsIndex] = useState(0)
    const [focusRowIndex,setFocusIndex] = useState(0)
    const [labelPosition, setLabelPosition] = useState(0)
    const [rowPosition,setRowPosition] = useState<number[]>([])
    const editerContenerHeight = 800
    const rowHeight = 30
  
    const moveFocus =((e: React.MouseEvent<HTMLInputElement, MouseEvent>)=>{
        focusElement(e.currentTarget.id)
        setFocusIndex(Number(e.currentTarget.id.replace("input","")))
    })

    const updateSentences = (newCharacter:string) => {
        sentences[focusRowIndex] = newCharacter
        setSentences([...sentences])
    } 

   
    const blackColorSet = (focusRowIndex:number,colorListClone:string[][]) => {
        colorListClone[focusRowIndex] = [...colorListClone[focusRowIndex],"black"]
    }

    // const updateColorList = (wordList:string[]) =>{
    //     const colorListClone = colorDistribution(wordList)
    //     setColorList([...colorListClone])
    // }

    const whatWordColor = (word:string):string => {
        for (let key in ChangeColorRegDatas){
            if(!isExistRegData(word,key)){
                continue
            }
            if(isWordMatch(key,word)){
                return "red"
            }
        }
        return "black"
    }

    const updateColorList = (wordList:string[]) => {
        wordList.map((word,wordIndex)=>{
            colorList[focusRowIndex][wordIndex] = whatWordColor(word)
        })
        setColorList([...colorList])
    }

    const initAutoCorrects = () => {
        setIsDisplayAutoCorrects(false)
        setFocusAutoCorrectsIndex(0)//add init condition
    } 

    const didEnterNewCharacters = (newCharacter:string)=>{
        initAutoCorrects()
        updateSentences(newCharacter)
        const wordList = wordDivide(newCharacter)
        updateColorList(wordList)
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
        focusElement("input"+focusRowIndex.toString())
    }
    
    const handleMouseDown = (e:React.MouseEvent<HTMLSpanElement>)=>{
        const hoverId = e.currentTarget.id    
        setFocusAutoCorrectsIndex(parseInt(hoverId.replace("hover","")))
    }



    // const removeBeforeAutoCorrect = () =>{
    //     let copyWordsClone = 
    //     setCopyWords(removeLastValue(copyWords[focusRowIndex]))
    //     let sentencesClone = sentences
    //     sentencesClone[focusRowIndex] = 
    //     setSentences(removeLastValue(sentences[focusRowIndex].split(" ")))
    // }
    // const changeToAutoCorrect = (selectedAutoCorrect:string) => {
    //        removeBeforeAutoCorrect()
    //        didEnterNewCharacters(selectedAutoCorrect)
    // }

    const deleteLastWord = () => {
        const words = wordDivide(sentences[focusRowIndex])
        return removeLastValue(words).join(" ")
    }

    const CaseDisplayAutoCorrectsHandleKeyDown = {
        downEnterKey:()=> {
            const selectedAutoCorrect = autoCorrects[focusAutoCorrectsIndex]
            const beforeInsertAutoCorrect = deleteLastWord()
            const newSentences = `${beforeInsertAutoCorrect} ${selectedAutoCorrect}`
            didEnterNewCharacters(newSentences)
            initAutoCorrects()
        },
        downArrowUpKey:()=> {
            if(focusAutoCorrectsIndex > 0){
                setFocusAutoCorrectsIndex(focusAutoCorrectsIndex - 1)
            }
        },
        downArrowDownKey:()=> {
            if(focusAutoCorrectsIndex < autoCorrects.length -1){
                setFocusAutoCorrectsIndex(focusAutoCorrectsIndex + 1)
            }
        },
        downRightOrLeftKey:() => {
            initAutoCorrects()
        },
    }


    const handleKey = (e:React.KeyboardEvent<HTMLInputElement>)=>{
        if(isDisplayAutoCorrects){
            switch(e.key){
                case "Enter":
                    CaseDisplayAutoCorrectsHandleKeyDown.downEnterKey()
                    break
                case "ArrowUp":
                    CaseDisplayAutoCorrectsHandleKeyDown.downArrowUpKey()
                    break
                case "ArrowDown":
                    CaseDisplayAutoCorrectsHandleKeyDown.downArrowDownKey()
                    break
                case "ArrowRight":
                    CaseDisplayAutoCorrectsHandleKeyDown.downRightOrLeftKey()
                    break
                case "ArrowLeft":
                    CaseDisplayAutoCorrectsHandleKeyDown.downRightOrLeftKey()
                    break
                default:
                    break
            }
            // const props = {
            //     e:e,
            //     setIsDisplayAutoCorrects:setIsDisplayAutoCorrects,
            //     autoCorrects:autoCorrects,
            //     char:sentences[focusRowIndex],
            //     changeString:didEnterNewCharacters,
            //     autoCorrectsIndex:focusAutoCorrectsIndex,
            //     setAutoCorrectsIndex:setFocusAutoCorrectsIndex
            // }
            // caseDisplayAutoCorrectsHandleKeyDown(props)
        }else{
            const props = {
                e:e,
                focusRowIndex:focusRowIndex,
                colorList:colorList,
                sentences:sentences,
                setFocusIndex:setFocusIndex,
                setColorList:setColorList,
                setSentences:setSentences
            }
            caseNotDisplayAutoCorrectsHandleKeyDown(props)

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
    },[sentences[focusRowIndex]])
    
    useEffect(()=>{
        if(focusRowIndex<=rowPosition.length-1){
            return 
        }
        console.log(rowPosition,focusRowIndex)
        const scroll = document.getElementById("contener")
        const input = document.getElementById(`input${focusRowIndex}`)
        let cloneRowPosition = rowPosition
        if(input && scroll){
            console.log(scroll.scrollHeight)
            console.log("input",input.getBoundingClientRect().top)
            if(editerContenerHeight>input.getBoundingClientRect().top){
                cloneRowPosition.push(input.getBoundingClientRect().top)
            }else{
                cloneRowPosition.push(scroll.scrollHeight - rowHeight)
            }
            setRowPosition(cloneRowPosition)
        }
    },[sentences.length])

    useEffect(()=>{
        console.log(focusRowIndex)
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
                handleMouseDown={handleMouseDown}
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
                handleKeyDown={handleKey}
                onClick={moveFocus}
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
