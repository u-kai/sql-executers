import {useAutoCorrects} from "./useAutoCorrects"
import {useFocusAutoCorrectIndex} from "./useFocusAutoCorrectIndex"
import {useIsDisplayAutoCorrects} from "./useIsDisplayAutoCorrects"
import {useAutoCorrectsPosition} from "./useAutoCorrectsPosition"


export const useAutoCorrecters = () =>{
    const {isDisplayAutoCorrects, notDisplayAutoCorrects, displayAutoCorrects,setIsDisplayAutoCorrects} = useIsDisplayAutoCorrects()
    const { focusAutoCorrectsIndex, initFocusAutoCorrectsIndex, 
        incrementFocusAutoCorrectsIndex, decrementFocusAutoCorrectsIndex,
        handleMouseDownToSelectAutoCorrect} = useFocusAutoCorrectIndex()
    const {autoCorrects,sortAutoCorrect} = useAutoCorrects()
    const {autoCorrectsPosition, getAndSetAutoCorrectsPosition} = useAutoCorrectsPosition()
    const initAutoCorrects = () => {
        notDisplayAutoCorrects()
        initFocusAutoCorrectsIndex()
    }

    

    return {initAutoCorrects, sortAutoCorrect, handleMouseDownToSelectAutoCorrect,setIsDisplayAutoCorrects,
            getAndSetAutoCorrectsPosition, autoCorrectsPosition, focusAutoCorrectsIndex,
            autoCorrects, isDisplayAutoCorrects, incrementFocusAutoCorrectsIndex,decrementFocusAutoCorrectsIndex}
}