import {useState} from "react"

export const useFocusAutoCorrectIndex = () => {
    const [focusAutoCorrectsIndex,setFocusAutoCorrectsIndex] = useState(0)
    const initFocusAutoCorrectsIndex = ()=>{setFocusAutoCorrectsIndex(0)}
    const handleMouseDownToSelectAutoCorrect = (e:React.MouseEvent<HTMLSpanElement>,id="hover")=>{
        const hoverId = e.currentTarget.id    
        setFocusAutoCorrectsIndex(parseInt(hoverId.replace(id,"")))
    }
    const incrementFocusAutoCorrectsIndex = ()=>{setFocusAutoCorrectsIndex(focusAutoCorrectsIndex + 1)}
    const decrementFocusAutoCorrectsIndex = ()=>{setFocusAutoCorrectsIndex(focusAutoCorrectsIndex - 1)}
    return { focusAutoCorrectsIndex, initFocusAutoCorrectsIndex, 
            incrementFocusAutoCorrectsIndex, decrementFocusAutoCorrectsIndex,
            handleMouseDownToSelectAutoCorrect}
}