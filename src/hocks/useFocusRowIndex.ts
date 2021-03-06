import {useRecoilState} from "recoil"
import { focusRowIndexState } from "store/focusRowIndex"
export const useFocusRowIndex = () => {
    const [focusRowIndex,setFocusIndex] = useRecoilState(focusRowIndexState)
    const focusElement =(id:string):void=>{
        const focusElement = document.getElementById(id)
        if(focusElement){
            focusElement.focus()
        }else{
            console.log("not found")
        }
    }
    const moveFocusToClickedElement =((e: React.MouseEvent<HTMLInputElement, MouseEvent>,focusIdPrefix="input")=>{
        focusElement(e.currentTarget.id)
        setFocusIndex(Number(e.currentTarget.id.replace(focusIdPrefix,"")))
    })
    const incrementFocusRowIndex = () => {
        setFocusIndex(focusRowIndex + 1)
    }
    const decrementFocusRowIndex = () => {
        setFocusIndex(focusRowIndex - 1)
    }
    return {focusRowIndex,focusElement,moveFocusToClickedElement,incrementFocusRowIndex,decrementFocusRowIndex}
}