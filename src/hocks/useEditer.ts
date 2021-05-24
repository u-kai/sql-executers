import { useColorList } from "./useColorList"
import {useFocusRowIndex} from "./useFocusRowIndex"
import { sentencesState } from "store/sentences";
import {useRecoilState,useRecoilValue} from "recoil"
import { focusRowIndexState } from "store/focusRowIndex";
import { colorListState } from "store/colorList";



export const useEditer = () =>{
    const [colorList,setColorList] = useRecoilState(colorListState)
    const removeLastValue = (list:string[]) => {
        return list.filter((_:string,i:number)=>i!==list.length-1)
    }
    const [sentences,setSentences] = useRecoilState(sentencesState)
    const addRowSentence = () => {
        setSentences([...sentences,""])
    }
    const removeRowSentence = () => {
        setSentences(removeLastValue(sentences))
    }
    const updateSentences = (newCharacter:string,index:number) => {
        let clone = sentences.slice() 
        clone[index] = newCharacter
        setSentences([...clone])
    }     
    const { 
            addRowColorList, 
            removeRowColorList,
            updateColorList
        } = useColorList()
    const { 
            focusElement,
            moveFocusToClickedElement,
            incrementFocusRowIndex,
            decrementFocusRowIndex
        } = useFocusRowIndex()
        const focusRowIndex = useRecoilValue(focusRowIndexState)
    const addInitRowDatas = () => {
        addRowSentence()
        addRowColorList()
    }
    const removeRowDatas = () => {
        removeRowSentence()
        removeRowColorList()
    }
    const isFocusRowSentencesNull = ():boolean =>{
        return sentences[focusRowIndex] === "" 
    }
    const isFocusRowIndexInit = ():boolean => {
        return focusRowIndex === 0
    }
    const isFocusRowIndexEnd = ():boolean => {
        return focusRowIndex === sentences.length-1
    }

    return {sentences, colorList, focusRowIndex,
            updateSentences, updateColorList, setColorList,
            addInitRowDatas, removeRowDatas,
            focusElement, moveFocusToClickedElement,
            incrementFocusRowIndex, decrementFocusRowIndex,
            isFocusRowSentencesNull, isFocusRowIndexInit, isFocusRowIndexEnd}
}

