

type Props = {
    e:React.KeyboardEvent<HTMLInputElement>
    focusRowIndex:number
    setFocusIndex:(value: React.SetStateAction<number>) => void
    copyWords:string[][]
    setCopyWords:(value: React.SetStateAction<string[][]>) => void
    colorList:string[][]
    setColorList:(value: React.SetStateAction<string[][]>) => void
    sentences:string[]
    setSentences:(value: React.SetStateAction<string[]>) => void
}

const focusElement =(id:string):void=>{
    const focusElement = document.getElementById(id)
    if(focusElement){
        focusElement.focus()
    }else{
        console.log("not found")
    }
    
}
const removeLastValue = (list:string[]) => {
    return list.filter((_:string,i:number)=>i!==list.length-1)
}
const removeLastList = (list:string[][]) => {
    return list.filter((_:string[],i:number)=>i!==list.length-1)
}



export const caseNotDisplayAutoCorrectsHandleKeyDown =(props:Props)=>{
    const {e,focusRowIndex,
            setFocusIndex,
            setCopyWords,copyWords,
            colorList,setColorList,
            sentences,setSentences} = props

            const focusRowSentencesIsNull = ():boolean =>{
                return sentences[focusRowIndex] === "" 
            }

            const focusRowIndexIsInit = ():boolean => {
                return focusRowIndex === 0
            }
            const focusRowIndexIsEnd = ():boolean => {
                return focusRowIndex === sentences.length-1
            }
            const removeRowSentence = () => {
                setSentences(removeLastValue(sentences))
            }
            const removeRowColorList = () => {
                setColorList(removeLastList(colorList))
            }
            const removeRowDatas = () => {
                removeRowSentence()
                removeRowColorList()
            }
            const addRowSentence = () => {
                setSentences([...sentences,""])
            }
            const addRowColorList = () => {
                setColorList([...colorList,[]])
            }
            const addRowDatas = () => {
                addRowSentence()
                addRowColorList()
            }
            
            const onlyFocusMove = () =>{
                if(!focusRowIndexIsEnd()){

                }
            }
    switch(e.key){
        case "Enter":
            setFocusIndex(focusRowIndex + 1)
            // if(focusRowIndex < sentences.length - 1){
            //     focusElement((focusRowIndex + 1).toString())
            //     break
            // }
            if(!focusRowIndexIsEnd()){
                break
            }
            addRowDatas()

            // let cloneCopyStr = copyWords
            // cloneCopyStr.push([])
            // setCopyWords(cloneCopyStr)
            // colorList.push([])
            // setColorList(colorList)
            // sentences.push("")
            // setSentences(sentences)
            break
        
        case "ArrowUp":
            if(focusRowIndexIsInit()){
                break
            }
            setFocusIndex(focusRowIndex - 1)
            // focusElement("input" + (focusRowIndex - 1).toString())
            break
        
        case "ArrowDown":
            if(focusRowIndexIsEnd()){
                break
            }
            setFocusIndex(focusRowIndex + 1)
            // focusElement("input" + (focusRowIndex - 1).toString())
            // console.log("ArrowDown")
            // console.log("focusIndxe",focusRowIndex + 1)
            break
        
        case "Backspace":
            if(focusRowSentencesIsNull() && !focusRowIndexIsInit()){
                if(focusRowIndexIsEnd()){
                    removeRowDatas()
                }
                setFocusIndex(focusRowIndex - 1)
            }
        // case "Backspace":
        //     if(copyWords[focusRowIndex][0] === "" || copyWords[focusRowIndex].length === 0){
        //         if(focusRowIndex>0){
        //             setFocusIndex(focusRowIndex - 1)
        //             if(focusRowIndex === copyWords.length-1){
        //                 copyWords.pop()
        //                 colorList.pop()
        //                 setCopyWords(copyWords)
        //                 setColorList(colorList)
        //             }
        //         }
        //     }
            break
        default:
            break

    }
}
