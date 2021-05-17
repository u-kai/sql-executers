type Props = {
    setIsDisplayAutoCorrects:React.Dispatch<React.SetStateAction<boolean>>
    e:React.KeyboardEvent<HTMLInputElement>
    autoCorrects:string[]
    char:string
    changeString:(newChar:string)=>void
    autoCorrectsIndex:number
    setAutoCorrectsIndex:(value: React.SetStateAction<number>) => void
}

export const caseDisplayAutoCorrectsHandleKeyDown = (props:Props)=>{
    const {e,setIsDisplayAutoCorrects,
            autoCorrects,char,changeString,autoCorrectsIndex,
            setAutoCorrectsIndex} = props
            console.log(e.key)
    switch(e.key){ 
        case "Enter":
            setIsDisplayAutoCorrects(false)
            const currentStrList = char.split(" ")
            const removeMatchChar = currentStrList[currentStrList.length-1].replaceAll(",","")
            changeString(char.slice(0,(char.length - removeMatchChar.length)) + autoCorrects[autoCorrectsIndex])
            break
        case "ArrowUp":
            if(autoCorrectsIndex > 0){
                setAutoCorrectsIndex(autoCorrectsIndex - 1)
            }
            break
        case "ArrowDown":
            if(autoCorrectsIndex < autoCorrects.length-1){
                setAutoCorrectsIndex(autoCorrectsIndex + 1)
            }
            break
        case "ArrowRight" :
                console.log("left")
                setIsDisplayAutoCorrects(false)
            break
        case "ArrowLeft":
            console.log("left")
            setIsDisplayAutoCorrects(false)
            break
        default:
            break
    }
}