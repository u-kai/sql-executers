// import {useEffect,useState} from "react"
// import {ChangeColorRegDatas} from "../../datas/Datas"
// import {InputAndCopyAndLabel} from "../organisms/InputAndCopyAndLabel"
// import {AutoCorrects} from "../molecules/AutoCorrects"
// import {caseDisplayAutoCorrectsHandleKeyDown} from "../../functions/onKeyDown/caseDisplayAutoCorrectsHandleKeyDown"
// import {caseNotDisplayAutoCorrectsHandleKeyDown} from "../../functions/onKeyDown/caseNotDisplayAutoCorrectsHandleKeyDownmodi"
// import styled from "styled-components" 
// import { useEditer } from "hocks/useEditer"
// import {useAutoCorrecters} from "hocks/useAutoCorrecters"
// import {wordDivide, deleteLastWord} from "functions/editerFucntions"


// export const EditerAndAutoCorrectModi = ()=>{
//     const {sentences, colorList, focusRowIndex,
//         updateSentences, updateColorList, 
//         addInitRowDatas, removeRowDatas,
//         focusElement, moveFocusToClickedElement,
//         incrementFocusRowIndex, decrementFocusRowIndex,
//         isFocusRowSentencesNull, isFocusRowIndexInit, isFocusRowIndexEnd} = useEditer()
//     const {initAutoCorrects, sortAutoCorrect, handleMouseDownToSelectAutoCorrect,
//         getAndSetAutoCorrectsPosition, autoCorrectsPosition, focusAutoCorrectsIndex,setIsDisplayAutoCorrects,
//         autoCorrects, isDisplayAutoCorrects, incrementFocusAutoCorrectsIndex,decrementFocusAutoCorrectsIndex} = useAutoCorrecters()
//     const [labelPosition, setLabelPosition] = useState(0)
//     const [rowPosition,setRowPosition] = useState<number[]>([])
//     const editerContenerHeight = 800
//     const rowHeight = 30
    
//     const didEnterNewCharacters = (newCharacter:string)=>{
//         initAutoCorrects()
//         updateSentences(newCharacter,focusRowIndex)
//         const wordList = wordDivide(newCharacter)
//         updateColorList(wordList,focusRowIndex)
//     }

//     const handleChanges = (e:React.ChangeEvent<HTMLInputElement>)=>{
//         didEnterNewCharacters(e.target.value)
//         const wordList = wordDivide(e.target.value)
//         const lastWord = wordList[wordList.length - 1]
//         setIsDisplayAutoCorrects(sortAutoCorrect(lastWord))
//      }

//     const didSelectAutoCorrect = (e:React.MouseEvent<HTMLSpanElement, MouseEvent>)=>{
//         if(e.currentTarget.textContent !== null){
//             const changeStr = e.currentTarget.textContent.replace("\n","")
//             const currentStrList = sentences[focusRowIndex].split(" ")
//             const removeMatchChar = currentStrList[currentStrList.length-1]
//             didEnterNewCharacters(sentences[focusRowIndex].slice(0,(sentences[focusRowIndex].length - removeMatchChar.length)) + changeStr)
//         }
//     }
    
//     const CaseDisplayAutoCorrectsHandleKeyDown:{[key:string]:()=>void} = {
//         "Enter":()=> {
//             const selectedAutoCorrect = autoCorrects[focusAutoCorrectsIndex]
//             const beforeInsertAutoCorrect = deleteLastWord(sentences[focusRowIndex])
//             const newSentences = `${beforeInsertAutoCorrect} ${selectedAutoCorrect}`
//             didEnterNewCharacters(newSentences)
//             initAutoCorrects()
//         },
//         "ArrowUp":()=> {
//             if(focusAutoCorrectsIndex > 0){
//                 decrementFocusAutoCorrectsIndex()
//             }
//         },
//         "ArrowDown":()=> {
//             if(focusAutoCorrectsIndex < autoCorrects.length -1){
//                 incrementFocusAutoCorrectsIndex()
//             }
//         },
//         "ArrowRight":() => {
//             initAutoCorrects()
//         },
//         "ArrowLeft":() => {
//             initAutoCorrects()
//         },
//     }

//     const CaseNotDisplayAutoCorrectsHandleKeyDown:{[key:string]:()=>void} = {
//         "Enter":()=>{
//             if(isFocusRowIndexEnd()){
//                 addInitRowDatas()
//             }
//             incrementFocusRowIndex()
//         },
//         "ArrowUp":()=>{
//             if(!isFocusRowIndexInit()){
//                 decrementFocusRowIndex()
//             }
//         },
//         "ArrowDown":()=>{
//             if(!isFocusRowIndexEnd()){
//                 incrementFocusRowIndex()
//             }
//         },
//         "Backspace":()=>{
//             if(isFocusRowSentencesNull() && !isFocusRowIndexInit()){
//                 if(isFocusRowIndexEnd()){
//                     removeRowDatas()
//                 }
//                 decrementFocusRowIndex()
//             }
//         }
//     }

//     const handleAnyKeyOnInput = (e:React.KeyboardEvent<HTMLInputElement>)=>{
//         try{
//             if(isDisplayAutoCorrects){
//                 CaseDisplayAutoCorrectsHandleKeyDown[e.key]()
//             }else{
//                 CaseNotDisplayAutoCorrectsHandleKeyDown[e.key]()
//             }
//         }catch(e){
//             console.log(e)
//         }
//     }
            

//     useEffect(()=>{
//         getAndSetAutoCorrectsPosition(focusRowIndex)
//     },[sentences])
    
//     useEffect(()=>{
//         if(focusRowIndex<=rowPosition.length-1){
//             return 
//         }
//         const scroll = document.getElementById("contener")
//         const input = document.getElementById(`input${focusRowIndex}`)
//         let cloneRowPosition = rowPosition
//         if(input && scroll){
//             if(editerContenerHeight>input.getBoundingClientRect().top){
//                 cloneRowPosition.push(input.getBoundingClientRect().top)
//             }else{
//                 cloneRowPosition.push(scroll.scrollHeight - rowHeight)
//             }
//             setRowPosition(cloneRowPosition)
//         }
//     },[sentences.length])

//     useEffect(()=>{
//         focusElement("input"+focusRowIndex.toString())
//         const scroll = document.getElementById("contener")
//         const input = document.getElementById(`input${focusRowIndex}`)
//         if(scroll && input){
//             let disty = rowPosition[focusRowIndex]
//             scroll.scroll(0,disty)
//         }
//     },[focusRowIndex])

//     return (
//         <Contener 
//         height={editerContenerHeight}
//         id="contener"
//         onScroll={(e)=>setLabelPosition(e.currentTarget.scrollLeft)}>
//             {isDisplayAutoCorrects ? (
//                 <AutoCorrects
//                 handleMouseDown={handleMouseDownToSelectAutoCorrect}
//                 focusAutoCorrectsIndex={focusAutoCorrectsIndex}
//                 handleClick={didSelectAutoCorrect}
//                 position={autoCorrectsPosition}
//                 autoCorrects={autoCorrects}
//                 />
//             ):(
//                 null
//             )}
//             {sentences.map((sentence,rowIndex)=>(
//                 <InputAndCopyAndLabel
//                 handleChange={handleChanges}
//                 position={labelPosition}
//                 style={{outline:"solid"}}
//                 handleKeyDown={handleAnyKeyOnInput}
//                 onClick={moveFocusToClickedElement}
//                 sentence={sentence}
//                 colorList={colorList[rowIndex]}
//                 index={rowIndex}/>
//             ))}
//         </Contener>
            
//     )
// }
// const Contener = styled.div<{height:number}>`
// width:${props=>props.height}px;
// height:800px;
// overflow:auto;
// `
export const  d = console.log("this is successs")
