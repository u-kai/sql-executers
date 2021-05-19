import {useAutoCorrects} from "./useAutoCorrects"
import {useFocusAutoCorrectIndex} from "./useFocusAutoCorrectIndex"
import {useIsDisplayAutoCorrects} from "./useIsDisplayAutoCorrects"
import {useAutoCorrectsPosition} from "./useAutoCorrectsPosition"


export const useAutoCorrecters = () =>{
    const {isDisplayAutoCorrects, notDisplayAutoCorrects, displayAutoCorrects} = useIsDisplayAutoCorrects()
    const { focusAutoCorrectsIndex, initFocusAutoCorrectsIndex, 
        handleMouseDownToSelectAutoCorrect} = useFocusAutoCorrectIndex()
    const {autoCorrects,sortAutoCorrect} = useAutoCorrects()
    const {autoCorrectsPosition, getAndSetAutoCorrectsPosition} = useAutoCorrectsPosition()
    const initAutoCorrects = () => {
        notDisplayAutoCorrects()
        initFocusAutoCorrectsIndex()
    }

    

    return {initAutoCorrects, sortAutoCorrect, handleMouseDownToSelectAutoCorrect,
            getAndSetAutoCorrectsPosition, autoCorrectsPosition, focusAutoCorrectsIndex,
            autoCorrects, isDisplayAutoCorrects}
}