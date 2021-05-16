import {useEffect,useState} from "react"
import {ChangeColorRegDatas} from "../../datas/Datas"
import {InputAndCopyAndLabel} from "../organisms/InputAndCopyAndLabel"
import {AutoCorrects} from "../molecules/AutoCorrects"
import {caseDisplayAutoCorrectsHandleKeyDown} from "../../functions/onKeyDown/caseDisplayAutoCorrectsHandleKeyDown"
import {caseNotDisplayAutoCorrectsHandleKeyDown} from "../../functions/onKeyDown/caseNotDisplayAutoCorrectsHandleKeyDownmodi"
import {focusElement} from "../../functions/focusElement"
import styled from "styled-components" 

export const EditerAndAutoCorrectModi = ()=>{
    const [position,setPosition] = useState({x:0,y:0})
    const [sentences, setSentences] = useState<string[]>([""])
    const [colorList, setColorList] = useState<string[][]>([[]])
    const [copyWords, setCopyWords] = useState<string[][]>([[]])
    const [autoCorrects, setAutoCorrect] = useState<string[]>([])
    const [isDisplayAutoCorrects, setIsDisplayAutoCorrects] = useState(false)
    const [autoCorrectsIndex,setAutoCorrectsIndex] = useState(0)
    const [focusRowIndex,setFocusIndex] = useState(0)
    const [labelPosition, setLabelPosition] = useState(0)
    const [rowPosition,setRowPosition] = useState<number[]>([])
    const editerContenerHeight = 800
    const rowHeight = 30
    // const addRow = ()=>{
    //     // setMaxRowIndex(maxRowIndex + 1)
    //     setFocusIndex(maxRowIndex + 1)
    // }
    const moveFocus =((e: React.MouseEvent<HTMLInputElement, MouseEvent>)=>{
        focusElement(e.currentTarget.id)
        // console.log(e.currentTarget.id)
        setFocusIndex(Number(e.currentTarget.id.replace("input","")))
    })

    const updateSentences = (newCharacter:string) => {
        sentences[focusRowIndex] = newCharacter
        setSentences([...sentences])
    } 

    const updateCopyWords = (newCharacter:string) => {
        const wordsList = newCharacter.split(" ")
        copyWords[focusRowIndex] = wordsList
        setCopyWords([...copyWords])
    }

    const initColorList = () => {
        colorList[focusRowIndex] = []
    }

    const changeString = (newCharacter:string)=>{
    //     console.log("chars:",sentences)
    // console.log("colorList:",colorList)
    // console.log("copyStr:",copyWords)
    // console.log("focusRowIndex:",focusRowIndex)
        
        updateSentences(newCharacter)
        updateCopyWords(newCharacter)
        const strList = newCharacter.split(" ")
        // let copyWordsClone = copyWords
        // copyWordsClone[focusRowIndex] = strList
        // setCopyWords(copyWordsClone)
        // let colorListClone = colorList
        // colorListClone[focusRowIndex] = []
        initColorList()
        setIsDisplayAutoCorrects(false)
        setAutoCorrectsIndex(0)//add init condition
        // setAutoCorrectsIndex(0)
        strList.map((str,i)=>{
            let isRed = false
            for (let key in ChangeColorRegDatas){
                const index = str.length - 1
                if(ChangeColorRegDatas[key][index]===undefined){
                    continue
                }
                if(key === str || key.toLocaleLowerCase() === str){
                    colorList[focusRowIndex].push("red")
                    isRed = true
                    break
                }
            }
            if(!isRed){
                colorList[focusRowIndex].push("black")
            }
        })
        setColorList([...colorList])
        
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

    const selectAutoCorrect = (e:React.MouseEvent<HTMLSpanElement, MouseEvent>)=>{
        if(e.currentTarget.textContent !== null){
            const changeStr = e.currentTarget.textContent.replace("\n","")
            const currentStrList = sentences[focusRowIndex].split(" ")
            const removeMatchChar = currentStrList[currentStrList.length-1]
            changeString(sentences[focusRowIndex].slice(0,(sentences[focusRowIndex].length - removeMatchChar.length)) + changeStr)
            // setAutoCorrectsIndex(0)//add init condition
        }
        focusElement("input"+focusRowIndex.toString())
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
                char:sentences[focusRowIndex],
                changeString:changeString,
                autoCorrectsIndex:autoCorrectsIndex,
                setAutoCorrectsIndex:setAutoCorrectsIndex
            }
            caseDisplayAutoCorrectsHandleKeyDown(props)
        }else{
            const props = {
                e:e,
                focusRowIndex:focusRowIndex,
                copyWords:copyWords,
                colorList:colorList,
                sentences:sentences,
                setCopyWords:setCopyWords,
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
    },[copyWords[focusRowIndex]])
    
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
    },[copyWords.length])

    useEffect(()=>{
        console.log(focusRowIndex)
        focusElement("input"+focusRowIndex.toString())
        const scroll = document.getElementById("contener")
        const input = document.getElementById(`input${focusRowIndex}`)
        if(scroll && input){
            let disty = rowPosition[focusRowIndex]
            scroll.scroll(-3000,disty)
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
                setAutoCorrectFocusIndex={setAutoCorrectsIndex}
                autoCorrectFocusIndex={autoCorrectsIndex}
                handleClick={selectAutoCorrect}
                position={position}
                autoCorrects={autoCorrects}
                />
            ):(
                null
            )}
            {copyWords.map((sentence,rowIndex)=>(
                <InputAndCopyAndLabel
                handleChange={handleChanges}
                position={labelPosition}
                style={{outline:"solid"}}
                handleKeyDown={handleKey}
                onClick={moveFocus}
                sentence={sentences[rowIndex]}
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
