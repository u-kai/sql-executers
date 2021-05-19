import { useColorList } from "./useColorList"
import {useFocusRowIndex} from "./useFocusRowIndex"
// import {useSentences} from "./useSentences"
import {UseSentences} from "./useSentences"

export const useEditer = (sentences:string[],setSentences:React.Dispatch<React.SetStateAction<string[]>>,
    colorList:string[][],setColorList:React.Dispatch<React.SetStateAction<string[][]>>) =>{
    const removeLastValue = (list:string[]) => {
        return list.filter((_:string,i:number)=>i!==list.length-1)
    }

    const addRowSentence = () => {
        setSentences([...sentences,""])
    }
    const removeRowSentence = () => {
        setSentences(removeLastValue(sentences))
    }
    const updateSentences = (newCharacter:string,index:number) => {
        sentences[index] = newCharacter
        setSentences([...sentences])
    }     
    const { 
            addRowColorList, 
            removeRowColorList,
            updateColorList
        } = useColorList(colorList, setColorList,)
    const { focusRowIndex,
            focusElement,
            moveFocusToClickedElement,
            incrementFocusRowIndex,
            decrementFocusRowIndex
        } = useFocusRowIndex()

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

