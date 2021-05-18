import {useState} from "react"

export const useFocusAutoCorrectIndex = () => {
    const [focusAutoCorrectsIndex,setFocusAutoCorrectsIndex] = useState(0)
    const initFocusAutoCorrectsIndex = ()=>{setFocusAutoCorrectsIndex(0)}
    return { focusAutoCorrectsIndex, initFocusAutoCorrectsIndex}
}