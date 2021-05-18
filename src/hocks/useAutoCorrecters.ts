import {useAutoCorrects} from "./useAutoCorrects"
import {useFocusAutoCorrectIndex} from "./useFocusAutoCorrectIndex"
import {useIsDisplayAutoCorrects} from "./useIsDisplayAutoCorrects"
import {useAutoCorrectPosition} from "./useAutoCorrectPosition"


export const useAutoCorrecters = () =>{
    const {isDisplayAutoCorrects, notDisplayAutoCorrects} = useIsDisplayAutoCorrects()
    const { focusAutoCorrectsIndex, initFocusAutoCorrectsIndex} = useFocusAutoCorrectIndex()
    const initAutoCorrects = () => {
        notDisplayAutoCorrects()
        initFocusAutoCorrectsIndex()
    } 
    
    return {}
}