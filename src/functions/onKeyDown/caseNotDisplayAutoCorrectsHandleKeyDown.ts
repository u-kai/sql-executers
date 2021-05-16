

type Props = {
    e:React.KeyboardEvent<HTMLInputElement>
    focusRowIndex:number
    setFocusIndex:(value: React.SetStateAction<number>) => void
    copyStr:[string[]]
    setCopyStr:(value: React.SetStateAction<[string[]]>) => void
    colorList:[string[]]
    setColorList:(value: React.SetStateAction<[string[]]>) => void
    chars:string[]
    setChars:(value: React.SetStateAction<string[]>) => void
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
            setCopyStr,copyStr,
            colorList,setColorList,
            chars,setChars} = props
    switch(e.key){
        case "Enter":
            setFocusIndex(focusRowIndex + 1)
            if(focusRowIndex < copyStr.length - 1){
                focusElement((focusRowIndex + 1).toString())
                break
            }
            let cloneCopyStr = copyStr
            cloneCopyStr.push([])
            setCopyStr(cloneCopyStr)
            colorList.push([])
            setColorList(colorList)
            chars.push("")
            setChars(chars)
            break
        
        case "ArrowUp":
            if(focusRowIndex<=0){
                break
            }
            setFocusIndex(focusRowIndex - 1)
            focusElement((focusRowIndex - 1).toString())
            break
        
        case "ArrowDown":
            if(focusRowIndex === copyStr.length-1){
                break
            }
            setFocusIndex(focusRowIndex + 1)
            focusElement((focusRowIndex + 1).toString())
            // console.log("ArrowDown")
            // console.log("focusIndxe",focusRowIndex + 1)
            break
        
        case "Backspace":
            if(copyStr[focusRowIndex][0] === "" || copyStr[focusRowIndex].length === 0){
                if(focusRowIndex>0){
                    setFocusIndex(focusRowIndex - 1)
                    if(focusRowIndex === copyStr.length-1){
                        copyStr.pop()
                        colorList.pop()
                        setCopyStr(copyStr)
                        setColorList(colorList)
                    }
                }
            }
            break
        default:
            break

    }
}
