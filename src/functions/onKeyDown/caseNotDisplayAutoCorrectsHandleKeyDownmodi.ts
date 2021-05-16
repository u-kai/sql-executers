

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

export const caseNotDisplayAutoCorrectsHandleKeyDown =(props:Props)=>{
    const {e,focusRowIndex,
            setFocusIndex,
            setCopyWords,copyWords,
            colorList,setColorList,
            sentences,setSentences} = props
    switch(e.key){
        case "Enter":
            setFocusIndex(focusRowIndex + 1)
            if(focusRowIndex < copyWords.length - 1){
                focusElement((focusRowIndex + 1).toString())
                break
            }
            let cloneCopyStr = copyWords
            cloneCopyStr.push([])
            setCopyWords(cloneCopyStr)
            colorList.push([])
            setColorList(colorList)
            sentences.push("")
            setSentences(sentences)
            break
        
        case "ArrowUp":
            if(focusRowIndex<=0){
                break
            }
            setFocusIndex(focusRowIndex - 1)
            focusElement((focusRowIndex - 1).toString())
            break
        
        case "ArrowDown":
            if(focusRowIndex === copyWords.length-1){
                break
            }
            setFocusIndex(focusRowIndex + 1)
            focusElement((focusRowIndex + 1).toString())
            // console.log("ArrowDown")
            // console.log("focusIndxe",focusRowIndex + 1)
            break
        
        case "Backspace":
            if(copyWords[focusRowIndex][0] === "" || copyWords[focusRowIndex].length === 0){
                if(focusRowIndex>0){
                    setFocusIndex(focusRowIndex - 1)
                    if(focusRowIndex === copyWords.length-1){
                        copyWords.pop()
                        colorList.pop()
                        setCopyWords(copyWords)
                        setColorList(colorList)
                    }
                }
            }
            break
        default:
            break

    }
}
